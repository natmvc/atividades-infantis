import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import localFont from "next/font/local";
import "./globals.css";

const nunito = localFont({
  src: "../public/fonts/Nunito-VariableFont_wght.ttf",
  variable: "--font-nunito",
  weight: "200 1000",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Atividades Infantis para Imprimir | PDFs Educativos",
  description:
    "Encontre atividades infantis educativas prontas para imprimir. Livros de colorir, atividades, caligrafia, temas infantis e datas comemorativas.",
  metadataBase: new URL("https://example.com")
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={nunito.variable}>
      <body>
        {children}
        <GoogleAnalytics gaId="G-SWK782DB5R" />
      </body>
    </html>
  );
}
