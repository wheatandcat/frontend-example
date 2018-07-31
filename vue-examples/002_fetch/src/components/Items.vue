<template>
  <div>
    <h1>users</h1>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{item.name}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Items",
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
