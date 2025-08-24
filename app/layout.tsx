// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Runa Kani",
  description: "Reportes seguros. Acceso protegido. Confianza real.",
  icons: { icon: "/favicon.ico" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Lang por defecto; el de [locale] NO debe renderizar <html>. 
    // Usamos suppressHydrationWarning para evitar mismatch con el idioma efectivo.
    <html lang="es" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
