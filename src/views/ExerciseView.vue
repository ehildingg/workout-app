<script>
  import ExerciseCircle from '../components/ExerciseCircle.vue'

  export default {
    components: { ExerciseCircle },
    /*     beforeCreated() {
      this.$router.go()
    }, */
    created() {
      // Watch router.params. Use router.params.id to get exercise from vuex-store
      this.$watch(
        () => this.$route.params.id,
        (newValue) => {
          // Check if the exercise exists in vuex-store. If not show error message
          this.$store.getters.chekIfRoutineExists(newValue)
            ? this.initData()
            : (this.doesRoutineExist = false)
        },
        { immediate: true }
      )
    },
    beforeUnmount() {
      // Always stop timer when leaving route
      if (this.timerIsRunning) {
        this.$timer.stop('exerciseTimer')
      }
    },
    timers: {
      // This is the timer
      exerciseTimer: {
        time: 1000,
        autostart: true,
        /*         immediate: true, */
        repeat: true,
        isSwitchTab: true
      }
    },
    data() {
      return {
        doesRoutineExist: true,
        exerciseArrayIds: null,
        exerciseArray: null,
        totalCounter: null,
        counterInSeconds: null,
        currentExercise: null
      }
    },
    methods: {
      // Method that executes every second, connected to the timerdeclaration() in timers(row 28)
      exerciseTimer() {
        if (!this.doesRoutineExist) {
          this.$timer.stop('exerciseTimer')
        }
        console.log('ÖvningsTimer: ' + this.counterInSeconds)
        this.counterInSeconds--
        this.totalCounter--
        console.log('Total Timer:' + this.totalCounter)

        if (this.counterInSeconds == 0 && this.totalCounter != 0) {
          // this.$timer.stop('exerciseTimer')
          this.prepareNextExercise()
          // this.startNextExercise()
        }
        if (this.totalCounter <= 0) {
          this.finishWorkout()
        }
      },
      prepareNextExercise() {
        this.currentExercise++
        this.scrollToElement(this.currentExercise)
        console.log(this.exerciseArray[this.currentExercise].blockName)
        this.counterInSeconds = this.exerciseArray[this.currentExercise].seconds
      },
      startNextExercise() {
        this.$timer.start('exerciseTimer')
      },
      finishWorkout() {
        this.$timer.stop('exerciseTimer')
      },

      playPauseBtnClick() {
        /*         if (this.totalCounter > 0) { */
        console.log(this.timers.exerciseTimer)
        this.timerIsRunning
          ? this.$timer.stop('exerciseTimer')
          : this.$timer.start('exerciseTimer')

        /*           console.log(this.timers.exerciseTimer.isRunning)
          } else {
            console.log('Exercise is done')
          } */
      },

      initData() {
        this.getExerciseArrayIds()
        this.getExersices()
        this.setTotalCounter()
        this.setFirstCounterInterval()
        this.currentExercise = 0
        /*         console.log(this.exerciseArray)
          console.log(this.totalCounter)
          console.log(this.exerciseArray[0].seconds) */
      },
      getExerciseArrayIds() {
        this.exerciseArrayIds = this.$store.state.routineList
          .filter((el) => el.id == this.routeRoutineId)
          .map((ele) => ele.exercises)
          .flat()
      },
      getExersices() {
        this.exerciseArray = this.exerciseArrayIds.map(
          (id) => this.$store.state.exerciseList[id]
        )
        /* this.exerciseArrayIds.forEach((id) => {
            this.exerciseArray.push(this.$store.state.exerciseList[id])
          }) */
      },
      setTotalCounter() {
        this.totalCounter = this.exerciseArray.reduce(
          (previousValue, currentValue) => previousValue + currentValue.seconds,
          0
        )
        /* this.exerciseArray.forEach((exercise) => {
            this.totalCounter += exercise.seconds
          }) */
      },
      setFirstCounterInterval() {
        this.counterInSeconds = this.exerciseArray[0].seconds
      },
      scrollToElement(elRefIndex) {
        console.log('allrefs: ', this.$refs.exercise)
        this.$refs.exercise[elRefIndex].scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        })
      }
    },
    computed: {
      timerIsRunning: function () {
        return this.timers.exerciseTimer.isRunning
      },
      totalTimeLeft: function () {
        return new Date(this.totalCounter * 1000).toISOString().slice(14, 19)
      },
      routeRoutineId: function () {
        return Number(this.$route.params.id)
      },
      routineName: function () {
        return this.$route.params.blockName
      },
      isDisabled() {
        // Disable start/pause-btn
        return !this.doesRoutineExist
      }
    }
  }
</script>

<template>
  <div v-if="exerciseArray && doesRoutineExist">
    <div>
      <h1>{{ routineName }} routine</h1>
      <p>{{ this.exerciseArray[this.currentExercise].blockName }}</p>
      <h2>{{ this.counterInSeconds }}</h2>
      <p>Totaltimer:</p>
      <h2>{{ this.totalCounter }}</h2>
      <h2>{{ totalTimeLeft }}</h2>
    </div>

    <div class="dot-container">
      <span
        :key="exercise.id"
        v-for="(exercise, index) in exerciseArray"
        ref="exercise"
      >
        <ExerciseCircle
          :timer-is-running="timerIsRunning"
          :activeindex="currentExercise"
          :circleindex="index"
          :exercise="exercise"
        />
      </span>
    </div>
    <button @click="playPauseBtnClick()" :disabled="isDisabled">
      {{ timerIsRunning ? 'Pause' : 'Play' }}
    </button>
  </div>
  <div v-else>Sorry, the exercise does not exist</div>
</template>

<style scoped>
  button:disabled,
  button[disabled] {
    background-color: #aeaeae35;
    color: #84848455;
  }
  .dot-container {
    position: relative;
    overflow: scroll;
    white-space: nowrap;
    display: flex;
    align-items: center;
  }
  .div {
    border: 1px solid black;
  }
</style>
