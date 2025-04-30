import "@/app/globals.css";
import "@/packages/mt/theme/styles.css"

import type { Metadata } from "next";

import { font } from "@/packages/mt/theme/font";
import { PropsWithChildren } from "react";
import { Providers } from "@/modules/shared/components/providers";

export const metadata: Metadata = {
  title: "Regula MT",
  description: "Plataforma de regulação do estado do Mato Grosso",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="pt-BR">
      <body className={font.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
