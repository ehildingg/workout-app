<script>
  export default {
    created() {
      this.exerciseArray = this.$store.state.upperBodyExercises
      /*       this.totalCounter = this.exerciseArray.reduce(
        (previousValue, currentValue) => previousValue + currentValue.seconds,
        0
      )
      console.log(this.totalCounter) */
      this.exerciseArray.forEach((exercise) => {
        this.totalCounter += exercise.durationInSeconds
      })
    },
    beforeUnmount() {
      this.$timer.stop('exerciseTimer')
    },
    timers: {
      exerciseTimer: {
        time: 1000,
        autostart: true,
        repeat: true
      }
    },
    data() {
      return {
        exerciseArray: null,
        totalCounter: null,
        counterInSeconds: 5,
        currentExercise: 0

        /*         sec: 20,
        min: 1,
        hour: 0,
        intervals: [],
        timer: null */
      }
    },
    methods: {
      exerciseTimer() {
        console.log('ÖvningsTimer: ' + this.counterInSeconds)
        this.counterInSeconds--
        this.totalCounter--
        console.log('Total Timer:' + this.totalCounter)

        if (this.counterInSeconds == 0) {
          this.$timer.stop('exerciseTimer')
          this.prepareNextExercise()
          this.startNextExercise()
        }
        if (this.totalCounter == 0) {
          this.finishWorkout()
        }
      },

      prepareNextExercise() {
        this.currentExercise++
        console.log(this.exerciseArray[this.currentExercise].blockName)
        this.counterInSeconds =
          this.exerciseArray[this.currentExercise].durationInSeconds
      },

      startNextExercise() {
        this.$timer.start('exerciseTimer')
      },
      finishWorkout() {
        this.$timer.stop('exerciseTimer')
      }

      /*       startRoutine() {
        if (this.timer === null) {
          this.onGoingRoutine()
          this.timer = setInterval(() => this.onGoingRoutine(), 1000)
        } else {
          clearInterval(this.timer)
          this.timer = null
          this.pause()
        }
      }, */
      /*
      onGoingRoutine() {
        this.totalTimeCounter()
      }, */

      /*       onGoingRoutine() {
        this.sec--
        if (this.sec == 0) {
          this.sec = 60
          this.min--
        }
        if (this.min == 0) {
          this.min = 60
          this.hour--
        }
        if (this.hour == 0 && this.min == 0 && this.sec == 0) {
          clearInterval(this.timer)
          this.timer = null
        }
      } */
    },
    computed: {
      /*       exercisesArray: function () {
        return this.$store.state.upperBodyExercises
      } */
      /*       totalTimeLeft: function () {
        (this.hour * 3600) + (this.min * 60) + (this.sec)
        const result = new Date(seconds * 1000).toISOString().slice(11, 19)
        console.log(result) // 👉️ "00:10:00" (hh:mm:ss)
      } */
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
  </div>
</template>

<style scoped>
  .div {
    border: 1px solid black;
  }
</style>
