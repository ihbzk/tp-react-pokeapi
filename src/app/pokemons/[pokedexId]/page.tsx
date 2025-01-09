"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { fetchPokemonById } from "@/app/services/pokemonApi";
import { Pokemon } from "@/types";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"

export default function PokemonDetailsPage() {
    const router = useRouter();
    const params = useParams();

    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!params?.pokedexId) return;
        const loadPokemon = async () => {
            setIsLoading(true);
            try {
                const data = await fetchPokemonById(params.pokedexId);
                setPokemon(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        loadPokemon();
    }, [params?.pokedexId]);

    if (isLoading) {
        return <p className="p-4">Chargement...</p>;
    }

    if (!pokemon) {
        return <p className="p-4">Aucun pokémon trouvé.</p>;
    }

    return (
        <div className="flex justify-center">
            <Card className="flex flex-col items-center rounded-xl border bg-card text-card-foreground shadow hover:shadow-lg transition w-full lg:w-1/3">
                <div className="flex flex-col items-center">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-center"> #{pokemon.pokedexId}</CardTitle>
                        <CardTitle className="text-center text-4xl">{pokemon.name}</CardTitle>
                        {pokemon.evolutions && pokemon.evolutions.length > 0 && (
                            <div className="mt-4">
                                <CardTitle className="text-center font-normal text-xs">Évolue en</CardTitle>
                                <ul className="list-inside text-center font-bold text-xs">
                                    {pokemon.evolutions.map((evo) => (
                                        <li key={evo.pokedexId}>
                                            {evo.name} (#{evo.pokedexId})
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </CardHeader>
                    <img src={pokemon.image} alt={pokemon.name} width={250} height={250} className="mb-4 md:mb-0 md:mr-4" />
                </div>
                <div className="flex">
                    <CardContent className="flex flex-col md:flex-row items-center px-0">
                        <div>
                            <hr className="pt-2" />
                            <div className="flex justify-center gap-2 my-4">
                                {pokemon.types.map((t) => (
                                    <div key={t.id} className="flex items-center gap-1">
                                        <img src={t.image} alt={t.name} width={14} height={14} />
                                        <span key={t.id}>
                                            {t.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <hr className="pb-2" />
                            <ul className="text-center">
                                <li>
                                    <Badge variant="destructive" className="mt-2 bg-green-500 hover:bg-white hover:border hover:border-green-500 hover:text-green-500">PV ({pokemon.stats.HP})</Badge>
                                </li>
                                <li>
                                    <Badge variant="destructive" className="mt-2 bg-cyan-500 hover:bg-white hover:border hover:border-cyan-500 hover:text-cyan-500">Vitesse ({pokemon.stats.speed})</Badge>
                                </li>
                                <li>
                                    <Badge variant="destructive" className="mt-2 bg-red-500 hover:bg-white hover:border hover:border-red-500 hover:text-red-500">Attaque ({pokemon.stats.attack})</Badge>
                                    &nbsp;+&nbsp;
                                    <Badge variant="destructive" className="mt-2 bg-purple-500 hover:bg-white hover:border hover:border-purple-500 hover:text-purple-500">Spécial attaque ({pokemon.stats.specialAttack})</Badge>
                                </li>
                                <li>
                                    <Badge variant="destructive" className="mt-2 bg-yellow-500 hover:bg-white hover:border hover:border-yellow-500 hover:text-yellow-500">Défense ({pokemon.stats.defense})</Badge>
                                    &nbsp;+&nbsp;
                                    <Badge variant="destructive" className="mt-2 bg-white hover:bg-purple-500 hover:text-white border border-purple-500 text-purple-500">Spécial défense ({pokemon.stats.specialDefense})</Badge>
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                </div>
            </Card >
        </div >
    );
}
