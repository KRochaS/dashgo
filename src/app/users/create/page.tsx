'use client';

import { ActiveLink } from '@/components/ActiveLink';
import { Input } from '@/components/Form/Input';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { api } from '@/services/api';
import { queryClient } from '@/services/queryClient';
import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';


import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as yup from 'yup';



type CreateUserFormData = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

const createUserFormSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
    password_confirmation: yup.string()
})

export default function CreateUser() {
    // const router = useRouter();

    const createUser = useMutation(async (user: CreateUserFormData) => {
        const response = await api.post('users', {
            user : {
              ...user,
              created_at: new Date()
            }
          })

        return response.data.user;

    }, {
        // invalida o cachê quando o createUser dá sucesso
        onSuccess: () => {
            queryClient.invalidateQueries('users')
        }
    })


    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(createUserFormSchema)
    });

    const { isSubmitting, errors } = formState;


    async function handleCreateUser(values: any) {
        await createUser.mutateAsync(values);

        // router.push('/users');
    }


    return (
        <Box>
            <Header />
            <Flex width="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box
                    as="form"
                    flex="1"
                    borderRadius={8}
                    bg="gray.800"
                    p={["6", "8"]}
                    onSubmit={handleSubmit(handleCreateUser)}
                >
                    <Heading size="lg" fontWeight="normal"> Criar Usuário </Heading>

                    <Divider my="6" borderColor="gray.700" />

                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input
                                error={errors?.name}
                                {...register('name')}
                                name="name"
                                label="Nome completo" />

                            <Input
                                error={errors?.email}
                                {...register('email')}
                                name="email"
                                type="email"
                                label="E-mail" />
                        </SimpleGrid>

                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input
                                error={errors?.password}
                                {...register('password')}
                                name="password"
                                type="password"
                                label="Senha" />

                            <Input
                                error={errors?.password_confirmation}
                                {...register('password_confirmation')}
                                name="password_conformation"
                                type="password"
                                label="Confirmação da senha" />
                        </SimpleGrid>
                    </VStack>

                    <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">
                            <ActiveLink href="/users" passHref>
                                <Button as="a" colorScheme="whiteAlpha" color="whiteAlpha.50"> Cancelar </Button>
                            </ActiveLink>

                            <Button
                                colorScheme="pink"
                                type='submit'
                                isLoading={isSubmitting}>
                                Salvar
                            </Button>
                        </HStack>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
}