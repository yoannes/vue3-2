import axios from 'axios';
import { reactive, readonly } from 'vue';

interface PokemonApi {
  name: string;
  url: string;
}

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  }
}

interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[]
  height: number;
  weights: number;
  sprites: {
    backDefault: string;
    frontDefault: string;
  }
}

interface CardState {
  pokemons: Pokemon[];
  myPokemons: Pokemon[];
  busy: boolean;
}

const state: CardState = reactive({
  pokemons: [],
  myPokemons: [],
  busy: false,
});

const mutations = {
  setBusy(value: boolean) {
    state.busy = value;
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

    const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=5&offset=0');

    console.log('res', res.data);
    res.data.results.forEach((pokemon: PokemonApi) => {
      console.log(pokemon);
      actions.loadPokemon(pokemon.url);
    });

    mutations.setBusy(false);
  },

  async loadPokemon(url: string) {
    const res = await axios.get(url);
    const pokemon: Pokemon = {
      id: res.data.id,
      name: res.data.name,
      types: res.data.types,
      height: res.data.height,
      weights: res.data.weights,
      sprites: {
        backDefault: res.data.sprites.back_default,
        frontDefault: res.data.sprites.front_default,
      },
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
