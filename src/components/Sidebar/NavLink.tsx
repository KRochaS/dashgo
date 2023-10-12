import { Link as ChakraLink, LinkProps as ChakraLinkProps, Icon, Text } from '@chakra-ui/react';
import { ElementType } from 'react';

import { ActiveLink } from '../ActiveLink';

// - ElementType: quando passa a referência do componente e não a declaração
//  RiDashboardLine - Referência
// <RiDashboardLine /> - Declaração

interface NavLinkProps extends ChakraLinkProps {
    icon: ElementType;
    children: string;
    href: string;
}

export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {
    return (
        <ActiveLink href={href} passHref>
            <ChakraLink display="flex" alignItems="center" {...rest}>
                <Icon as={icon} fontSize="20" />
                <Text ml="4" fontWeight="medium"> {children} </Text>
            </ChakraLink>
        </ActiveLink>
    )
}