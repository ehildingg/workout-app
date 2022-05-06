<script>
  export default {
    components: {},
    created() {},
    props: ['id', 'blockName', 'exercises']
  }
</script>

<template>
  <article class="list-item">
    <p>Details</p>
    {{ id }}
    {{ blockName }}
    {{ exercises }}
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
