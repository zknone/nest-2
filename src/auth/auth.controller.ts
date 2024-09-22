import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { NotAuthenticatedGuard } from './guards/not-authenticated.guard';

@Controller('api/auth')
export class AuthController {
  @UseGuards(NotAuthenticatedGuard)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request) {
    return req.user;
  }

  @Post('logout')
  logout(@Req() req: Request) {
    return new Promise((resolve, reject) => {
      req.logout((err) => {
        if (err) {
          return reject(err);
        }
        resolve({ message: 'Logged out' });
      });
    });
  }
}
