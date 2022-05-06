<script>
  export default {
    components: {},
    created() {
      this.initData()
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
        exerciseArrayIds: null,
        exerciseArray: [],
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
        this.counterInSeconds = this.exerciseArray[this.currentExercise].seconds
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
      },
      initData() {
        //Router index
        let routerString = '0'
        console.log(
          this.$store.state.routineList[Number(routerString)].exercises
        )
        this.exerciseArrayIds = this.$store.state.routineList[0].exercises
        console.log(this.exerciseArrayIds)

        this.exerciseArrayIds.forEach((id) => {
          this.exerciseArray.push(this.$store.state.exerciseList[id])
        })

        console.log(this.exerciseArray)

        this.exerciseArray.forEach((exercise) => {
          this.totalCounter += exercise.seconds
        })
        console.log(this.totalCounter)

        this.counterInSeconds = this.exerciseArray[0].seconds
        console.log(this.exerciseArray[0].seconds)
      }
    },
    computed: {
      totalTimeLeft: function () {
        return new Date(this.totalCounter * 1000).toISOString().slice(14, 19)
      }
    }
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
