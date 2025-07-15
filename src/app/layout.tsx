import { Inter } from "next/font/google";
import "../style/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Bùi Văn Đô - Full Stack Developer",
  description: "Personal portfolio and landing page of Bùi Văn Đô, a Full Stack Developer specializing in JavaScript, TypeScript, React, and Node.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
