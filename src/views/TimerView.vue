<script>
  import Timer from '../components/Timer.vue'
  export default {
    components: {
      Timer
    },
    created() {},
    data() {
      return {
        hej: null
      }
    },
    computed: {
      // Get exercisesArray from vuex
      exercisesList: function () {
        return this.$store.state.upperBodyExercises
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
  <Timer />
  <h1>RouterPath: {{ getRoutePathName }}</h1>
  <ol class="list-container" v-if="exercisesList">
    <li class="list-item" :key="exercise.id" v-for="exercise in exercisesList">
      ID: {{ exercise.id }}<br />
      NAME: {{ exercise.blockName }}<br />
      INTERVAL: {{ exercise.seconds }} sec<br />
      REST: {{ exercise.resting }}<br />
      COLOR: {{ exercise.color }}<br />
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
