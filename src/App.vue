<template>
  <el-menu
    mode="horizontal"
    :default-active="$route.path"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    class="pb-header"
  >
    <el-menu-item index="/pages">
      <router-link to="/pages">Pages</router-link>
    </el-menu-item>
    <!-- <el-menu-item index="/page-builder">
      <router-link :to="{ name: 'Builder', params: { id: '1' }}">Page Builder</router-link>
    </el-menu-item> -->
    <!-- <el-menu-item index="/about">
      <router-link to="/about">Docs</router-link>
    </el-menu-item> -->
    <el-menu-item index="/component-store">
      <router-link to="/component-store">Components</router-link>
    </el-menu-item>
    <el-menu-item index="/panel-store">
      <router-link to="/panel-store">Panels</router-link>
    </el-menu-item>
  </el-menu>
  <router-view />
</template>

<style lang="scss">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  font-size: 14px;
  padding: 0;
  // background: rgb(58, 58, 58);
  .el-menu {
    position: fixed;
    width: 100%;
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

</style>
