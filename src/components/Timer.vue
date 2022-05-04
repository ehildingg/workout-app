<script>
  export default {
    created() {},
    data() {
      return {
        timerId: null,
        /*         delay: 1000,
        countSec: 0,
        index: 0,
        executeEventSecond: 0, */

        sec: 20,
        min: 1,
        hour: 0,
        intervals: [],
        timer: null
      }
    },
    methods: {
      start() {
        let delay = 1000 // 1 second
        let countSec = 0
        let index = 0
        let executeEventSecond = 0

        this.timerId = setInterval(() => {
          console.log(countSec)

          if (countSec === executeEventSecond) {
            console.log('Index', index)

            if (index < exercisesArray.length) {
              console.log(exercisesArray[index].blockName)
              executeEventSecond += exercisesArray[index].seconds
            } else {
              console.log('Exercise completed')
            }

            index++
          }

          if (countSec >= executeEventSecond) {
            clearInterval(timerId)
          }

          console.log(
            'executesecond: ',
            executeEventSecond + ' countsec: ',
            countSec
          )
          countSec++
        }, delay)
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
      exercisesList: function () {
        return this.$store.state.exerciseList
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
    props: {
      nrOfSets: {
        type: Number,
        default: 5
      },
      activeTimeSec: {
        type: Number,
        default: 7
      },
      restTimeSec: {
        type: Number,
        default: 8
      }
    }
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
