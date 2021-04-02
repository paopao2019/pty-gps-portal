<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">教学点管理</router-link> |
      <router-link to="/distance">距离计算</router-link> |
      <keepalived>
        <router-link to="/map">教学点地图</router-link>
      </keepalived>

      <el-divider></el-divider>

    </div>
    <router-view/>
  </div>
</template>

<style>
  /*引入样式*/
  @import './assets/css/pty.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

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
