import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Martins Automotive - Garage Huizingen",
  description: "Entretien, diagnostic et réparations auto à Huizingen. Prenez rendez-vous en ligne.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="font-sans bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
