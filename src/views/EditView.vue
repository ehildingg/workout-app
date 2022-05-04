<script>
  import ExerciseBlock from '../components/ExerciseBlock.vue'
  export default {
    components: { ExerciseBlock },
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
  <h1>RouterPath: {{ getRoutePathName }}</h1>
  <section class="list-container" v-if="exercisesList">
    <ExerciseBlock
      :key="exercise.id"
      v-for="exercise in exercisesList"
      :exercise="exercise"
    />
  </section>
</template>

<style scoped>
  /* SCOOPED STYLE/CSS, GÄLLER BARA DENNA KOMPONENTEN
GLOBALA STYLES I APP.VUE */
  .list-container {
    border: 1px solid black;
  }
</style>
