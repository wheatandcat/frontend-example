<template>
  <div id="app">
     <h4>vue | 002-fetch</h4>
    <Users/>
  </div>
</template>

<script>
import Users from "./components/Users.vue";

export default {
  name: "app",
  components: {
    Users
  }
};
</script>

<style>
#app {
  padding: 1rem;
}
</style>
