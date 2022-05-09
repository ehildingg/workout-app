@
<script>
  import ExerciseBlock from '../components/ExerciseBlock.vue'

  export default {
    components: { ExerciseBlock },
    created() {
      this.$watch(
        () => this.$route.params.id,
        (newValue, oldValue) => {
          console.log('OLD ' + oldValue + ' NEW ' + newValue)
          this.$store.getters.chekIfRoutineExists(newValue)
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
        doesRoutineExist: true
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
        console.log(this.exerciseArrayIds)
      },
      getExersices() {
        this.exerciseArray = this.exerciseArrayIds.map(
          (id) => this.$store.state.exerciseList[id]
        )
        console.log('exercise array', this.exerciseArray)
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
      }
      /*       doesRoutineExist(id) {
        return this.$store.getters.chekIfRoutineExists(id);
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
  <h1>RouterPath: {{ getRoutePathName }}</h1>
  <h2>{{ routeRoutineName }} routine</h2>
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
    <!--     <router-link
      :to="{
        name: 'exercise',
        params: {
          id: routeRoutineId,
          blockName: routeRoutineName
        }
      }"
    >
      <button class="startbtn" id="start-btn" :disabled="isDisabled">
        Start
      </button>
    </router-link> -->

    <button
      class="startbtn"
      id="start-btn"
      :disabled="isDisabled"
      @click="startRoutineRouterLink"
    >
      Start
    </button>
    <!--     <button
      class="startbtn"
      @click="$router.push('/exercise/' + routeRoutineId)"
    >
      Start
    </button> -->

    <div class="dropup">
      <button class="dropbtn" @click="toggleMenu">
        Add new <br />
        exercise
      </button>
      <div :class="`dropup-content ${showMenu}`">
        <a>Exercise</a>
        <a>Rest</a>
        <a>Running</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
  button:disabled,
  button[disabled] {
    background-color: #aeaeae35;
    color: #84848455;
  }
  .list-container {
    border: 1px solid black;
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

  .dropbtn {
    background-color: #0d2bc3;
    color: white;
    padding: 16px;
    font-size: 16px;
    border: none;
    border-radius: 10px;
    min-width: 140px;
  }

  .startbtn {
    background-color: #1b7934;
    color: white;
    padding: 35px;
    font-size: 16px;
    border: none;
    border-radius: 50%;
  }

  .dropup {
    position: relative;
    display: inline-block;
  }

  .dropup-content {
    /* display: none; */
    position: absolute;
    background-color: #a3a3a3;
    min-width: 160px;
    bottom: 70px;
    z-index: 1;
  }

  .dropup-content a {
    color: black;
    padding: 12px 16px;
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
    background-color: #2980b9;
  }

  .startbtn:hover {
    background-color: #35bd49;
  }
</style>
