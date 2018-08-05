<template>
  <section class="container">
    <div>
      <h1>
        002-fetch
      </h1>
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

export default {
  async fetch({ store, params }) {
    let { data } = await axios.get("http://localhost:3000/users");

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

