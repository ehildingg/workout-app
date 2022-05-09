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
        if (
          this.exercise.blockName === 'Rest' ||
          this.exercise.blockName === 'Recovery'
        ) {
          return {
            'background-color': this.exercise.color,
            height: '0.8rem',
            width: '0.8rem'
          }
        } else {
          return {
            'background-color': this.exercise.color,
            height: '1.5rem',
            width: '1.5rem'
          }
        }
      },
      intervalActive() {
        /* return this.activeid === this.circleid */
        return this.activeindex === this.circleindex
      },
      handleCircleStyles() {
        if (this.intervalActive && this.timerIsRunning) {
          return 'scale-down-center full-color'
        } else if (this.intervalActive && !this.timerIsRunning) {
          return 'full-color'
        } else if (!this.intervalActive) {
          return 'tranparent-color'
        } else {
          return 'tranparent-color'
        }
      }
    }
  }
</script>

<template>
  <span :style="circleStyles" :class="handleCircleStyles" />
</template>

<style scoped>
  .full-color {
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
    opacity: 1;
  }
  .tranparent-color {
    opacity: 0.1;
  }
  span {
    z-index: 1;
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    margin: 5px;
    border-radius: 50%;
    /*     opacity: 0.1; */
  }

  /* Alt 1 circle animation */
  .scale-down-center {
    -webkit-animation: scale-down-center 1s ease-in-out infinite alternate both;
    animation: scale-down-center 1s ease-in-out infinite alternate both;
  }

  @-webkit-keyframes scale-down-center {
    0% {
      -webkit-transform: scale(1.2);
      transform: scale(1.2);
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
  @keyframes scale-down-center {
    0% {
      -webkit-transform: scale(1.2);
      transform: scale(1.2);
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
      -webkit-transform: scale(0.9);
    }
    70% {
      -webkit-transform: scale(1);
    }
    100% {
      -webkit-transform: scale(0.9);
    }
  }
  @keyframes pulse {
    0% {
      -webkit-transform: scale(0.9);
    }
    70% {
      -webkit-transform: scale(1);
    }
    100% {
      -webkit-transform: scale(0.9);
    }
  }
</style>
