import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
    showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
    return (
        <Flex align="center">
            {
                showProfileData && (
                    <Box mr="4" textAlign="right">
                        <Text> Karine Rocha </Text>
                        <Text
                            color="gray.300"
                            fontSize="small"
                        >
                            karinerocha.s@hotmail.com
                        </Text>
                    </Box>

                )
            }
            <Avatar size="md" name="Karine Rocha" src="https://github.com/KRochaS.png" />
        </Flex>
    );
}