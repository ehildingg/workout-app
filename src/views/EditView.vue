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
          let routineId = newValue
          /*           this.routineNameChanged = this.$route.params.blockName */

          this.$store.getters.checkIfRoutineExists(routineId)
            ? this.init()
            : (this.doesRoutineExist = false)
        },
        { immediate: true }
      )
      // Clear temp saved id
      this.$store.commit('clearSavedId')
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
        isSaved: false,

        routineNameChanged: null,

        animationIndexDown: null,
        animationIndexUp: null
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

      // New routine-stuff save, edit...
      savedNewId: function () {
        return this.$store.state.savedNewId
      },
      routeRoutineId: function () {
        if (this.savedNewId) {
          return this.savedNewId
        } else {
          return Number(this.$route.params.id)
        }
      },

      routeRoutineName: function () {
        /*         if (this.$route.params.blockName != this.routeRoutineNameChanged) {
          return ''
        } else { */
        return this.$route.params.blockName
        /*   } */
      },
      isDisabled() {
        return !this.doesRoutineExist
      }
    },
    methods: {
      upArrow(childIndex) {
        // Put values in variables, for readability. Used in splice-functions
        let numberOfElToDelete = 1
        let fromIndex = childIndex
        let toIndex = childIndex - 1
        // Get element(pickedElementToMove) and remove it from (exerciseArray), function does two things
        const pickedElementToMove = this.exerciseArray.splice(
          fromIndex,
          numberOfElToDelete
        )[0]
        // Change value to zero, no index to delete, just adding (splice takes 3 args in this case)
        numberOfElToDelete = 0
        // Add picked-out(pickedElementToMove) element to new index
        this.exerciseArray.splice(
          toIndex,
          numberOfElToDelete,
          pickedElementToMove
        )
        // Change values that triggers animation when index changes
        this.animationIndexDown = null
        this.animationIndexUp = toIndex
      },

      downArrow(childIndex) {
        // Put values in variables, for readability. Used in splice-functions
        let numberOfElToDelete = 1
        let fromIndex = childIndex
        let toIndex = childIndex + 1
        // Get element(pickedElementToMove) and remove it from (exerciseArray), function does two things
        const pickedElementToMove = this.exerciseArray.splice(
          fromIndex,
          numberOfElToDelete
        )[0]
        // Change value to zero, no index to delete, just adding (splice takes 3 args in this case)
        numberOfElToDelete = 0
        // Add picked-out(pickedElementToMove) element to new index
        this.exerciseArray.splice(
          toIndex,
          numberOfElToDelete,
          pickedElementToMove
        )
        // Change values that triggers animation when index changes
        this.animationIndexUp = null
        this.animationIndexDown = toIndex
        /* const activeClass = 'test'
        console.log('refs', this.$refs.exercise)
        this.$refs.exercise[toIndex].classList.value = [activeClass] */
      },

      createNewBlock(type) {
        switch (type) {
          case 'exercise':
            this.exerciseArray.push(this.$store.state.exerciseList['21'])
            break
          case 'rest':
            this.exerciseArray.push(this.$store.state.exerciseList['1'])
            break
        }
      },

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
        this.exerciseArray = JSON.parse(
          JSON.stringify(
            this.exerciseArrayIds.map(
              (id) => this.$store.state.exerciseList[id]
            )
          )
        )
      },

      getEditedExersices() {
        this.exerciseArray = JSON.parse(
          JSON.stringify(
            this.$store.state.routineList[
              this.$store.state.routineList.findIndex(
                (element) => element.id == this.routeRoutineId
              )
            ].exercisesEdited.exercises.map((el) => el)
          )
        )
      },

      init() {
        // Check if routine is edited, if edited get edited array
        if (
          this.$store.state.routineList[
            this.$store.state.routineList.findIndex(
              (element) => element.id == this.routeRoutineId
            )
          ].exercisesEdited.edited == false
        ) {
          this.getExerciseArrayIds()
          this.getExersices()
        } else {
          this.getEditedExersices()
        }
      },

      startRoutineRouterLink() {
        if (!this.isSaved) {
          // Add NOT saved routine to vuex store to be able to start but not save
          this.$store.commit('updateTempRoutine', {
            // blockName: this.routineName,
            exArr: this.exerciseArray
          })
          /* console.log('updated', this.$store.state.tempRoutine) */
          this.$router.push({
            name: 'exercise',
            params: {
              id: 'temp',
              blockName: 'tempname',
              cycles: '1'
            }
          })
        } else {
          this.$router.push({
            name: 'exercise',
            params: {
              id: this.routeRoutineId,
              blockName: this.routeRoutineName,
              cycles: '1'
            }
          })
        }
      },

      saveEditedRoutine() {
        this.$store.commit('updateEditedRoutine', {
          /* blockName: this.routineName, */
          exArr: this.exerciseArray,
          updateId: this.routeRoutineId
        })

        this.isSaved = true
        console.log('saved')
      },
      /*       doesRoutineExist(id) {
        return this.$store.getters.checkIfRoutineExists(id);
      } */
      deleteExercise(childIndex) {
        this.exerciseArray = this.exerciseArray.filter(
          (exerciceBlockElement, index) => childIndex != index
        )
        this.isSaved = false
      },

      onSecChanged({ sec, childIndex }) {
        /*         console.log('sec childindes ' + sec + childIndex)
        console.log('before sec-change arr ', this.exerciseArray) */
        this.exerciseArray = this.exerciseArray.map(
          (exerciceBlockElement, index) =>
            childIndex == index
              ? {
                  ...exerciceBlockElement,
                  seconds: Number(sec)
                }
              : exerciceBlockElement
        )
        this.isSaved = false
        /* console.log('after sec-change arr', this.exerciseArray) */
      },

      onNameChanged({ name, childIndex }) {
        /* console.log('name childindex ' + name + childIndex) */
        this.exerciseArray = this.exerciseArray.map(
          (exerciceBlockElement, index) =>
            childIndex == index
              ? {
                  ...exerciceBlockElement,
                  blockName: name
                }
              : exerciceBlockElement
        )
        this.isSaved = false
        /* console.log('after name-change arr', this.exerciseArray) */
      }
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
  <!-- ref="exercise" -->

  <!-- class="test" -->
  <section class="list-container" v-if="exerciseArray && doesRoutineExist">
    <!-- ref="exercise" -->
    <ExerciseBlock
      :key="exercise + index"
      v-for="(exercise, index) in exerciseArray"
      :animationdown="this.animationIndexDown == index ? 'animatedown' : ''"
      :animationup="this.animationIndexUp == index ? 'animateup' : ''"
      :exercises="exercise"
      :index="index"
      :exercise-length="this.exerciseArray.length"
      @sec-changed="onSecChanged"
      @name-changed="onNameChanged"
      @del-exercise="deleteExercise"
      @up-arrow="upArrow"
      @down-arrow="downArrow"
    />
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
        <a @click="createNewBlock('exercise')"
          ><img src="/assets/exercise-icon.svg"
        /></a>
        <a @click="createNewBlock('rest')"
          ><img src="/assets/rest-icon.svg"
        /></a>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .test {
    border: 1px solid white;
  }
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
