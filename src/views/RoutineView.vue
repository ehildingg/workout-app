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
      routineList: function () {
        return this.$store.state.routineList
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
  <h3>ROUTINES</h3>
  <ol class="list-container" v-if="routineList">
    <li
      class="list-item"
      :key="routineId"
      v-for="(routineId, index) in routineList"
    >
      NAME: {{ $store.state.routineList[index].blockName }} <br />
      ROUTINE-TIME:
      {{ $store.state.routineList[index].seconds }} sec<br />
    </li>

    <!-- RENDERAR EXERCISES -->

    <!-- <li
      class="list-item"
      :key="exerciseId"
      v-for="exerciseId in routineList[0].exercises"
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
