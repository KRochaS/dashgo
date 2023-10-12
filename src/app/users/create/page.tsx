'use client';

import { ActiveLink } from '@/components/ActiveLink';
import { Input } from '@/components/Form/Input';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { Box, Button, Divider, Flex, HStack, Heading, SimpleGrid, VStack } from '@chakra-ui/react';

export default function CreateUser() {
    return (
        <Box>
            <Header />
            <Flex width="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box flex="1" borderRadius={8} bg="gray.800" p={["6", "8"]}>
                    <Heading size="lg" fontWeight="normal"> Criar Usuário </Heading>

                    <Divider my="6" borderColor="gray.700" />

                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input name="name" label="Nome completo" />
                            <Input name="email" type="email" label="E-mail" />
                        </SimpleGrid>

                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input name="password" type="password" label="Senha" />
                            <Input name="password_conformation" type="password" label="Confirmação da senha" />
                        </SimpleGrid>
                    </VStack>

                    <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">
                            <ActiveLink href="/users" passHref>
                                <Button as="a" colorScheme="whiteAlpha" color="whiteAlpha.50"> Cancelar </Button>
                            </ActiveLink>

                            <Button colorScheme="pink"> Salvar </Button>
                        </HStack>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
}