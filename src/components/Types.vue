<template>
  <label>Types:</label>
  <div class="t-container">
    <div v-for="type in types" :key="type.slot" class="t-item">
      <img v-if="type.type.name === 'grass'" src="@/assets/leaf.svg" />
      <img v-if="type.type.name === 'poison'" src="@/assets/skull.svg" />
      <img v-if="type.type.name === 'fire'" src="@/assets/fire.svg" />

      {{ type.type.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    types: { type: Array, required: true },
  },

  setup() {
    return {};
  },
});
</script>

<style scoped>

.t-container {
  display: flex;
}

.t-item {
  display: flex;
  justify-content: center;
  margin: 2px;
}
</style>
