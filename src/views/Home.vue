<template>
  <div class="home">

    <div>Pokemons disponiveis</div>
    <div style="display: flex; flex-wrap: wrap;">
      <div v-for="p in pokemons" :key="p.id">
        <card :title="p.name" body="" :types="p.types"  />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
 computed, defineComponent, reactive, toRefs,
} from 'vue';
import Card from '@/components/Card.vue';
import useCards from '@/modules/cards';

export default defineComponent({
  components: {
    Card,
  },

  setup() {
    const cards = useCards();
    const state = reactive({});

    const pokemons = computed(() => cards.state.pokemons);

    cards.actions.loadPokemons();

    return {
      ...toRefs(state),
      pokemons,
    };
  },
});
</script>

<style scoped>
</style>
