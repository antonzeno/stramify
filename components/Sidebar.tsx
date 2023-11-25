"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { FaHome, FaSearch } from "react-icons/fa";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import Image from "next/image";

interface SidebarProps {
    children: React.ReactNode;
    songs: Song[];
}

const Sidebar = ({ children, songs }: SidebarProps) => {
    const pathname = usePathname();
    const player = usePlayer();

    const routes = useMemo(
        () => [
            {
                icon: FaHome,
                label: "Home",
                active: pathname !== "/search",
                href: "/",
            },
            {
                icon: FaSearch,
                label: "Search",
                active: pathname === "/search",
                href: "/search",
            },
        ],
        [pathname]
    );
    return (
        <div className={twMerge(`flex h-full`, player.activeId && "h-[calc(100%-80px)]")}>
            <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
                <Box className="h-full">
                    <div className="flex flex-col gap-y-4 px-5 py-4">
                        <Link
                            href={"/"}
                            className="flex flex-row h-auto items-center w-full gap-x-4 text-md cursor-pointer py-1 text-white"
                        >
                            <Image src={"/logo.png"} alt="Logo" width={32} height={32} />
                            <p className="truncate w-full font-semibold">Streamify</p>
                        </Link>
                        {routes.map((route) => (
                            <SidebarItem key={route.label} {...route} />
                        ))}
                    </div>
                    <Library songs={songs} />
                </Box>
            </div>
            <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
        </div>
    );
};

export default Sidebar;
