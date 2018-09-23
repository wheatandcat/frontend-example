<template>
  <section class="container">
    <div>
      <Header/>
      <h1>user</h1>
      <table border="1" style="width:30rem">
        <thead>
          <tr>
            <th>id</th>
            <th>名前</th>
            <th>性別</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{$store.state.user.id}}</td>
            <td>{{$store.state.user.name}}</td>
            <td>{{$store.state.user.genderCode == "1" ? "男性" : "女性"}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import Header from "~/components/Header.vue";

const host = process.env.host || "http://localhost:3000";

export default {
  components: {
    Header
  },
  async fetch({ store, params }) {
    let { data } = await axios.get(`${host}/users/${params.id}`);

    store.commit("setUser", data);
  }
};
</script>

<style>
.container {
  min-height: 100vh;
  padding: 2rem;
}
</style>

