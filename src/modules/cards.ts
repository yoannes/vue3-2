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

  buyPokemon(pokemon: Pokemon) {
    state.myPokemons.push(pokemon);
  },

  sellPokemon(pokemon: Pokemon) {
    state.myPokemons = state.myPokemons.filter((p) => p.id !== pokemon.id);
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

  async loadMyPokemons(): Promise<boolean> {
    // TODO: Quando implementar API

    const key = 'pokeStore';
    const pokemons = localStorage.getItem(key);
    if (pokemons) {
      state.myPokemons = JSON.parse(pokemons);
    }

    return true;
  },

  async buyPokemon(pokemon: Pokemon): Promise<boolean> {
    // TODO: Fazer chamada API de compra

    mutations.buyPokemon(pokemon);

    const key = 'pokeStore';
    localStorage.setItem(key, JSON.stringify(state.myPokemons));

    return true;
  },

  async sellPokemon(pokemon: Pokemon): Promise<boolean> {
    // TODO: Fazer chamada API de compra

    mutations.sellPokemon(pokemon);

    const key = 'pokeStore';
    localStorage.setItem(key, JSON.stringify(state.myPokemons));

    return true;
  },
};

export default function useCards() {
  return readonly({
    state,
    mutations,
    actions,
  });
}
