'use client';

import { ActiveLink } from '@/components/ActiveLink';
import { Header } from '@/components/Header';
import { Pagination } from '@/components/Pagination';
import { Sidebar } from '@/components/Sidebar';
import { api } from '@/services/api';
import { useUsers } from '@/services/hooks/useUsers';
import { queryClient } from '@/services/queryClient';
import {
    Box,
    Button,
    Checkbox,
    Flex,
    Heading,
    Icon,
    Link,
    Spinner,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useBreakpointValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';

export default function UserList() {
    const [page, setPage] = useState(1);
    const { data, isLoading, isFetching, error } = useUsers(page);


    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    });

    async function handlePrefetchUser(userId: string) {
        await queryClient.prefetchQuery(['user', userId], async () => {
            const response = await api.get(`users/${userId}`);
            return response.data;
        }, {
            staleTime: 1000 * 60 * 10, // 10min
        });
    }

    return (
        <Box>
            <Header />
            <Flex width="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                    <Flex mb="8" justify="space-between" alignItems="center">
                        <Heading size="lg" fontWeight="normal">
                            Usuários
                            {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
                        </Heading>

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
                                    {data?.users.map(user => {
                                        return (
                                            <Tr key={user.id}>
                                                <Td px={["4", "4", "6"]}>
                                                    <Checkbox colorScheme="pink" />
                                                </Td>
                                                <Td px={["4", "4", "6"]}>
                                                    <Box>
                                                        <Link color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                                                            <Text fontWeight="bold"> {user.name} </Text>
                                                        </Link>
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

                            <Pagination
                                totalCountOfRegisters={data.totalCount}
                                currentPage={page}
                                onPageChange={setPage}

                            />

                        </>
                    )}
                </Box>
            </Flex>
        </Box>
    );
}