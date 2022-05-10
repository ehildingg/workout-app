<script>
  export default {
    components: {},

    created() {},
    mounted() {
      this.startTimer()
    },
    beforeUnmount() {},
    data() {
      return {
        timeIntervalTestSetByProp: null,
        timeLimit: 20,
        timePassed: 0,
        timerInterval: null,
        alertThreshold: 5,
        warningThreshold: 10
      }
    },
    props: {
      countDownInterval: {
        type: Number,
        default: 3
      }
    },
    watch: {
      countDownInterval: {
        immediate: true,
        deep: true,
        handler(val, oldVal) {
          this.timeIntervalTestSetByProp = val
        }
      }
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
      startTimer() {
        this.timerInterval = setInterval(() => (this.timePassed += 1), 1000)
      },

      initData() {},
      getExerciseArrayIds() {},
      getExersices() {}
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
      },
      timeLeft() {
        return this.timeLimit - this.timePassed
      },
      // Update the dasharray value as time passes, starting with 283
      circleDasharray() {
        return `71 283`
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
            color: 'green'
          },
          warning: {
            color: 'orange',
            threshold: this.warningThreshold
          },
          alert: {
            color: 'red',
            threshold: this.alertThreshold
          }
        }
      },

      remainingPathColor() {
        const { alert, warning, info } = this.colorCodes
        if (this.timeLeft <= alert.threshold) {
          return alert.color
        } else if (this.timeLeft <= warning.threshold) {
          return warning.color
        } else {
          return info.color
        }
      }
    }
  }
</script>
<template>
  <section class="just-a-border">
    <p>CURRENT ROUTINE INTERVAL(seconds) {{ timeIntervalTestSetByProp }}</p>
    <div class="base-timer">
      <svg class="svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="circle">
          <circle class="path-elapsed" cx="50" cy="50" r="46.5" />
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
          <path
            class="path-remaining"
            d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
          />
          <path
            :stroke-dasharray="circleDasharray"
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
  </section>
</template>

<style scoped>
  /* Sets the containers height and width */
  .just-a-border {
    border: 1px solid black;
  }
  .base-timer {
    position: relative;
    width: 300px;
    height: 300px;
  }
  .path-remaining {
    /* Just as thick as the original ring */
    stroke-width: 7px;

    /* Rounds the line endings to create a seamless circle */
    stroke-linecap: round;

    /* Makes sure the animation starts at the top of the circle */
    transform: rotate(90deg);
    transform-origin: center;

    /* One second aligns with the speed of the countdown timer */
    transition: 1s linear all;

    /* Allows the ring to change color when the color value updates */
    stroke: rgb(65, 184, 131);
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
    stroke: grey;
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

  .green {
    color: rgb(65, 184, 131);
  }

  .orange {
    color: orange;
  }

  .red {
    color: red;
  }
</style>
