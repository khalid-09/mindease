import type { Metadata } from 'next';
import './globals.css';
import { GeistMono } from 'geist/font/mono';

import SmoothScrolling from '@/components/smooth-scrolling';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'Mindease',
  description: 'AI powered app for mental health and wellness support.',
};

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
          <Toaster />
        </SmoothScrolling>
      </body>
    </html>
  );
};

export default RootLayout;
