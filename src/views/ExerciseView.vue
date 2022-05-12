<script>
  import ExerciseCircle from '../components/ExerciseCircle.vue'
  import CircleTimer from '../components/CircleTimer.vue'
  let that
  export default {
    components: { ExerciseCircle, CircleTimer },
    /*     beforeCreated() {
      this.$router.go()
    }, */
    created() {
      that = this
      // Watch router.params. Use router.params.id to get exercise from vuex-store
      this.$watch(
        () => this.$route.params.id,
        (newValue) => {
          // Check if the exercise exists in vuex-store. If not show error message
          this.$store.getters.checkIfRoutineExists(newValue)
            ? this.initData()
            : (this.doesRoutineExist = false)
        },
        { immediate: true }
      )
    },
    beforeUnmount() {
      console.log('before pause ?')
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
        currentExercise: null,

        circleTimerInSeconds: null
      }
    },
    methods: {
      // Method that executes every second, connected to the timerdeclaration() in timers(row 28)
      exerciseTimer() {
        console.log('Timer', that.$timer)
        if (!that.doesRoutineExist) {
          that.$timer.stop('exerciseTimer')
        }
        console.log('ÖvningsTimer: ' + that.counterInSeconds)
        that.counterInSeconds--
        that.totalCounter--
        console.log('Total Timer:' + that.totalCounter)

        if (that.counterInSeconds == 0 && that.totalCounter != 0) {
          // this.$timer.stop('exerciseTimer')
          that.prepareNextExercise()
          // this.startNextExercise()
        }
        if (that.totalCounter <= 0) {
          that.finishWorkout()
        }
      },
      prepareNextExercise() {
        this.currentExercise++
        this.scrollToElement(this.currentExercise)
        console.log(this.exerciseArray[this.currentExercise].blockName)
        this.counterInSeconds = this.exerciseArray[this.currentExercise].seconds

        that.circleTimerInSeconds =
          that.exerciseArray[that.currentExercise].seconds
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
        this.$timer.stop('exerciseTimer')
        this.getExerciseArrayIds()
        this.getExersices()
        this.setTotalCounter()
        this.setFirstCounterInterval()
        this.currentExercise = 0
        this.circleTimerInSeconds = this.exerciseArray[0].seconds
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
        this.exerciseArray.unshift({
          id: 0,
          blockName: 'Prepare',
          seconds: 5,
          resting: false,
          color: 'yellow'
        })
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
      playOrPause: function () {
        return this.timerIsRunning
          ? '/assets/pause-button.svg'
          : '/assets/play-button.svg'
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
      <div class="in-row">
        <span>Total time left:</span>
        <h3>{{ totalTimeLeft + ' ' }}</h3>
      </div>
      <div class="center-temp">
        <CircleTimer
          :count-down-interval="circleTimerInSeconds"
          :count-down-sec="counterInSeconds"
        />
      </div>
      <span>Exercise</span>
      <p>{{ this.exerciseArray[this.currentExercise].blockName }}</p>
      <!--      <h2>{{ this.counterInSeconds }}</h2>

      <h2>{{ this.totalCounter }}</h2> -->
    </div>

    <div class="dot-container">
      <span
        class="circle"
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
    <div class="center-temp">
      <button @click="playPauseBtnClick()" :disabled="isDisabled">
        <!--       {{ timerIsRunning ? 'Pause' : 'Play' }} -->
        <img alt="playOrPause" :src="playOrPause" />
      </button>
    </div>
  </div>
  <div v-else>Sorry, the exercise does not exist</div>
</template>

<style scoped>
  .center-temp {
    display: flex;
    justify-content: center;
  }
  p,
  h1,
  h2,
  h3 {
    margin: 0;
  }

  p {
    font-size: 20px;
    font-weight: bold;
  }
  h1 {
    /* font-size: 30px; */
    font-size: 1.9rem;
  }
  .in-row {
    margin-top: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
  }
  button {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
  button:disabled,
  button[disabled] {
    background-color: #aeaeae35;
    color: #84848455;
  }
  .dot-container {
    /*  min-height: 200px; */
    position: relative;
    overflow: scroll;
    white-space: nowrap;
    display: flex;
    align-items: center;
  }
  .circle:nth-child(2) {
    padding-left: 1rem;
  }
  .circle:last-child {
    padding-left: 1rem;
  }

  .div {
    /* border: 1px solid black; */
  }
</style>
