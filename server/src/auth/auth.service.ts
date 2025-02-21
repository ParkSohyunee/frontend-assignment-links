import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    console.log('JWT_SECRET: ', this.configService.get('JWT_SECRET')); // 환경변수 불러오는지 확인하는 코드
  }

  async findByUserName(username: string) {
    const user = await this.userRepository.findOneBy({ username });
    console.log('findByUserName: ', user);

    return user;
  }

  async signup(authDto: AuthDto) {
    const { username, password } = authDto;

    // bcrypt를 사용하여 password 암호화
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      username,
      password: hashedPassword,
    });

    try {
      await this.userRepository.save(user); // DB 저장
    } catch (error) {
      console.log(error);

      if (error instanceof Error && 'code' in error) {
        const err = error as { code: string };
        if (err.code === 'ER_DUP_ENTRY') {
          // 이미 존재하는 usename인 경우 catch 구문에서 잡힌 에러코드
          throw new ConflictException('이미 존재하는 아이디입니다.');
        } else {
          // 이 외에는 500애러
          throw new InternalServerErrorException(
            '회원가입 과정에서 에러가 발생했습니다.',
          );
        }
      }
    }
  }

  // --비밀번호 일치 여부 검증
  async validatePassword(inputValue: string, findValue: string) {
    const isCorrect = await bcrypt.compare(inputValue, findValue);
    return isCorrect;
  }

  // --토큰 생성
  private async getTokens(payload: { username: string }) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_EXPIRES_IN_AT'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_EXPIRES_IN_RT'),
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async login(authDto: AuthDto) {
    const { username, password } = authDto;

    // username에 해당하는 user를 찾고,
    const user = await this.userRepository.findOneBy({ username });

    // 사용자가 없거나, 복호화한 password가 다를 경우 에러
    if (!user || !(await this.validatePassword(password, user.password))) {
      throw new UnauthorizedException('아이디와 비밀번호를 확인해주세요.');
    }

    const { accessToken, refreshToken } = await this.getTokens({ username });

    return { accessToken, refreshToken };
  }

  // TODO refreshToken으로 accessToken 재발급 받는 로직
}
