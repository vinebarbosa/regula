import axios from "axios";

import { env } from "@/env";

interface SignInParams {
  code: string;
  redirectUrl: string;
}

interface SignInResponse {
  access: string;
  refresh: string
}

const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL
})

export async function signIn({ code, redirectUrl }: SignInParams) {
  const { data } = await api.post<SignInResponse>('/auth/gov_br', {
    code,
    redirectUri: redirectUrl
  })

  const tokens = {
    access_token: data.access,
    refresh_token: data.refresh
  };

  return {
    tokens
  };
}
