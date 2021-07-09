<template>
  <el-menu
    mode="horizontal"
    :default-active="$route.path"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="">
      <router-link to="/">页面构建</router-link>
    </el-menu-item>
    <el-menu-item index="/about">
      <router-link to="/about">文档</router-link>
    </el-menu-item>
  </el-menu>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0;
  background: rgb(58, 58, 58);
  .el-menu {
    li {
      padding: 0;
      a {
        padding: 0 20px;
        display: block;
        text-decoration: none;
      }
    }
  }
}

#nav {
  padding: 10px;
  height: 50px;
  background: rgb(232, 232, 232);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px 10px 0 0;
  a {
    font-weight: bold;
    color: #2c3e50;
    justify-items: center;
    margin: 0 10px;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
