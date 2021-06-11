<template>
  <div v-if="open" class="modal" @click="clickHandler">
    <div class="modal-container">
      <div class="modal-close" @click="$emit('on-close')">X</div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    open: Boolean,
  },

  emits: ['on-close'],

  setup(props, { emit }) {
    const clickHandler = (e:MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.className === 'modal') {
        emit('on-close');
      }
    };
    return { clickHandler };
  },
});
</script>

<style scoped>
.modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  width: fit-content;
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
  border: 1px solid black;
  border-radius: 5px;
  background: white;
  padding: 10px;
}

.modal-close {
  text-align: right;
  cursor: pointer;
}
</style>
