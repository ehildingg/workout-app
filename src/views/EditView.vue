@
<script>
  // import { ModuleGraph } from 'vite'
  import ExerciseBlock from '../components/ExerciseBlock.vue'

  export default {
    components: { ExerciseBlock },
    created() {
      this.$watch(
        () => this.$route.params.id,
        (newValue, oldValue) => {
          /* console.log('OLD ' + oldValue + ' NEW ' + newValue) */
          this.$store.getters.checkIfRoutineExists(newValue)
            ? this.init()
            : (this.doesRoutineExist = false)
        },
        { immediate: true }
      )
    },
    beforeUnmount() {
      this.exerciseArrayIds = null
      this.exerciseArray = null
    },
    data() {
      return {
        showMenu: 'hideMenu',
        hideOrShow: false,
        routineId: null,
        exerciseArrayIds: null,
        exerciseArray: null,
        doesRoutineExist: true,
        isSaved: false
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
      },
      routeRoutineId: function () {
        return Number(this.$route.params.id)
      },
      routeRoutineName: function () {
        return this.$route.params.blockName
      },
      isDisabled() {
        return !this.doesRoutineExist
      }
    },
    methods: {
      toggleMenu() {
        this.hideOrShow = !this.hideOrShow
        if (this.hideOrShow) {
          this.showMenu = 'showMenu'
        } else {
          this.showMenu = 'hideMenu'
        }
      },
      getExerciseArrayIds() {
        this.exerciseArrayIds = this.$store.state.routineList
          .filter((el) => el.id == this.routeRoutineId)
          .map((ele) => ele.exercises)
          .flat()
        /* console.log(this.exerciseArrayIds) */
      },
      getExersices() {
        this.exerciseArray = this.exerciseArrayIds.map(
          (id) => this.$store.state.exerciseList[id]
        )
        /* console.log('exercise array', this.exerciseArray) */
      },
      init() {
        this.getExerciseArrayIds()
        this.getExersices()
      },

      startRoutineRouterLink() {
        this.$router.push({
          name: 'exercise',
          params: {
            id: this.routeRoutineId,
            blockName: this.routeRoutineName
          }
        })
      },
      saveEditedRoutine() {
        this.isSaved = true
        console.log('saved')
      }
      /*       doesRoutineExist(id) {
        return this.$store.getters.checkIfRoutineExists(id);
      } */
    },

    props: {
      id: {
        type: String,
        default: null
      },
      blockName: {
        type: String,
        default: null
      },
      exercises: {
        type: Object,
        default: null
      }
    }
  }
</script>

<template>
  <div class="header">
    <button id="back-btn" @click="$router.push('/')" />
  </div>
  <h3>RouterPath: {{ getRoutePathName }}</h3>
  <input
    class="routine-name"
    id="pencil"
    type="text"
    placeholder="ROUTINE"
    v-model="this.routeRoutineName"
  />
  <br />

  <section class="list-container" v-if="exerciseArray && doesRoutineExist">
    <ExerciseBlock
      :key="exercise + index"
      v-for="(exercise, index) in exerciseArray"
      :exercises="exercise"
    >
      />
    </ExerciseBlock>
  </section>
  <section v-else>Sorry, this routine does not exist</section>

  <div class="menu-container">
    <button
      class="save-btn"
      id="save-btn"
      :disabled="isDisabled"
      :class="{ 'save-btn': !isSaved, 'saved-btn': isSaved }"
      @click="saveEditedRoutine"
    >
      {{ isSaved ? 'Saved!' : 'Save' }}
    </button>
    <button
      class="startbtn"
      id="start-btn"
      :disabled="isDisabled"
      @click="startRoutineRouterLink"
    />

    <div class="dropup">
      <button class="dropbtn" @click="toggleMenu">
        <br />
      </button>
      <div :class="`dropup-content ${showMenu}`">
        <a><img src="/assets/exercise-icon.svg" /></a>
        <a><img src="/assets/rest-icon.svg" /></a>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .header {
    margin-left: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  #back-btn {
    background-image: url('/assets/back-btn.svg');
    background-repeat: no-repeat;
    width: 38px;
    height: 38px;
    background-size: 24px;
    border: none;
    background-position: 40%;
    background-color: transparent;
  }
  .routine-name {
    border: none;
    height: 50px;
    background: transparent;
    color: white;
    font-size: x-large;
    font-family: 'Quicksand', sans-serif, 'Avenir', Helvetica, Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: auto;
  }

  #pencil {
    position: relative;
    width: 230px;
    height: 30px;
    background-image: url('/assets/pencil.svg');
    background-repeat: no-repeat;
    background-position-x: 95%;
    background-position-y: 20%;
    background-size: 10px;
    padding: 2px;
  }

  button:disabled,
  button[disabled] {
    background-color: #aeaeae35;
    color: #84848455;
  }
  .list-container {
    /* border: 1px solid black; */
  }

  .menu-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .showMenu {
    display: block;
    background-color: #2980b9;
  }

  .hideMenu {
    display: none;
  }
  .save-btn {
    background-color: red;
    border-radius: 50%;
    color: white;
    font-size: 16px;
    height: 70px;
    width: 70px;
    background-image: url('/assets/start-background.svg');
    background-position: center;
    background-repeat: no-repeat;
    border: none;
    background-size: 65px;
    background-position-x: center;
    background-position-y: center;
    margin: 10px;
  }

  .saved-btn {
    background-color: rgb(52, 151, 77);
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 50%;
    text-align: center;
  }

  .startbtn {
    background-color: transparent;
    height: 75px;
    width: 75px;
    background-image: url('/assets/start-icon.svg'),
      url('/assets/start-background.svg');
    background-position: center, center;
    background-repeat: no-repeat;
    border: none;
    background-size: 35px, 65px;
    background-position-x: 55%, center;
    background-position-y: 60%, center;
    margin: 10px;
  }

  .dropup {
    position: relative;
    display: inline-block;
  }

  .dropup-content {
    /* display: none; */
    position: absolute;
    background-color: #343434;
    min-width: 160px;
    bottom: 85px;
    right: 5px;
    z-index: 1;
  }

  .dropup-content a {
    color: black;
    padding-top: 5px;
    padding-left: 5px;
    padding-right: 5px;
    display: block;
  }

  .dropup-content a:hover {
    background-color: #ccc;
  }

  .dropup:focus .dropup-content,
  .dropup:hover .dropup-content {
    display: block;
  }

  .dropup:hover .dropbtn {
    /* background-color: #2980b9; */
  }

  .startbtn:hover {
    background-color: #35bd49;
  }

  .dropbtn {
    background-image: url('/assets/create-btn.svg');
    background-repeat: no-repeat;
    background-color: transparent;
    height: 65px;
    width: 65px;
    background-size: 63px;
    border: none;
    background-position: 50%;
    margin: 10px;
  }
</style>
