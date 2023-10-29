'use client';

import { ActiveLink } from '@/components/ActiveLink';
import { Header } from '@/components/Header';
import { Pagination } from '@/components/Pagination';
import { Sidebar } from '@/components/Sidebar';
import { Box, Button, Checkbox, Flex, Heading, Icon, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from '@chakra-ui/react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import { useQuery } from 'react-query';

export default function UserList() {

    const { data, isLoading, error } = useQuery('users', async () => {
        const response = await fetch('http://localhost:3000/api/users');
        const data = await response.json();


        const users = data.users.map((user: any) => {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: new Date(user.createdAt).toLocaleDateString()
            };
        });

        return users;

    });


    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    });

    return (
        <Box>
            <Header />
            <Flex width="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                    <Flex mb="8" justify="space-between" alignItems="center">
                        <Heading size="lg" fontWeight="normal"> Usuários </Heading>

                        <ActiveLink href="/users/create" passHref>
                            <Button
                                as="a"
                                size="sm"
                                fontSize="sm"
                                colorScheme="pink"
                                leftIcon={<Icon
                                    as={RiAddLine}
                                    fontSize="20"
                                />}>
                                Criar novo
                            </Button>
                        </ActiveLink>
                    </Flex>

                    {isLoading ? (
                        <Flex justifyContent="center">
                            <Spinner />
                        </Flex>
                    ) : error ? (
                        <Flex justifyContent="center">
                            <Text> Falha ao obter os dados do usuário</Text>
                        </Flex>
                    ) : (
                        <>
                            <Table colorScheme="whiteAlpha">
                                <Thead>
                                    <Tr>
                                        <Th px={["4", "4", "6"]} color="gray.300" width="8">
                                            <Checkbox colorScheme="pink" />
                                        </Th>

                                        <Th>
                                            Usuário
                                        </Th>

                                        {isWideVersion && (
                                            <Th>
                                                Data de cadastro
                                            </Th>
                                        )}

                                        <Th width="8">

                                        </Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {data.map((user: any) => {
                                        return (
                                            <Tr key={user.id}>
                                                <Td px={["4", "4", "6"]}>
                                                    <Checkbox colorScheme="pink" />
                                                </Td>
                                                <Td px={["4", "4", "6"]}>
                                                    <Box>
                                                        <Text fontWeight="bold"> {user.name} </Text>
                                                        <Text fontSize="small" color="gray.300"> {user.email} </Text>
                                                    </Box>
                                                </Td>
                                                {isWideVersion && (
                                                    <Td>
                                                        {user.createdAt}
                                                    </Td>
                                                )}
                                                <Td>
                                                    <Button
                                                        as="a"
                                                        size="sm"
                                                        fontSize="sm"
                                                        colorScheme="purple"
                                                        leftIcon={<Icon
                                                            as={RiPencilLine}
                                                            fontSize="16"
                                                        />}>
                                                        {
                                                            isWideVersion ? 'Editar' : ''
                                                        }
                                                    </Button>
                                                </Td>
                                            </Tr>
                                        )
                                    })}
                                </Tbody>
                            </Table>

                            <Pagination />

                        </>
                    )}
                </Box>
            </Flex>
        </Box>
    );
}