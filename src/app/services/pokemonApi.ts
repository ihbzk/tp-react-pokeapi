import { Pokemon, PokemonType } from "@/types";

const BASE_URL = "https://nestjs-pokedex-api.vercel.app";

export async function fetchPokemons(params?: {
  page?: number;
  limit?: number;
  name?: string;
  types?: number[];
}): Promise<Pokemon[]> {
  const queryParams = new URLSearchParams();

    if (params?.page) {
        queryParams.set("page", String(params.page));
    }

    if (params?.limit) {
        queryParams.set("limit", String(params.limit));
    }

    if (params?.name) {
        queryParams.set("name", params.name);
    }

    if (params?.types && params.types.length > 0) {
        params.types.forEach((t) => {
            queryParams.append("types[]", String(t));
        });
    }

    const url = `${BASE_URL}/pokemons?${queryParams.toString()}`;
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error("Failed to fetch pokemons");
    }

    return res.json();
}

export async function fetchPokemonById(pokedexId: string | number): Promise<Pokemon> {
    const url = `${BASE_URL}/pokemons/${pokedexId}`;
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error("Failed to fetch single pokemon");
    }

    return res.json();
}

export async function fetchTypes(): Promise<PokemonType[]> {
    const url = `${BASE_URL}/types`;
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error("Failed to fetch types");
    }

    return res.json();
}
