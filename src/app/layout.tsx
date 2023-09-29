'use client'

import { theme } from '@/styles/theme';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body suppressHydrationWarning={true}>
        <CacheProvider>
          <ChakraProvider theme={theme}>
            {children}
          </ChakraProvider>
        </CacheProvider>
        </body>
      </html>
      )
}
