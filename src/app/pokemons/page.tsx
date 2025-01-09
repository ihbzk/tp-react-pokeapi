"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Pokemon, PokemonType } from "@/types";
import { fetchPokemons, fetchTypes } from "../services/pokemonApi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";

export default function PokedexPage() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(50);
    const [name, setName] = useState<string>("");
    const [selectedTypes, setSelectedTypes] = useState<number[]>([]);
    const [types, setTypes] = useState<PokemonType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchTypes().then((data) => setTypes(data));
    }, []);

    async function loadPokemons(reset = false) {
        try {
            setIsLoading(true);
            const data = await fetchPokemons({
                page: reset ? 1 : page,
                limit,
                name,
                types: selectedTypes,
            });
            if (reset) {
                setPokemons(data);
                setPage(1);
                setHasMore(data.length === limit);
            } else {
                setPokemons((prev) => [...prev, ...data]);
                setHasMore(data.length === limit);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadPokemons(true);
    }, [name, limit, selectedTypes]);

    useEffect(() => {
        if (page > 1) {
            loadPokemons(false);
        }
    }, [page]);

    function handleLoadMore() {
        setPage((prev) => prev + 1);
    }

    function handleToggleType(typeId: number) {
        setSelectedTypes((prev) => {
            if (prev.includes(typeId)) {
                return prev.filter((t) => t !== typeId);
            } else {
                return [...prev, typeId];
            }
        });
    }

    return (
        <div className="p-4 space-y-4">
            <div className="flex items-center">
                <h1 className="flex items-end text-5xl font-bold">
                    P
                    <img src="https://i.goopics.net/xoaxn8.png" alt="Logo" className="h-8 w-auto me-1" />
                    kedex
                </h1>
            </div>
            <div className="flex py-4">
                <div className="flex flex-col w-full gap-4">
                    <div className="flex">
                        <div className="w-full">
                            <Input type="text" placeholder="Rechercher un Pokémon..." value={name} onChange={(e) => setName(e.target.value)} className="bg-white" />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <MultiSelect label="Types" items={types} labelKey="name" valueKey="id" selected={selectedTypes} onChange={(vals) => setSelectedTypes(vals as number[])} />
                        </div>
                        <div className="w-1/2">
                            <Select onValueChange={(value) => setLimit(Number(value))} value={limit.toString()}>
                                <SelectTrigger className="w-full bg-white">
                                    <SelectValue placeholder="Limit" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="20">20</SelectItem>
                                    <SelectItem value="50">50</SelectItem>
                                    <SelectItem value="100">100</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {pokemons.map((p) => (
                    <Link href={`/pokemons/${p.pokedexId}`} key={p.id}>
                        <Card className="hover:shadow-lg transition">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-center"> #{p.pokedexId}</CardTitle>
                                <CardTitle className="text-center">{p.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center">
                                <img src={p.image} alt={p.name} width={100} height={100} className="my-4" />
                                <div className="flex flex-wrap gap-1">
                                    {p.types.map((t) => (
                                        <div key={t.id} className="flex items-center gap-2 border border-gray-200 bg-gray-50 rounded-full px-2 py-1">
                                            <img src={t.image} alt={t.name} width={14} height={14} />
                                            <span className="text-xs">
                                                {t.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
            {hasMore && !isLoading && (
                <Button variant="default" onClick={handleLoadMore}>
                    Charger plus
                </Button>
            )}
            {isLoading && <p>Chargement...</p>}
        </div>
    );
}
