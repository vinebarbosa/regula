import { AuthOptions } from 'next-auth';

import { decodeJwt } from 'jose';

import { GovBr } from './providers/gov-br';
import { env } from '@/env';


export const authOptions: AuthOptions = {
  providers: [
    GovBr({
      clientId: env.AUTH_GOVBR_CLIENT_ID,
      clientSecret: ''
    })
  ],
  pages: {
    signIn: '/'
  },
  session: {
    strategy: 'jwt'
  }
};
