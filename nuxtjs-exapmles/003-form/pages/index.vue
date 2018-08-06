<template>
  <section class="container">
    <div>
      <h1>form</h1>
      <br />
          名前:
      <input v-model="input.name" placeholder="name"/>
      <br />
      <br />
      性別:
      <input type="radio" id="male" value="1" v-model="input.genderCode" />
      <label for="male" style="padding-right:8px">男性</label>
      <input type="radio" id="female" value="2" v-model="input.genderCode" />
      <label for="female">女性</label>
      <br />
      <br />
      <button v-on:click="save">登録</button>
      <br />
      <br />
      <h1>users</h1>
      <table border="1" style="width:30rem">
        <tr>
          <th>id</th>
          <th>名前</th>
          <th>性別</th>
          <th>action</th>
        </tr>
        <tr v-for="user in $store.state.users" :key="user.id">
          <td>{{user.id}}</td>
          <td>{{user.name}}</td>
          <td>{{user.genderCode == "1" ? "男性" : "女性"}}</td>
          <td>
            <button v-on:click="remove(user.id)">削除</button>
          </td>
        </tr>
      </table>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      input: {
        name: "",
        genderCode: "1"
      }
    };
  },
  async fetch({ store, params }) {
    let { data } = await axios.get("http://localhost:3000/users");

    store.commit("setUsers", data);
  },
  methods: {
    getItems: async function() {
      let { data } = await axios.get("http://localhost:3000/users");

      this.$store.commit("setUsers", data);
    },
    save: async function() {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.input)
      });

      if (!response.ok) {
        return alert("通信エラー");
      }

      this.input = {
        name: "",
        genderCode: "1"
      };

      // リストを再取得
      this.getItems();
    },
    remove: async function(id) {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
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

