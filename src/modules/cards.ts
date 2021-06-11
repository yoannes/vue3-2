import axios from 'axios';
import { reactive, readonly } from 'vue';

interface PokemonApi {
  name: string;
  url: string;
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  baseStat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  height: number;
  weight: number;
  sprites: {
    backDefault: string;
    frontDefault: string;
  };
  price: number;
  stats: PokemonStat[];
}

export interface CardState {
  pokemons: Pokemon[];
  myPokemons: Pokemon[];
  busy: boolean;
  nextUrl: string;
}

const state: CardState = reactive({
  pokemons: [],
  myPokemons: [],
  busy: false,
  nextUrl: 'https://pokeapi.co/api/v2/pokemon?limit=5&offset=0',
});

const mutations = {
  setBusy(value: boolean) {
    state.busy = value;
  },
  setNextUrl(url: string) {
    state.nextUrl = url;
  },

  processPokemon(pokemon: Pokemon) {
    const idx = state.pokemons.findIndex((p) => p.id === pokemon.id);
    if (idx > -1) {
      state.pokemons[idx] = pokemon;
    } else {
      state.pokemons.push(pokemon);
    }
  },
};

const actions = {
  async loadPokemons() {
    mutations.setBusy(true);

    const res = await axios.get(state.nextUrl);

    if (res.data.next) {
      mutations.setNextUrl(res.data.next);
    }

    console.log('res', res.data);
    res.data.results.forEach((pokemon: PokemonApi) => {
      console.log('Pokemons', pokemon);
      actions.loadPokemon(pokemon.url);
    });

    mutations.setBusy(false);
  },

  async loadPokemon(url: string) {
    const res = await axios.get(url);
    console.log('Pokemon', res.data);
    const pokemon: Pokemon = {
      id: res.data.id,
      name: res.data.name,
      types: res.data.types,
      height: res.data.height,
      weight: res.data.weight,
      sprites: {
        backDefault: res.data.sprites.back_default,
        frontDefault: res.data.sprites.front_default,
      },
      price: Math.floor(Math.random() * 100),
      stats: res.data.stats.map((stat:any) => ({
        baseStat: stat.base_stat,
        effort: stat.effort,
        stat: {
          name: stat.stat.name,
          url: stat.stat.url,
        },
      })),
    };

    mutations.processPokemon(pokemon);
  },
};

export default function useCards() {
  return readonly({
    state,
    mutations,
    actions,
  });
}
