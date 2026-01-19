import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roast My Resume",
  description: "Get a brutal, honest critique of your resume backed by AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans min-h-screen flex flex-col items-center">
        {children}
      </body>
    </html>
  );
}
