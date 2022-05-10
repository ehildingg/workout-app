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
      exerciseList: function () {
        return this.$store.state.exercise
      },
      // Get data from router
      getRoutePathName: function () {
        return this.$route.fullPath
      }
    },
    methods: {
      editRoutineRouterLink(selectedId, blockName) {
        this.$router.push({
          name: 'details',
          params: {
            id: selectedId,
            blockName: blockName
          }
        })
      },
      startRoutineRouterLink(selectedId, blockName) {
        this.$router.push({
          name: 'exercise',
          params: {
            id: selectedId,
            blockName: blockName
          }
        })
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
      :key="routineId.id"
      v-for="(routineId, index) in routineList"
    >
      <td>
        <p>{{ $store.state.routineList[index].blockName }}</p>
        <p>{{ $store.state.routineList[index].seconds }} Min</p>
        <!-- <p>{{ $store.state.routineList[index].exercises }}</p> -->
      </td>

      <div class="edit-start">
        <!--         <router-link
          :to="{
            name: 'details',
            params: {
              id: routineId.id,
              blockName: routineId.blockName,
              exercises: routineId.exercises
            }
          }"
          ><button class="routine-btn" id="edit-btn">Edit</button></router-link
        > -->

        <!-- <button @click="$router.push('/edit/' + routineId.id)">Edit</button> -->

        <!--         <router-link
          :to="{
            name: 'exercise',
            params: {
              id: routineId.id,
              blockName: routineId.blockName,
              exercises: routineId.exercises,
              seconds: routineId.seconds
            }
          }"
          ><button class="routine-btn" id="start-btn">
            Start
          </button></router-link
        > -->
        <button
          class="routine-btns"
          id="edit-btn"
          @click="editRoutineRouterLink(routineId.id, routineId.blockName)"
        >
          Edit
        </button>
        <button
          class="routine-btns"
          id="start-btn"
          @click="startRoutineRouterLink(routineId.id, routineId.blockName)"
        >
          Start
        </button>
      </div>
    </tr>
  </table>
  <div id="create">
    <button class="create-btn" @click="$router.push('/edit')">+</button>
  </div>
</template>

<style scoped>
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
  .routine-btns {
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

  .create-btn {
    background-color: green;
    color: white;
    border-radius: 50%;
    height: 38px;
    width: 38px;
  }

  #create {
    display: flex;
    justify-content: right;
    margin-right: 3%;
    margin-bottom: 3%;
  }

  td {
    margin: 0.4em;
  }

  p {
    font-size: 17px;
  }
</style>
