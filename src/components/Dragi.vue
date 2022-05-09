<template>
  <h1>RouterPath: {{ getRoutePathName }}</h1>
  <h2>{{ routeRoutineName }} routine</h2>
  <section class="list-container" v-if="exerciseArray && doesRoutineExist">
    <div class="flex m-10">
      <draggable
        class=""
        :list="exerciseArray"
        @change="logDraggingEventNewIndexOldIndexElement"
      >
        <ExerciseBlock
          :key="exercise + index"
          v-for="(exercise, index) in exerciseArray"
          :exercises="exercise"
        >
          />
        </ExerciseBlock>
        <!--       <div
        class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
        v-for="(element, index) in exerciseArray"
        :key="element.blockName + index"
      >
        {{ element.blockName }} -->
      </draggable>
    </div>
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
<script>
  import ExerciseBlock from './ExerciseBlock.vue'
  import { defineComponent } from 'vue'
  import { VueDraggableNext } from 'vue-draggable-next'
  export default defineComponent({
    components: {
      ExerciseBlock,
      draggable: VueDraggableNext
    },
    created() {
      this.$watch(
        () => this.$route.params.id,
        (newValue, oldValue) => {
          console.log('OLD ' + oldValue + ' NEW ' + newValue)
          this.$store.getters.chekIfRoutineExists(1)
            ? this.init()
            : (this.doesRoutineExist = false)
        },
        { immediate: true }
      )
    },
    data() {
      return {
        enabled: true,
        dragging: false,

        showMenu: 'hideMenu',
        hideOrShow: false,
        routineId: null,
        exerciseArrayIds: null,
        exerciseArray: null,
        doesRoutineExist: true
      }
    },
    props: ['id', 'blockName', 'exercises'],
    methods: {
      // Wath whats hapening to element when dragging it
      logDraggingEventNewIndexOldIndexElement(event) {
        console.log(event)
      },
      getExerciseArrayIds() {
        this.exerciseArrayIds = this.$store.state.routineList
          .filter((el) => el.id == 1)
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
    },
    computed: {
      // Get exercisesArray from vuex
      exercisesList: function () {
        return this.$store.state.exerciseList
      },
      // Get data from router
      getRoutePathName: function () {
        return 'Test drag'
        /* return this.$route.fullPath */
      },
      routeRoutineId: function () {
        return 1
        /* return Number(this.$route.params.id) */
      },
      routeRoutineName: function () {
        return 'TestBlock'
        /* return this.$route.params.blockName */
      },
      isDisabled() {
        return !this.doesRoutineExist
      }
    }
  })
</script>

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
