<template>
  <section class="container">
    <div>
      <h3>
        nuxt | 002-fetch
      </h3>
      <br />
      <ul>
        <li v-for="user in $store.state.users" :key="user.id">
          {{user.name}}
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import axios from "axios";

const host = process.env.host || "http://localhost:3000";

export default {
  async fetch({ store, params }) {
    let { data } = await axios.get(`${host}/users`);

    store.commit("setUsers", data);
  }
};
</script>

<style>
.container {
  min-height: 100vh;
  padding: 2rem;
}
</style>

