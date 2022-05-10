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
      this.ex = this.exercises.seconds
      console.log(this.ex)
    },
    data() {
      return { ex: null }
    }
  }
</script>

<template>
  <article class="list-item">
    {{ exercises.blockName }}<br />
    <div class="slide-container">
      <span class="rangeValue" /> {{ ex }} sec
      <input
        v-model="ex"
        type="range"
        min="1"
        max="100"
        class="slider"
        id="myRange"
      />
    </div>
  </article>
</template>

<style scoped>
  /* SCOOPED STYLE/CSS, GÄLLER BARA DENNA KOMPONENTEN
GLOBALA STYLES I APP.VUE */
  .list-item {
    border: 1px solid gray;
    border-radius: 8px;
    background: rgb(126, 133, 147);
    background: linear-gradient(
      17deg,
      rgba(126, 133, 147, 1) 0%,
      rgba(136, 147, 148, 1) 38%,
      rgba(160, 174, 180, 1) 63%,
      rgba(136, 147, 148, 1) 99%
    );
    max-width: 230px;
    margin: 0.3rem;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1em;
    display: flex;
    align-items: center;
    text-align: center;
    flex-direction: column;
  }

  .slider {
    -webkit-appearance: none;
    width: 100%;
    height: 8px;
    border-radius: 5px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 20%;
    background: #04aa6d;
    cursor: pointer;
  }

  .slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #04aa6d;
    cursor: pointer;
  }

  .slide-container .rangeValue {
    position: absolute;
  }
</style>
