import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./assets/styles/globals.css";
import { APP_NAME, APP_DESCRIPTION, SERVER_URL } from '../lib/constansts';
import { ThemeProvider } from 'next-themes';

const jost = Jost({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-jost',
})

export const metadata: Metadata = {
  title: {
    template: `%s | Tech Store`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
       <head>
        <link rel="icon" href="/favicon_io/favicon.ico" sizes="32x32" />
      </head>
      <body
        className={`${jost.variable} antialiased`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
