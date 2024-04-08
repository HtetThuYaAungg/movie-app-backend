// import { Injectable, CanActivate, ExecutionContext, BadRequestException, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { jwtConstants } from './constant';

// @Injectable()
// export class AuthGuard implements CanActivate {
//     constructor(private jwtService: JwtService) {}
//     async canActivate(
//       context: ExecutionContext,
//     ): Promise<boolean> {
//         const request = context.switchToHttp().getRequest();
//         const token = this.extractTokenFromHeader(request);

//         if (!accessToken){
//             throw new UnauthorizedException("Unauthorized access");
//         }

//         try {
//             const payload = await this.jwtService.verifyAsync(
//                 accessToken,
//               {
//                 secret: jwtConstants.secret
//               }
//             );
//             // 💡 We're assigning the payload to the request object here
//             // so that we can access it in our route handlers
//             request['user'] = payload;
//           } catch {
//             throw new UnauthorizedException();
//           }

//         return true;
//     }
// }

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.ACCESS_TOKEN_SECRET,
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}



export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
