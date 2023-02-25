import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup') //Post request to auth/signup
  signup() {
    return this.authService.signup();
  }

  @Post('signin') //Post request to auth/signin
  signin() {
    return this.authService.login();
  }
}
