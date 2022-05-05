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
  <table class="list-container" v-if="routineList">
    <tr
      class="list-item"
      :key="routineId"
      v-for="(routineId, index) in routineList"
    >
      <td>
        <p>{{ $store.state.routineList[index].blockName }}</p>
        <p>{{ $store.state.routineList[index].seconds }} Min</p>
      </td>
      <div class="edit-start">
        <button
          class="routine-btn"
          id="edit-btn"
          @click="$router.push('/edit')"
        >
          Edit
        </button>
        <button
          class="routine-btn"
          id="start-btn"
          @click="$router.push('/exercise')"
        >
          Start
        </button>
      </div>

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
    </tr>
  </table>
</template>

<style scoped>
  /* SCOOPED STYLE/CSS, GÄLLER BARA DENNA KOMPONENTEN
  GLOBALA STYLES I APP.VUE */

  .list-container {
    border: 1px solid black;
    display: inline;
  }
  .list-item {
    border-radius: 8px;
    background: rgb(126, 133, 147);
    background: linear-gradient(
      17deg,
      rgba(126, 133, 147, 1) 0%,
      rgba(136, 147, 148, 1) 38%,
      rgba(160, 174, 180, 1) 63%,
      rgba(136, 147, 148, 1) 99%
    );
    max-width: 230px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1em;
    display: flex;
    align-items: center;
    text-align: center;
    flex-direction: column;
  }
  .edit-start {
    margin-bottom: 0.4em;
    display: flex;
    align-items: center;
  }
  .routine-btn {
    width: 38px;
    margin-left: 32px;
    margin-right: 32px;
    border: none;
    padding: 0.4em;
  }

  #edit-btn {
    background-color: lightgrey;
    border-radius: 10%;
    height: 30px;
  }

  #start-btn {
    background-color: grey;
    border-radius: 50%;
    height: 38px;
  }

  td {
    margin: 0.4em;
  }

  p {
    font-size: 17px;
  }
</style>
