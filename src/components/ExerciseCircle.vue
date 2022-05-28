<script>
  export default {
    props: {
      timerIsRunning: {
        type: Boolean
      },
      circleindex: {
        type: Number,
        default: 1
      },
      activeindex: {
        type: Number,
        default: 1
      },
      exercise: {
        type: Object,
        default: null
      }
    },
    methods: {},
    computed: {
      circleStyles() {
        if (this.exercise.blockName == 'Rest') {
          return {
            height: '0.8rem',
            width: '0.8rem'
          }
        } else {
          return {
            /* 'background-color': this.exercise.color */
            /*             height: '1.5rem',
            width: '1.5rem' */
          }
        }
      },
      intervalActive() {
        /* return this.activeid === this.circleid */
        return this.activeindex === this.circleindex
      },
      intervalDone() {
        /* console.log('deefe' + this.activeindex + ' + ' + this.circleindex) */
        if (this.activeindex > this.circleindex) {
          return 'tranparent-color'
        } else {
          return 'full-color'
        }
      },
      handleCircleStyles() {
        if (this.intervalActive && this.timerIsRunning) {
          return 'pulse-button'
        } else {
          return ''
        }
      },
      playPauseDisabled() {
        if (
          (this.exercise.blockName == 'Prepare' ||
            this.exercise.blockName == 'Recovery') &&
          this.intervalActive &&
          this.timerIsRunning
        ) {
          return '/active-line.svg'
        } else if (
          (this.exercise.blockName == 'Prepare' ||
            this.exercise.blockName == 'Recovery') &&
          this.intervalActive &&
          !this.timerIsRunning
        ) {
          return '/pause-line.svg'
        } else if (
          (this.exercise.blockName == 'Prepare' ||
            this.exercise.blockName == 'Recovery') &&
          !this.intervalActive
        ) {
          return '/disabled-line.svg'
        } else {
          if (this.intervalActive && this.timerIsRunning) {
            return '/active-circle.svg'
          } else if (this.intervalActive && !this.timerIsRunning) {
            return '/pause-circle.svg'
          } else if (!this.intervalActive) {
            return '/disabled-circle.svg'
          } else {
            return '/disabled-circle.svg'
          }
        }
      }
    }
  }
</script>

<template>
  <!-- <span :style="circleStyles" :class="handleCircleStyles" /> -->
  <div class="circle-item-space-around">
    <img
      alt="exercise"
      :src="playPauseDisabled"
      :style="circleStyles"
      :class="handleCircleStyles + ' ' + intervalDone"
    />
  </div>
</template>

<style scoped>
  .full-color {
    opacity: 1;
  }
  .tranparent-color {
    opacity: 0.1;
  }

  .circle-item-space-around {
    /*   border: 1px solid white; */
    display: flex;
    justify-content: center;
    align-items: center;
    width: 4rem;
    height: 7rem;
  }
  /* Alt 1 circle animation */
  .scale-down-center {
    -webkit-animation: scale-down-center 1s ease-in-out infinite alternate both;
    animation: scale-down-center 1s ease-in-out infinite alternate both;
  }

  @-webkit-keyframes scale-down-center {
    0% {
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
  @keyframes scale-down-center {
    0% {
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }

  /* Alt 2 circle animation */
  .pulse-button {
    -webkit-animation: pulse 1.5s infinite;
    animation: pulse 1.5s infinite;
  }
  @-webkit-keyframes pulse {
    0% {
      -webkit-transform: scale(1);
    }
    70% {
      -webkit-transform: scale(0.8);
    }
    100% {
      -webkit-transform: scale(1);
    }
  }
  @keyframes pulse {
    0% {
      -webkit-transform: scale(1);
    }
    70% {
      -webkit-transform: scale(0.8);
    }
    100% {
      -webkit-transform: scale(1);
    }
  }
</style>
