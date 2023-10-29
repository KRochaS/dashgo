'use client'

import { SidebarDrawerProvider } from '@/contexts/SidebarDrawerContext';
import { makeServer } from '@/services/mirage';
import { theme } from '@/styles/theme';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';

if (process.env.NODE_ENV === 'development') {
    makeServer();
}

const queryClient = new QueryClient();

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
                </QueryClientProvider>
            </body>
        </html>
    )
}
