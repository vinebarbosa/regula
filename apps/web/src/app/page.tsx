'use client'


import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <main className="h-screen w-full flex items-center justify-center">
      <button className="bg-primary-main py-2.5 px-3 rounded-lg text-white font-medium cursor-pointer"
        onClick={() => signIn("gov-br", { callbackUrl: "/login-successed", redirect: true })}
      >
        Entrar com o gov.BR
      </button>
    </main>
  );
}
