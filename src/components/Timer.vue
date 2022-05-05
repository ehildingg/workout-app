<script>
  export default {
    created() {
      this.exerciseArray = this.$store.state.upperBodyExercises
      this.exerciseArray.forEach((exercise) => {
        this.totalCounter += exercise.durationInSeconds
      })
      this.counterInSeconds = this.exerciseArray[0].durationInSeconds
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
        counterInSeconds: null,
        currentExercise: 0
      }
    },
    methods: {
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
        this.counterInSeconds =
          this.exerciseArray[this.currentExercise].durationInSeconds
      },

      startNextExercise() {
        this.$timer.start('exerciseTimer')
      },
      finishWorkout() {
        this.$timer.stop('exerciseTimer')
      },

      playPauseBtnClick() {
        if (this.totalCounter > 0) {
          this.timers.exerciseTimer.isRunning
            ? this.$timer.stop('exerciseTimer')
            : this.$timer.start('exerciseTimer')
          console.log(this.timers.exerciseTimer.isRunning)
        } else {
          console.log('Exercise is done')
        }
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
    <button @click="playPauseBtnClick()">Pause</button>
  </div>
</template>

<style scoped>
  .div {
    border: 1px solid black;
  }
</style>

<!--
      btnState: function () {
        return this.timers.exerciseTimer.isRunning
      }, -->

<!--             /*       exercisesArray: function () {
        return this.$store.state.upperBodyExercises
      }, */ -->
