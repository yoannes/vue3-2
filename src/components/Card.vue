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

      <div>
        <button @click="modalBuyOpen = true">
          <span v-if="!isMine">Comprar</span>
          <span v-else>Vender</span>
        </button>
      </div>

      <div><button @click="modalOpen = true">Stats</button></div>
    </div>

    <div>
      <types :types="types" />
    </div>

    <modal :open="modalOpen" @on-close="modalOpen = false">
      <div v-for="stat in pokemon.stats" :key="stat.name">
        {{ stat.stat.name }} {{ stat.baseStat }}
      </div>
    </modal>

    <checkout
      v-if="!isMine"
      :open="modalBuyOpen"
      :pokemon="pokemon"
      :images="images"
      @on-close="modalBuyOpen = false"
    />
    <checkout
      v-else
      :open="modalBuyOpen"
      :pokemon="pokemon"
      :images="images"
      @on-close="modalBuyOpen = false"
      isSell
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import Carousel from './Carousel.vue';
import Modal from './Modal.vue';
import Types from './Types.vue';
import Checkout from './Checkout.vue';

export default defineComponent({
  components: {
    Types,
    Carousel,
    Modal,
    Checkout,
  },
  props: {
    isMine: Boolean,
    pokemon: { type: Object, required: true },
    images: { type: Array, required: true },
    types: { type: Array, required: true },
  },

  // Composition API
  setup(props) {
    const modalOpen = ref(false);
    const modalBuyOpen = ref(false);
    const body = computed(() => `Altura: ${props.pokemon.height}`);

    return {
      body,
      modalOpen,
      modalBuyOpen,
    };
  },
});
</script>

<style lang="scss" scoped>
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
