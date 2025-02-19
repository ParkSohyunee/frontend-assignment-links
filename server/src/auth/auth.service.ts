import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

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
        if (err.code === '23505') {
          // 이미 존재하는 usename인 경우 catch 구문에서 잡힌 에러코드
          throw new ConflictException('이미 존재하는 아이디입니다.');
        }
      }
      // 이 외에는 500애러
      throw new InternalServerErrorException(
        '회원가입 과정에서 에러가 발생했습니다.',
      );
    }
  }
}
