<script>
  export default {
    components: {},
    created() {},
    props: {
      exercises: {
        type: Object,
        default: null
      }
    },
    mounted() {
      this.sec = this.exercises.seconds
      this.name = this.exercises.blockName
      console.log(this.ex)
    },
    data() {
      return { sec: null, name: this.name }
    }
  }
</script>

<template>
  <article class="list-item">
    <div class="slide-container">
      <input
        class="exercise-name"
        id="pencil"
        type="text"
        placeholder="Edit"
        v-model="name"
      /><br />
      <span class="rangeValue">
        <output id="output" name="sec">{{ sec }}s</output>
        <input
          v-model="sec"
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
    background-size: 8px;
    padding: 2px;
  }
  .list-item {
    border: 1px solid gray;
    border-radius: 8px;
    background: #ffffffab;
    max-width: 319px;
    height: 95px;
    margin: 0.3rem;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1.1em;
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
    background-color: white;
    color: #000000;
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
  .slider::after + output {
    display: block;
    transform: translateX(-50%);
  }
</style>
