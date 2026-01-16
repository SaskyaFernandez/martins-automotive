import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Martins Automotive - Garage Huizingen",
  description: "Entretien, diagnostic et réparations auto à Huizingen. Prenez rendez-vous en ligne.",
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale || 'fr'}>
      <body className="font-sans bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
