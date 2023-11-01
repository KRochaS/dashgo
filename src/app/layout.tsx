'use client'

import { SidebarDrawerProvider } from '@/contexts/SidebarDrawerContext';
import { makeServer } from '@/services/mirage';
import { queryClient } from '@/services/queryClient';
import { theme } from '@/styles/theme';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

if (process.env.NODE_ENV === 'development') {
    makeServer();
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body suppressHydrationWarning={true}>
                <QueryClientProvider client={queryClient}>
                <CacheProvider>
                    <ChakraProvider theme={theme}>
                        <SidebarDrawerProvider>
                            {children}
                        </SidebarDrawerProvider>
                    </ChakraProvider>
                </CacheProvider>
                <ReactQueryDevtools />
                </QueryClientProvider>
            </body>
        </html>
    )
}
