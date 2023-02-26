import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup') //Post request to auth/signup
  signup(@Body() dto: AuthDTO) {
    return this.authService.signup(dto);
  }

  @Post('signin') //Post request to auth/signin
  signin(@Body() dto: AuthDTO) {
    return this.authService.login(dto);
  }
}
