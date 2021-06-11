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
  </div>
</template>

<script lang="ts">
import {
 computed, defineComponent, reactive, toRefs,
} from 'vue';
import Card from '@/components/Card.vue';
import useCards, { Pokemon } from '@/modules/cards';

export default defineComponent({
  components: {
    Card,
  },

  setup() {
    const cards = useCards();
    const state = reactive({});

    const pokemons = computed(() => cards.state.pokemons);

    const getImages = (pokemon: Pokemon) => [
      pokemon.sprites.frontDefault,
      pokemon.sprites.backDefault,
    ];

    const loadMore = () => {
      cards.actions.loadPokemons();
    };

    cards.actions.loadPokemons();

    return {
      ...toRefs(state),
      pokemons,
      getImages,
      loadMore,
    };
  },
});
</script>

<style scoped>
</style>
