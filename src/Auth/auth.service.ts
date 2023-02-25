import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login() {
    return { msg: 'Signed in' };
  }

  signup() {
    return { msg: 'Signed up' };
  }
}
