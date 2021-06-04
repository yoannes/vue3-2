<template>
  <div>
    <div>Usuario</div>
    <input ref="user" v-model="username" type="text" @keyup="userHandler" />

    <div style="margin-top: 10px">Senha</div>
    <input ref="pass" v-model="password" type="password" @keyup="passHandler" />

    <div style="margin-top: 10px">
      <button @click="login">Entrar</button>
    </div>
  </div>
</template>

<script lang="ts">
import useAuth from '@/modules/auth';
import {
 defineComponent, reactive, Ref, ref, toRefs,
} from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const auth = useAuth();
    const router = useRouter();
    const user: Ref<HTMLElement | null> = ref(null);
    const pass: Ref<HTMLElement | null> = ref(null);
    const state = reactive({
      username: '',
      password: '',
    });

    const login = () => {
      const res = auth.actions.login(state.username, state.password);

      if (res) {
        router.push({ name: 'Home' });
      }
    };

    const userHandler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && state.username && pass.value) {
        pass.value.focus();
      }
    };

    const passHandler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && state.username && state.password) {
        login();
      }
    };

    return {
      ...toRefs(state),
      login,
      userHandler,
      passHandler,
      user,
      pass,
    };
  },
});
</script>

<style scoped>
</style>
