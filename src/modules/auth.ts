import { reactive, readonly } from 'vue';

interface AuthState {
  id: string;
  username: string;
  password: string;
  token: string;
}

interface UseAuth {
  state: AuthState;
}

const state: AuthState = reactive({
  id: '',
  username: '',
  password: '',
  token: '',
});

// const mutations = {};
// const actions = {};

export default function useAuth(): Readonly<UseAuth> {
  return readonly({
    state,
    // mutations,
    // actions,
  });
}
