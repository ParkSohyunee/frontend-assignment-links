import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { AuthService } from '../auth.service';

/**
 * guard는 @nestjs/common의 CanActivate 인터페이스를 확장하는 클래스로 구현
 * 이 인터페이스는 canActivate라는 단일 메소드를 정의하며, ExecutionContext 객체를 인수로 취하고, 요청이 진행되어야 하는지 여부를 반환
 */

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    // --header에 토큰이 있는지 확인
    const { authorization } = request.headers;
    if (!authorization) {
      throw new UnauthorizedException('로그인이 필요합니다.');
    }

    // --authorization 값을 추출하고 이 값이 Bearer로 시작하는지 검사
    const isBearer = authorization.startsWith('Bearer');
    if (!isBearer) {
      throw new UnauthorizedException('Bearer 토큰이 아닙니다.');
    }

    const accessToken = authorization.split(' ')[1];
    if (!accessToken) {
      throw new UnauthorizedException('토큰을 찾을 수 없습니다.');
    }

    // --토큰 검증 및 토큰에서 추출한 정보 확인하기
    try {
      const payload = await this.jwtService.verifyAsync<{ username: string }>(
        accessToken,
      );
      // --username이 존재하는지 검증
      const user = await this.authService.findByUserName(payload.username);
      if (!user) {
        throw new UnauthorizedException('사용할 수 없는 토큰입니다.');
      }
    } catch (error) {
      // --토큰이 만료된 경우
      console.log(error); // TokenExpiredError: jwt expired
      throw new UnauthorizedException('만료된 토큰입니다.');
    }

    // --모든 작업이 완료되면 true 반환
    return true;
  }
}
