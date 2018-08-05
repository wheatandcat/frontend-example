export const state = () => ({
  users: []
});

export const mutations = {
  setUsers(state, data) {
    state.users = data;
  }
};
