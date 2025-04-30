import { env } from "@/env";
import { signIn } from "@/modules/http/routes/sign-in";
import { OAuth2Config, OAuthUserConfig } from "next-auth/providers";

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  pessoa: {
    sexo: string;
    raca_cor: string;
    totp_ativo: boolean;
    faz_login: boolean;
    cpf: string;
  }
}

export const GovBr = <P extends Profile>(options: OAuthUserConfig<P>): OAuth2Config<P> => ({
  id: 'gov-br',
  name: 'Gov.BR',
  type: 'oauth',
  authorization: {
    url: env.AUTH_GOVBR_AUTHORIZATION_URL,
    params: {
      scope: 'openid+email+profile+phone+govbr_confiabilidades',
      client_id: env.AUTH_GOVBR_CLIENT_ID,
      redirect_uri: env.NEXT_PUBLIC_APP_URL,
      response_type: 'code'
    }
  },
  token: {
    url: `${env.NEXT_PUBLIC_API_URL}/auth/gov_br`,
    async request(context: any) {
      const { tokens } = await signIn({
        code: context.params.code,
        redirectUrl: env.NEXT_PUBLIC_APP_URL
      })
      return {
        tokens
      };
    }
  },
  userinfo: {
    url: `${env.NEXT_PUBLIC_API_URL}/auth/dados_user`,
    async request({ client, tokens }: any) {
      const profile = await client.userinfo(tokens.access_token || '');
      return profile;
    }
  },
  async profile(profile) {
    return {
      id: profile.id.toString(),
      nome: profile.first_name,
      sobrenome: profile.last_name,
      sexo: profile.pessoa.sexo,
      raca_cor: profile.pessoa.raca_cor,
      totp_verificado: profile.pessoa.totp_ativo,
      ativo: profile.pessoa.faz_login,
      cpf: profile.pessoa.cpf
    };
  },
  options
})
