<script>
  export default {
    components: {},
    created() {
      this.initData()
    },
    beforeUnmount() {
      if (this.timers.exerciseTimer.isRunning) {
        this.$timer.stop('exerciseTimer')
      }
    },
    timers: {
      exerciseTimer: {
        time: 1000,
        autostart: true,
        immediate: true,
        repeat: true,
        isSwitchTab: true
      }
    },
    data() {
      return {
        exerciseArrayIds: null,
        exerciseArray: null,
        totalCounter: null,
        counterInSeconds: null,
        currentExercise: null
      }
    },
    methods: {
      // Timer methods
      exerciseTimer() {
        console.log('ÖvningsTimer: ' + this.counterInSeconds)
        this.counterInSeconds--
        this.totalCounter--
        console.log('Total Timer:' + this.totalCounter)

        if (this.counterInSeconds == 0 && this.totalCounter != 0) {
          this.$timer.stop('exerciseTimer')
          this.prepareNextExercise()
          this.startNextExercise()
        }
        if (this.totalCounter <= 0) {
          this.finishWorkout()
        }
      },
      prepareNextExercise() {
        this.currentExercise++
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
        this.timers.exerciseTimer.isRunning
          ? this.$timer.stop('exerciseTimer')
          : this.$timer.start('exerciseTimer')
        /*           console.log(this.timers.exerciseTimer.isRunning)
        } else {
          console.log('Exercise is done')
        } */
      },
      // Timer methods end

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
          .filter((el) => el.id == Number(this.$route.params.id))
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
      }
    },
    computed: {
      totalTimeLeft: function () {
        return new Date(this.totalCounter * 1000).toISOString().slice(14, 19)
      }
    },
    props: {}
  }
</script>

<template>
  <div v-if="exerciseArray">
    <h1>{{ this.exerciseArray[this.currentExercise].blockName }}</h1>
    <h1>{{ this.counterInSeconds }}</h1>
    <h1>Totaltimer:</h1>
    <h1>{{ this.totalCounter }}</h1>
    <p>{{ totalTimeLeft }}</p>
  </div>

  <div class="dot-container">
    <span :key="exercise.id" v-for="exercise in exerciseArray" />
  </div>
  <button @click="playPauseBtnClick()">Pause</button>
</template>

<style scoped>
  .dot-container {
    overflow: scroll;
    white-space: nowrap;
  }
  .dot-active {
    opacity: 1;
  }
  .dot-inactive {
    opacity: 0.5;
  }
  span {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    margin: 5px;
    border-radius: 50%;
    background-color: rgb(41, 82, 119);
  }
  .div {
    border: 1px solid black;
  }
</style>
