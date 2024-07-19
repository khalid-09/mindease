import type { Metadata } from 'next';
import './globals.css';
import { GeistMono } from 'geist/font/mono';

import SmoothScrolling from '@/components/smooth-scrolling';
import { ThemeProvider } from '@/components/theme-provider';
import localFont from 'next/font/local';

export const metadata: Metadata = {
  title: 'Mindease',
  description: 'AI powered app for mental health and wellness support.',
};

const fixelDsiplay = localFont({
  src: [
    {
      path: '../../public/fonts/FixelDisplay/FixelDisplay-Bold.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
});

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={GeistMono.className}>
        <SmoothScrolling>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main>{children}</main>
          </ThemeProvider>
        </SmoothScrolling>
      </body>
    </html>
  );
};

export default RootLayout;
