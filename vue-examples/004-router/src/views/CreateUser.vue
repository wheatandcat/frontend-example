<template>
  <div>
    <h1>form</h1>
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
  </div>
</template>

<script>
export default {
  name: "CreateUser",
  data() {
    return {
      input: {
        name: "",
        genderCode: "1"
      }
    };
  },
  methods: {
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

      const result = await response.json();
      this.items = result;

      this.$router.push("users/" + result.id);
    }
  }
};
</script>

<style >
</style>
