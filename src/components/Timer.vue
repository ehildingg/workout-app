<script>
  export default {
    created() {
      this.start()
    },
    beforeUnmount() {
      this.$timer.stop('start')
    },
    timers: {
      start: { time: 1000, autostart: true, repeat: true }
    },
    data() {
      return {
        timerId: null,
        countSec: 0,
        index: 0,
        executeEventSecond: 0,

        sec: 20,
        min: 1,
        hour: 0,
        intervals: [],
        timer: null
      }
    },
    methods: {
      start() {
        console.log(this.countSec)

        if (this.countSec === this.executeEventSecond) {
          console.log('Index', this.index)

          if (this.index < this.exercisesArray.length) {
            console.log(this.exercisesArray[this.index].blockName)
            this.executeEventSecond += this.exercisesArray[this.index].seconds
          } else {
            console.log('Exercise completed')
          }

          this.index++
        }

        if (this.countSec >= this.executeEventSecond) {
          this.$timer.stop('start')
        }

        console.log(
          'executesecond: ',
          this.executeEventSecond + ' countsec: ',
          this.countSec
        )
        this.countSec++
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
      exercisesArray: function () {
        return this.$store.state.upperBodyExercises
      },
      nrOfrestIntervals: function () {
        return this.nrOfSets < 1 ? 0 : this.nrOfSets - 1
      },
      totalTime: function () {
        return (
          this.nrOfSets * this.activeTimeSec +
          this.norOfIntervals * this.restTimeSec
        )
      }
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
  <div>Timer</div>
</template>

<style scoped>
  .div {
    border: 1px solid black;
  }
</style>
