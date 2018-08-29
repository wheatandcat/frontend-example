<template>
  <div id="app">
    <h4>vue | 004-router</h4>
    <div id="nav">
      <router-link to="/users">Users</router-link> |
      <router-link to="/createUser">CreateUser</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  padding: 1rem;
}

#nav a {
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
