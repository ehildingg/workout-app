<script>
  export default {
    components: {},
    created() {},
    data() {
      return {
        hej: null
      }
    },
    computed: {
      // Get exercisesArray from vuex
      exercisesList: function () {
        return this.$store.state.exerciseList
      },
      // Get data from router
      getRoutePathName: function () {
        return this.$route.fullPath
      }
    },
    methods: {
      hejFunction() {
        console.log('hej')
      }
    }
  }
</script>

<template>
  <h1>RouterPath: {{ getRoutePathName }}</h1>
  <ol class="list-container" v-if="exercisesList">
    <li class="list-item" :key="exercice.id" v-for="exercice in exercisesList">
      ID: {{ exercice.id }}<br />
      NAME: {{ exercice.blockName }}<br />
      INTERVAL: {{ exercice.seconds }} sec<br />
      REST: {{ exercice.resting }}<br />
      COLOR: {{ exercice.color }}<br />
    </li>
  </ol>
</template>

<style scoped>
  /* SCOOPED STYLE/CSS, GÄLLER BARA DENNA KOMPONENTEN
GLOBALA STYLES I APP.VUE */

  .list-container {
    border: 1px solid black;
  }
  .list-item {
    border: 1px solid gray;
    margin: 0.3rem;
  }
</style>
