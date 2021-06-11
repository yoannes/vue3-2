<template>
  <div class="card">
    <div class="card-title">
      {{ pokemon.name }}
    </div>

    <div>
      <carousel :images="images" />
    </div>

    <div>
      <div>Altura: {{ pokemon.height }}</div>
      <div>Peso: {{ pokemon.weight }}</div>
      <div>Preço: {{ pokemon.price }}</div>
      <div><button @click="modalOpen = true">Stats</button></div>
    </div>

    <div>
      <types :types="types" />
    </div>

    <modal :open="modalOpen" @on-close="modalOpen = false">
      <div v-for="stat in pokemon.stats" :key="stat.name">
        {{stat.stat.name}} {{stat.baseStat}}
      </div>
    </modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import Carousel from './Carousel.vue';
import Modal from './Modal.vue';
import Types from './Types.vue';

export default defineComponent({
  components: { Types, Carousel, Modal },
  props: {
    pokemon: { type: Object, required: true },
    images: { type: Array, required: true },
    types: { type: Array, required: true },
  },

  // Composition API
  setup(props) {
    const modalOpen = ref(false);
    const body = computed(() => `Altura: ${props.pokemon.height}`);

    return {
      body,
      modalOpen,
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
