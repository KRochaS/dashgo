// <Component> Texto </Component>: ReactNode
// <Component><Text></Text></Component>: ReactElement

'use client';

import { LinkProps } from "next/link";
import { usePathname } from 'next/navigation';
import { ReactElement, cloneElement } from "react";

interface ActiveLinkProps extends LinkProps {
    children: ReactElement;
    shouldMatchExactHref?: boolean;
}

export function ActiveLink({
    children,
    shouldMatchExactHref = false,
    ...rest
}: ActiveLinkProps) {
    let isActive = false;

    const pathName = usePathname();

    if (shouldMatchExactHref && (pathName === rest.href || pathName === rest.as)) {
        isActive = true;
    }

    if (
        !shouldMatchExactHref &&
        (pathName.startsWith(String(rest.href)) || pathName.startsWith(String(rest.as)))
    ) {
        isActive = true;
    }

    return (
        <>
            {cloneElement(children, {
                color: isActive ? "pink.400" : "gray.50",
                href: rest.href
            })}
        </>
    );
}