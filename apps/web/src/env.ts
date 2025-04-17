import { z } from "zod";

export const env = z
  .object({
    NEXT_PUBLIC_LOCALE: z.string().nonempty("NEXT_PUBLIC_LOCALE is required environment variable"),
    NEXT_PUBLIC_APP_URL: z.string().nonempty("NEXT_PUBLIC_APP_URL is required environment variable"),
    NEXT_PUBLIC_API_URL: z.string().nonempty("NEXT_PUBLIC_API_URL is required environment variable"),
    NEXTAUTH_SECRET: z.string().nonempty("NEXTAUTH_SECRET is required environment variable"),
    NEXTAUTH_URL: z.string().nonempty("NEXTAUTH_URL is required environment variable"),
    OAUTH_CLIENT_ID: z.string().nonempty("OAUTH_CLIENT_ID is required environment variable"),
  })
  .parse(process.env);
