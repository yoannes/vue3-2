<template>
  <div class="card">
    <div class="card-title">
      {{ pokemon.name }}
    </div>

    <div>
      <carousel :images="images" />
    </div>

    <div>
      <div>Altura {{ pokemon.height }}</div>
      <div>Peso {{ pokemon.weight }}</div>
    </div>

    <div>
      <types :types="types" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import Carousel from './Carousel.vue';
import Types from './Types.vue';

export default defineComponent({
  components: { Types, Carousel },
  props: {
    pokemon: { type: Object, required: true },
    images: { type: Array, required: true },
    types: { type: Array, required: true },
  },

  // Composition API
  setup(props) {
    const body = computed(() => `Altura: ${props.pokemon.height}`);

    return {
      body,
    };
  },
});
</script>

<style scoped>
.card {
  border: 1px solid black;
  padding: 5px;
  margin: 5px;
  width: 200px;
  height: fit-content;
}

.card-title {
  border-bottom: 1px solid black;
}
</style>
