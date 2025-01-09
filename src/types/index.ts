export interface PokemonType {
    id: number;
    name: string;
    image: string;
}
  
export interface Evolution {
    name: string;
    pokedexId: number;
}
  
export interface Stats {
    HP: number;
    speed: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
}
  
export interface Pokemon {
    id: number;
    pokedexId: number;
    name: string;
    image: string;
    sprite: string;
    stats: Stats;
    generation: number;
    evolutions: Evolution[];
    types: PokemonType[];
}
