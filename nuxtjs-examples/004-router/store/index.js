export const state = () => ({
  users: [],
  user: {}
});

export const mutations = {
  setUsers(state, data) {
    state.users = data;
  },
  setUser(state, data) {
    state.user = data;
  }
};
