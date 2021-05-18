<template>
  <div class="card">
    <div>
      {{ a }}
      <button @click="clickHandler">++</button>
    </div>

    <div>
      <button @click="clickGlobalHandler">++global</button>
    </div>

    <div class="card-title">
      {{ title }}
    </div>
    <div>
      {{ body }}
    </div>
  </div>
</template>

<script lang="ts">
import {
 defineComponent, reactive, toRefs,
} from 'vue';

export default defineComponent({
  props: {
    title: { type: String, default: '' },
    body: { type: String, default: '' },
  },

  // Composition API
  setup(props, { emit }) {
    const state = reactive({
      a: 0,
      b: 0,
      c: 0,
    });

    const clickHandler = () => {
      state.a++;
    };

    const clickGlobalHandler = () => {
      emit('plus-plus', 1);
    };

    return {
      ...toRefs(state),
      clickHandler,
      clickGlobalHandler,
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
  height: 200px;
}

.card-title {
  border-bottom: 1px solid black;
}
</style>
