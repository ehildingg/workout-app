<script>
  export default {
    components: {},

    created() {},
    mounted() {
      // this.startTimer()
    },
    beforeUnmount() {},
    data() {
      return {
        timeIntervalTestSetByProp: null,
        timeLimit: null,
        timePassed: null,
        timerInterval: null,
        alertThreshold: 2,
        warningThreshold: 4,
        pauseThreshold: true,
        hideOrShow: true
      }
    },
    props: {
      countDownInterval: {
        type: Number,
        default: 0
      },
      countDownSec: {
        type: Number,
        default: 0
      },
      timerIsRunning: {
        type: Boolean
      }
    },
    watch: {
      countDownInterval: {
        immediate: true,
        deep: true,
        handler(val, oldVal) {
          this.forceRerender()
          this.timeLimit = val
        }
      }
      // countDownSec: {
      //   immediate: true,
      //   deep: true,
      //   handler(newValue, oldValue) {
      //     this.timePassed = newValue
      //   }
      // }
    },
    /*     watch: {
          ciecleTimerInSeconds: function () {
              immediate: true,
              deep: true,
              handler(newValue, oldValue) {
                  console.log(newValue);
              }
          }
      }, */
    methods: {
      /*       startTimer() {
          this.timerInterval = setInterval(() => (this.timePassed += 1), 1000)
        } */

      forceRerender() {
        // remove the my-component component from the DOM
        this.hideOrShow = false

        this.$nextTick(() => {
          // add my-component component in DOM
          this.hideOrShow = true
        })
      }
    },
    computed: {
      formattedTimeLeft() {
        const timeLeft = this.timeLeft

        const minutes = Math.floor(timeLeft / 60)

        let seconds = timeLeft % 60

        if (seconds < 10) {
          seconds = `0${seconds}`
        }

        // The output in MM:SS format
        return `${minutes}:${seconds}`
      }, // timelimit = 6 sek - timepassed = 6sek
      // 6 - 6
      // 6 - 5
      // 6 - 4
      timeLeft() {
        return this.countDownSec
      },
      // Update the dasharray value as time passes, starting with 283
      circleDasharray() {
        return `${(this.timeFraction * 283).toFixed(0)} 283`
      },

      timeFraction() {
        const rawTimeFraction = this.timeLeft / this.timeLimit

        return rawTimeFraction - (1 / this.timeLimit) * (1 - rawTimeFraction)
      },

      // ------------------------------- circle timer

      /*       timerIsRunning: function () {},
        totalTimeLeft: function () {},
        routeRoutineId: function () {},
        routineName: function () {}, */

      colorCodes() {
        return {
          info: {
            color: this.timerIsRunning ? 'darkBlue' : 'red'
          },
          warning: {
            color: 'orange',
            threshold: this.warningThreshold
          },
          alert: {
            color: 'lightBlue',
            threshold: this.alertThreshold
          },
          paused: {
            color: 'red',
            threshold: this.pauseThreshold
          }
        }
      },

      remainingPathColor() {
        const { alert, warning, info, paused } = this.colorCodes
        if (this.timeLeft <= alert.threshold) {
          return this.timerIsRunning ? alert.color : paused.color
        } else if (this.timeLeft <= warning.threshold) {
          return this.timerIsRunning ? warning.color : paused.color
        } else {
          return this.timerIsRunning ? info.color : paused.color
        }
      }
    }
  }
</script>
<template>
  <!--   <section class="just-a-border">
    <p>CURRENT ROUTINE INTERVAL(seconds) {{ timeIntervalTestSetByProp }}</p> -->
  <div class="base-timer" v-if="hideOrShow">
    <svg class="svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g class="circle">
        <circle class="path-elapsed" cx="50" cy="50" r="45" />
        <path
          :stroke-dasharray="circleDasharray"
          :class="remainingPathColor"
          class="path-remaining"
          d="
      M 50, 50
      m -45, 0
      a 45,45 0 1,0 90,0
      a 45,45 0 1,0 -90,0
    "
        />
      </g>
    </svg>
    <span class="label">
      {{ formattedTimeLeft }}
    </span>
  </div>

  <!--   <div>Sorry, the exercise does not exist</div> -->
  <!--   </section> -->
</template>

<style scoped>
  /* Sets the containers height and width */
  .just-a-border {
    /* border: 1px solid black; */
  }
  .base-timer {
    position: relative;
    width: 300px;
    height: 300px;
  }

  svg {
    transform: scaleX(-1);
  }

  /* Removes SVG styling that would hide the time label */
  .circle {
    fill: none;
    stroke: none;
  }

  /* The SVG path that displays the timer's progress */
  .path-elapsed {
    stroke-width: 7px;
    stroke: #222222;
  }

  .label {
    position: absolute;

    /* Size should match the parent container */
    width: 300px;
    height: 300px;

    /* Keep the label aligned to the top */
    top: 0;

    /* Create a flexible box that centers content vertically and horizontally */
    display: flex;
    align-items: center;
    justify-content: center;

    /* Sort of an arbitrary number; adjust to your liking */
    font-size: 48px;
  }
  .path-remaining {
    stroke-width: 7px;
    stroke-linecap: round;
    transform: rotate(90deg);
    transform-origin: center;
    transition: 1s linear all;
    fill-rule: nonzero;
    stroke: currentColor;
    color: rgb(65, 184, 131);
  }

  .darkBlue {
    /* color: rgb(65, 184, 131); */
    color: #0467ba;
  }

  .orange {
    /* color: orange; */
    color: #0467ba;
  }

  .lightBlue {
    /* color: red; */

    color: #4be8f2;
  }

  .red {
    color: #f73c5d;
  }
</style>
