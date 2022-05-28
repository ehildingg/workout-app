<script>
  export default {
    components: {},
    methods: {
      downArrow() {
        /* console.log('ned', this.exerciseLength) */
        if (this.index <= this.exerciseLength) {
          this.$emit('down-arrow', this.index)
        }
      },
      upArrow() {
        /* console.log('upp') */
        if (this.index > 0) {
          this.$emit('up-arrow', this.index)
        }
      },
      deleteExercise() {
        this.$emit('del-exercise', this.index)
      },
      changeSec(e) {
        this.$emit('sec-changed', {
          sec: e.target.value,
          childIndex: this.index
        })
      },
      changeName(e) {
        if (this.timer) {
          clearTimeout(this.timer)
          this.timer = null
        }
        this.timer = setTimeout(() => {
          this.$emit('name-changed', {
            name: e.target.value,
            childIndex: this.index
          })
        }, 800)
      }
    },
    emits: [
      'sec-changed',
      'name-changed',
      'del-exercise',
      'down-arrow',
      'up-arrow'
    ],
    created() {},
    props: {
      exerciseLength: {
        type: Number,
        default: 0
      },
      exercises: {
        type: Object,
        default: null
      },
      index: {
        type: Number,
        default: 0
      },
      animationdown: {
        type: String,
        default: ''
      },
      animationup: {
        type: String,
        default: ''
      }
    },
    computed: {
      rest() {
        return this.exercises.blockName == 'Rest'
          ? 'rest-color'
          : 'default-color'
      }
    },
    mounted() {},
    data() {
      return { timer: null, timerSec: null, secShow: null }
    }
  }
</script>

<template>
  <article
    :class="
      'list-item' +
      ' ' +
      this.rest +
      ' ' +
      this.animationdown +
      ' ' +
      this.animationup
    "
    v-if="this.exercises"
  >
    <img
      v-if="index != exerciseLength - 1"
      @click="downArrow"
      class="down-arrow"
      src="/assets/arrow-move.svg"
    />
    <img
      v-if="index != 0"
      @click="upArrow"
      class="up-arrow"
      src="/assets/arrow-move-up.svg"
    />

    <div class="slide-container">
      <input
        class="exercise-name"
        @input="changeName"
        id="pencil"
        type="text"
        placeholder="Edit"
        :value="exercises.blockName"
      />

      <span class="delete-btn" @click="deleteExercise" />

      <span class="rangeValue">
        <output id="output" name="sec">{{ exercises.seconds }}s</output>
        <input
          :value="String(exercises.seconds)"
          @input="changeSec"
          type="range"
          min="1"
          max="100"
          class="slider"
          id="myRange"
        />
      </span>
    </div>
  </article>
</template>

<style scoped>
  /* SCOOPED STYLE/CSS, GÄLLER BARA DENNA KOMPONENTEN
  GLOBALA STYLES I APP.VUE */

  .delete-btn {
    display: inline-block;
    cursor: pointer;
    /*  background-color: green; */
    margin-left: 10px;
    height: 25px;
    width: 20px;
    background-image: url('/assets/delete-icon.svg');
    background-repeat: no-repeat;
    background-position-x: right;
    background-position-y: 100%;
    background-size: 15px;
    padding: 2px;
  }
  .exercise-name {
    border: none;
    background: transparent;
    color: #000000;
    font-size: 14px;
    font-family: 'Quicksand', sans-serif, 'Avenir', Helvetica, Arial, sans-serif;
    text-align: left;
    margin: 0.2em;
    margin-bottom: 10px;
  }

  #pencil {
    position: relative;
    width: 250px;
    height: 25px;
    background-image: url('/assets/pencil.svg');
    background-repeat: no-repeat;
    background-position-x: right;
    background-position-y: 20%;
    background-size: 14px;
    padding: 2px;
  }

  .rest-color {
    background: linear-gradient(17deg, #fd8e34, #ffca56);
    height: 50px;
  }

  .default-color {
    background: #ffffffab;
  }

  .list-item {
    position: relative;
    /* border: 2px solid white; */
    border-radius: 8px;
    /*   background: #ffffffab; */
    max-width: 319px;
    height: 95px;
    margin: 0.3rem;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1.4rem;
    display: flex;
    align-items: center;
    text-align: center;
    flex-direction: column;
  }

  .slider {
    -webkit-appearance: none;
    width: 100%;
    height: 10px;
    border-radius: 10px;
    background: #993be0;
    outline: none;
    opacity: 0.7;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
    background-position-y: 10px;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 10%;
    background: linear-gradient(17deg, #000000, #222222);
    cursor: pointer;
  }

  .slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 10%;
    background: linear-gradient(17deg, #000000, #222222);
    cursor: pointer;
  }
  .slide-container .rangeValue {
    position: relative;
    display: block;
  }

  output {
    position: relative;
    width: 25px;
    height: 25px;
    border-radius: 10%;
    background: linear-gradient(17deg, #000000, #8d8d8d);
    /*  background-color: white; */
    /*   color: #000000; */
    color: white;
    line-height: 24px;
    font-size: 14px;
    text-align: center;
    top: -4px;
    display: inline-block;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  .down-arrow {
    position: absolute;
    right: -10px;
    bottom: -12px;
    z-index: 1;
    cursor: pointer;
  }

  .up-arrow {
    position: absolute;
    left: -10px;
    top: -12px;
    z-index: 1;
    cursor: pointer;
  }

  .up-arrow:hover,
  .up-arrow:focus,
  .up-arrow:active,
  .down-arrow:hover,
  .down-arrow:focus,
  .down-arrow:active {
    opacity: 0.9;
  }

  .animateup {
    animation: pulseup 0.5s ease-in;
  }
  .animatedown {
    animation: pulse 0.5s ease-in;
  }
  @keyframes pulseup {
    0% {
      transform: translateY(1in);
    }
    25% {
      transform: scale(0.9);
      /*  transform: translateY(-1in); */
      opacity: 0.3;
    }
    75% {
      transform: scale(1.05);
      opacity: 0.5;
    }
  }

  @keyframes pulse {
    0% {
      transform: translateY(-1in);
    }
    25% {
      transform: scale(0.9);
      /*  transform: translateY(-1in); */
      opacity: 0.3;
    }
    75% {
      transform: scale(1.05);
      opacity: 0.5;
    }
  }

  @keyframes push {
    50% {
      transform: scale(0.8);
      opacity: 0.8;
    }
  }
  @keyframes pop {
    50% {
      transform: scale(1.05);
      opacity: 1;
    }
  }
</style>
