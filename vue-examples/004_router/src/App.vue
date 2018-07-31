<template>
  <div id="app">
    <div id="nav">
      <router-link to="/users">Users</router-link> |
      <router-link to="/createUser">CreateUser</router-link> 
    </div>
    <router-view/>
  </div>
</template>

<style>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
