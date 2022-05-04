<script>
  /*   import CitiesList from './components/CitiesList.vue'
  import CounterButton from './components/CounterButton.vue'
  import HelloWorld from './components/HelloWorld.vue' */

  export default {
    components: {
      /*
      CitiesList,
      CounterButton,
      HelloWorld
      */
    }
  }
</script>

<template>
  <nav>
    <ul>
      <li>
        <RouterLink to="/">StartView</RouterLink>
      </li>
      <li>
        <RouterLink to="/edit">EditViewändrar</RouterLink>
      </li>
      <li>
        <RouterLink to="/timer">TimerView</RouterLink>
      </li>
    </ul>
  </nav>
  <main>
    <RouterView />
  </main>
  <p>TESTAR</p>
</template>

<style>
  /* GLOBAL STYLES HERE, STYLE CSS FÖR ALLA KOMPONENTER */
  body,
  html {
    padding: 0;
    margin: 0;
    width: 100%;
    min-height: 100vh;
  }
  button {
    background: rgba(8, 193, 39, 0.1);
    cursor: pointer;
  }
  button:hover,
  button:focus {
    background: rgba(4, 118, 32, 0.3);
  }
</style>

<style scoped>
  /* SCOOPED STYLE/CSS, GÄLLER BARA DENNA KOMPONENTEN(APP.VUE)*/

  /*Borders så att man ser olika views enklare*/
  nav {
    border: 2px solid blue;
  }
  main {
    border: 3px solid rgb(0, 205, 58);
  }
</style>
