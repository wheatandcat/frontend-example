<template>
  <div id="app">
    <h3>
      nuxt | 004-router
    </h3>
    <div id="nav">
      <router-link to="/">Users</router-link> |
      <router-link to="/createUser">CreateUser</router-link> 
    </div>
    <router-view/>
  </div>
</template>

<style>
#nav {
  padding: 30px 0;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
