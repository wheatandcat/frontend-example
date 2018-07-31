<template>
  <div>
    <h1>user</h1>
    <table border="1" style="width:30rem">
      <tr>
        <th>id</th>
        <th>名前</th>
        <th>性別</th>
      </tr>
      <tr>
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.genderCode == "1" ? "男性" : "女性"}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      item: {
        id: 0,
        name: "",
        genderCode: "1"
      }
    };
  },
  created: function() {
    this.getItem();
  },
  methods: {
    getItem: async function() {
      const response = await fetch(
        `http://localhost:3000/users/${this.$route.params.id}`
      );

      if (!response.ok) {
        return alert("通信エラー");
      }

      const result = await response.json();
      this.item = result;
    }
  }
};
</script>

<style >
</style>
