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
      workoutList: function () {
        return this.$store.state.workoutList
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
  <h3>WORKOUT ROUTINES</h3>
  <ol class="list-container" v-if="workoutList">
    <li
      class="list-item"
      :key="workoutId"
      v-for="(workoutId, index) in workoutList"
    >
      NAME: {{ $store.state.workoutList[index].blockName }} <br />
      ROUTINE-TIME:
      {{ $store.state.workoutList[index].seconds }} sec<br />
    </li>

    <!-- RENDERAR EXERCISES -->

    <!-- <li
      class="list-item"
      :key="exerciseId"
      v-for="exerciseId in workoutList[0].exercises"
    >
      ID: {{ $store.state.exerciseList[exerciseId].id }}<br />
      NAME: {{ $store.state.exerciseList[exerciseId].blockName }}<br />
      INTERVAL: {{ $store.state.exerciseList[exerciseId].seconds }} sec<br />
      REST: {{ $store.state.exerciseList[exerciseId].resting }}<br />
      COLOR: {{ $store.state.exerciseList[exerciseId].color }}<br />
      EXCERCISES: {{ $store.state.exerciseList[exerciseId] }}<br />

    </li> -->
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
-->
