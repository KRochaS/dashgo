import { Text } from "@chakra-ui/react";

export function Logo() {
    return (
        <Text
            fontSize={["2xl", "3xl"]}
            fontWeight="bold"
            letterSpacing="tight"
            w={{ base: "64", md: "28", lg: "64" }}
        >
            dashgo
            <Text
                ml="1"
                color="pink.500"
                as="span">
                .
            </Text>
        </Text>
    );
}