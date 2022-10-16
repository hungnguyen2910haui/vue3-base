export default {
  SET_TOKEN(state, token) {
    state.token = token;
    console.log(state.token);
  },

  SET_USER(state, user) {
    state.user = user;
  },
};
