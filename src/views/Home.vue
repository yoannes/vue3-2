<template>
  <div class="home">
    <div>Pokemons disponiveis</div>
    <div style="display: flex; flex-wrap: wrap">
      <div v-for="p in pokemons" :key="p.id">
        <card
          :pokemon="p"
          :images="getImages(p)"
          :types="p.types"
        />
      </div>
    </div>
    <button @click="loadMore">Carregar mais pokemons</button>

    <div style="margin-top: 50px">Meus pokemons</div>
    <div style="display: flex; flex-wrap: wrap">
      <div v-for="p in myPokemons" :key="p.id">
        <card
          :pokemon="p"
          :images="getImages(p)"
          :types="p.types"
          is-mine
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
 computed, defineComponent,
} from 'vue';
import Card from '@/components/Card.vue';
import useCards, { Pokemon } from '@/modules/cards';

export default defineComponent({
  components: {
    Card,
  },

  setup() {
    const cards = useCards();

    const pokemons = computed(() => cards.state.pokemons);
    const myPokemons = computed(() => cards.state.myPokemons);

    const getImages = (pokemon: Pokemon) => [
      pokemon.sprites.frontDefault,
      pokemon.sprites.backDefault,
    ];

    const loadMore = () => {
      cards.actions.loadPokemons();
    };

    cards.actions.loadPokemons();
    cards.actions.loadMyPokemons();

    return {
      pokemons,
      getImages,
      loadMore,
      myPokemons,
    };
  },
});
</script>

<style scoped>
</style>
