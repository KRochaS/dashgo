import { Flex, Icon, Input } from "@chakra-ui/react";
import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";

// Controlled components: Maneira de lidar com formulário
// salvando a informação digitada pelo usuário com useState

// Uncontrolled component: Acessar o valor do input apenas quando
// realmente precisar, não armazena o valor e sim acessa no momento
// que precisar utilizando useRef

export function SearchBox() {
    const [search, setSearch] = useState('');

    // const searchInputRef = useRef<HTMLInputElement>(null);


    return (
        <Flex
            as="label"
            flex="1"
            py="4"
            px={["8", "4"]}
            ml="6"
            maxWidth={400}
            alignSelf="center"
            color="gray.200"
            position="relative"
            bg="gray.800"
            borderRadius="full"
        >

            <Input
                color="gray.50"
                variant="unstyled"
                placeholder="Search"
                _placeholder={{ color: 'gray.400' }}
                px="4"
                mr="4"
                value={search}
                onChange={event => setSearch(event.target.value)}
                // ref={searchInputRef}
            />

            <Icon as={RiSearchLine} fontSize="20" />
        </Flex>
    )
}