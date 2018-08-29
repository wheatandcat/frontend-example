<template>
  <div>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{item.name}}
      </li>
    </ul>
  </div>
</template>

<script>
const host = process.env.VUE_APP_HOST || "http://localhost:3000";

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
      const response = await fetch(`${host}/users`);

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
