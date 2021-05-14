<template>
  <div class="home">
    componente home.vue

    <div style="display: flex; flex-wrap: wrap">
      <card title="Titulo 1" body="Corpo" />
      <card title="Novo titulo" body="Novo card" />
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Card from '@/components/Card.vue';

export default defineComponent({
  components: {
    Card,
  },
});
</script>

<style scoped>

</style>
