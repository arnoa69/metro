<template>
  <div id="app">
    <div class="showcase">
      <Header />
      <Authors />
    </div>

  </div>
</template>

<script>
import Header from './components/Header'
import Authors from './components/Authors'

export default {
  name: 'App',
  components: {
    Header,
    Authors
  }
}
</script>

<style lang="scss">
@import './assets/styles/museo-sans.css';

body {
  background-color: #E5E5E5;
}

#app {
  font-family: MuseoSans, Helvetica, Arial, sans-serif;
  font-style: normal;
  color: #020202;
  flex: none;
  order: 1;
  align-self: stretch;  
}

.showcase {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}
</style>
