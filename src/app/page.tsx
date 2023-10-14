'use client';

import { Input } from "@/components/Form/Input";
import { Button, Flex, Stack } from "@chakra-ui/react";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import * as yup from 'yup';

type SignInFormData = {
    email: string;
    password: string;
}

const signInFormSchema = yup.object().shape({
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha obrigatória'),
})


export default function SignIn() {
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(signInFormSchema)
    });

    const { isSubmitting, errors } = formState;


    async function handleSignIn(values: any) {
        await new Promise(resolve => setTimeout(resolve, 2000)); 
        console.log(values);
    }
    
    return (
        <Flex
            w="100%"
            h="100vh"
            align="center"
            justifyContent="center"
            >

            <Flex
                as="form"
                width="100%"
                maxWidth="360"
                bg="gray.800"
                p="8"
                borderRadius="8"
                flexDir="column"
                onSubmit={handleSubmit(handleSignIn)}

            >

                <Stack spacing="4">
                    <Input label="E-mail" 
                    type="email" 
                    error={errors?.email}
                    {...register('email')} 
                   
                    />
                    <Input 
                        label="Password" 
                        type="password" 
                        {...register('password')} 
                        error={errors.password} />
                </Stack>

                <Button
                    type="submit"
                    mt="6"
                    colorScheme="pink"
                    size="lg"
                    isLoading={isSubmitting}
                >
                    Enter
                </Button>
            </Flex>

        </Flex>
    )
}
