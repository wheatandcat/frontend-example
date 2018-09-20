<template>
  <section class="container">
    <div>
      <Header/>
      <h1>users</h1>
      <table border="1" style="width:30rem">
        <thead>
          <tr>
            <th>id</th>
            <th>名前</th>
            <th>性別</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in $store.state.users" :key="user.id">
            <td>
              <router-link v-bind:to="'/users/' + user.id">
                {{user.id}}
              </router-link>
            </td>
            <td>{{user.name}}</td>
            <td>{{user.genderCode == "1" ? "男性" : "女性"}}</td>
            <td>
              <button v-on:click="remove(user.id)">削除</button>
            </td>
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
    let { data } = await axios.get(`${host}/users`);

    store.commit("setUsers", data);
  },
  methods: {
    getItems: async function() {
      let { data } = await axios.get(`${host}/users`);

      this.$store.commit("setUsers", data);
    },
    remove: async function(id) {
      const response = await fetch(`${host}/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        return alert("削除に失敗しました");
      }

      // リストを再取得
      this.getItems();
    }
  }
};
</script>

<style>
.container {
  min-height: 100vh;
  padding: 2rem;
}
</style>

