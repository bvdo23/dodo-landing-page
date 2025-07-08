import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../../style/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "vi" }];
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (locale !== "en" && locale !== "vi") {
    notFound();
  }

  let messages;
  try {
    messages = await getMessages({ locale });
  } catch {
    notFound();
  }

  const now = new Date();

  return (
    <html lang={locale}>
      <body className={inter.className} suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages} now={now}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
