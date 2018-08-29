<template>
  <div>
    <h1>users</h1>
    <table border="1" style="width:30rem">
      <tr>
        <th>id</th>
        <th>名前</th>
        <th>性別</th>
        <th>action</th>
      </tr>
      <tr v-for="item in items" :key="item.id">
        <td><router-link v-bind:to="{ name: 'user', params: { id: item.id }}">{{item.id}}</router-link></td>
        <td>{{item.name}}</td>
        <td>{{item.genderCode == "1" ? "男性" : "女性"}}</td>
        <td>
          <button v-on:click="remove(item.id)">削除</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "Users",
  data() {
    return {
      items: []
    };
  },
  created: function() {
    this.getItems();
  },
  methods: {
    getItems: async function() {
      const response = await fetch("http://localhost:3000/users");

      if (!response.ok) {
        return alert("通信エラー");
      }

      const result = await response.json();
      this.items = result;
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

<style >
</style>
