"use client"

import Link from "next/link"
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu"

export function Navbar() {
    return (
        <nav className="flex fixed w-full items-center justify-between p-4 bg-gray-800">
            <div className="flex items-center space-x-2">
                <img src="https://cdn.pixabay.com/photo/2016/09/29/12/55/pokemon-1702772_1280.png" alt="Logo" className="h-8 w-auto" />
                <span className="font-bold text-white text-xl">Pokedex</span>
            </div>
            <NavigationMenu>
                <NavigationMenuItem>
                    <Link href="/pokemons" legacyBehavior passHref>
                        <NavigationMenuLink className="text-white font-bold">
                            Pokémons
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenu>
        </nav>
    )
}
