import { LinkProps as ChakraLinkProps, Icon, Link, Text } from "@chakra-ui/react";
import { ElementType } from "react";

// - ElementType: quando passa a referência do componente e não a declaração
//  RiDashboardLine - Referência
// <RiDashboardLine /> - Declaração

interface NavLinkProps extends ChakraLinkProps {
    icon: ElementType;
    children: string;
}

export function NavLink({ icon, children, ...rest }: NavLinkProps) {
    return (
        <Link display="flex" alignItems="center" {...rest}>
            <Icon as={icon} fontSize="20" />
            <Text ml="4" fontWeight="medium"> {children} </Text>
        </Link>
    )
}