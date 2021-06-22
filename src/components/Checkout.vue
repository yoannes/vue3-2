<template>
  <modal :open="open" @on-close="$emit('on-close')">
    <div class="container">
      <div class="imagem"><carousel :images="images" /></div>
      <div class="l1">Pokemon</div>
      <div class="v1">
        <strong>{{ pokemon.name }}</strong>
      </div>
      <div class="l2">Preço</div>
      <div class="v2">
        <strong>{{ pokemon.price }}</strong>
      </div>
      <div class="actions">
        <button @click="$emit('on-close')">Cancelar</button>
        <button @click="buy">Confirmar</button>
      </div>
    </div>
  </modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useCards, { Pokemon } from '@/modules/cards';
import Modal from './Modal.vue';
import Carousel from './Carousel.vue';

export default defineComponent({
  components: { Carousel, Modal },

  props: {
    open: Boolean,
    pokemon: { type: Object, required: true },
    images: { type: Array, required: true },
  },

  emits: ['on-close'],

  setup(props, { emit }) {
    const cards = useCards();

    const buy = async () => {
      const res = await cards.actions.buyPokemon(props.pokemon as Pokemon);
      if (res) {
        emit('on-close');
      }
    };

    return {
      buy,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 2.4fr 0.5fr 0.5fr 0.6fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "imagem imagem"
    "l1 v1"
    "l2 v2"
    "actions actions";

  & > * {
    text-align: left;
  }

}
.imagem {
  grid-area: imagem;
}
.l1 {
  grid-area: l1;
}
.v1 {
  grid-area: v1;
}
.l2 {
  grid-area: l2;
}
.v2 {
  grid-area: v2;
}
.actions {
  grid-area: actions;
}
</style>
