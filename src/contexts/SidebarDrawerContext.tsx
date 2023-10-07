import { UseDisclosureReturn, useDisclosure } from "@chakra-ui/react";
import { usePathname } from "next/navigation";

import { ReactNode, createContext, useContext, useEffect } from "react";

interface SidebarDrawerProviderProps {
    children: ReactNode;
}

type SidebarDrawerContextData = UseDisclosureReturn

const SidebarDrawerContext = createContext({} as SidebarDrawerContextData);

export function SidebarDrawerProvider({children}: SidebarDrawerProviderProps) {
    const  disclosure = useDisclosure()
    const pathName = usePathname();


    useEffect(() => {
        disclosure.onClose();
    }, [pathName])


    return (
        <SidebarDrawerContext.Provider value={disclosure}>
            {children}
        </SidebarDrawerContext.Provider>
    )
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext)
 
