import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Users } from '@prisma/client'; // Import model Users
import { PrismaService } from 'prisma/prismaService';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:  'SECRET_KEY',
    });
  }

  async validate(payload: { email: string; sub: number }): Promise<Users> {
    const user = await this.prismaService.users.findUnique({
      where: { id: payload.sub },
    });
    return user;
  }
}