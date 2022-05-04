<script>
  export default {
    components: {},
    created() {},
    data() {
      return {
        hej: null
      }
    },
    computed: {},
    methods: {
      hejFunction() {
        console.log('hej')
      }
    },
    props: {
      exercise: {
        type: Object,
        default: null
      }
    }
  }
  // Test
</script>

<template>
  <article class="list-item">
    ID: {{ exercise.id }}<br />
    NAME: {{ exercise.blockName }}<br />
    INTERVAL: {{ exercise.seconds }} sec<br />
    REST: {{ exercise.resting }}<br />
    COLOR: {{ exercise.color }}<br />
  </article>
</template>

<style scoped>
  .list-item {
    border: 1px solid gray;
    margin: 0.3rem;
  }
  /* SCOOPED STYLE/CSS, GÄLLER BARA DENNA KOMPONENTEN
GLOBALA STYLES I APP.VUE */
</style>
