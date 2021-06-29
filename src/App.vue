<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/novo">Novo</router-link> |
    <router-link v-if="!isLogedIn" to="/login">Login</router-link>
    <a v-else href="#" @click="logout">Logout</a>

    <div v-if="isLogedIn">
      Ola {{username}}
    </div>
  </div>

  <router-view />
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue';
import useAuth from '@/modules/auth';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const auth = useAuth();

    // Nada eficiente e nada legal de usar. Vai com cuidado
    watch(
      () => route.path,
      () => {
        if (!auth.state.token) {
          router.push({ name: 'Login' });
        }
      },
    );

    const isLogedIn = computed(() => auth.state.token);
    const username = computed(() => auth.state.username);

    const logout = () => {
      const res = auth.mutations.logout();
      if (res) {
        router.push({ name: 'Login' });
      }
    };

    if (!auth.state.token) {
      router.push({ name: 'Login' });
    }

    return {
      isLogedIn,
      logout,
      username,
    };
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
