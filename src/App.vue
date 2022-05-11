<script>
  /*   import Dragi from './components/Dragi.vue' */
  export default {
    /*     components: { Dragi } */
  }
</script>

<template>
  <!--   <Dragi /> -->
  <nav>
    <ul>
      <li>
        <RouterLink to="/">RoutineView</RouterLink>
      </li>
      <li>
        <RouterLink to="/exercise/1">ExerciseView</RouterLink>
      </li>
      <li>
        <RouterLink to="/edit">EditView</RouterLink>
      </li>
    </ul>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style>
  /* GLOBAL STYLES HERE, STYLE CSS FÖR ALLA KOMPONENTER */
  @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

  body,
  html {
    padding: 0;
    margin: 0;
    width: 100%;
    min-height: 100vh;
    font-family: 'Quicksand', sans-serif, 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #343434;
    color: white;
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
