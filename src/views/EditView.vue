<script>
  import ExerciseBlock from '../components/ExerciseBlock.vue'
  export default {
    components: { ExerciseBlock },
    created() {},
    data() {
      return {
        showMenu: 'hideMenu',
        hideOrShow: false
      }
    },
    computed: {
      // Get exercisesArray from vuex
      exercisesList: function () {
        return this.$store.state.upperBodyExercises
      },
      // Get data from router
      getRoutePathName: function () {
        return this.$route.fullPath
      }
    },
    methods: {
      toggleMenu() {
        this.hideOrShow = !this.hideOrShow
        if (this.hideOrShow) {
          this.showMenu = 'showMenu'
        } else {
          this.showMenu = 'hideMenu'
        }
      }
    }
  }
</script>

<template>
  <h1>RouterPath: {{ getRoutePathName }}</h1>
  <section class="list-container" v-if="exercisesList">
    <ExerciseBlock
      :key="exercise.id"
      v-for="exercise in exercisesList"
      :exercise="exercise"
    />
  </section>
  <div class="menu-container">
    <button class="startbtn" @click="$router.push('/exercise')">Start</button>

    <div class="dropup">
      <button class="dropbtn" @click="toggleMenu">
        Add new <br />
        exercise
      </button>
      <div :class="`dropup-content ${showMenu}`">
        <a>Exercise</a>
        <a>Rest</a>
        <a>Running</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
  /* SCOOPED STYLE/CSS, GÄLLER BARA DENNA KOMPONENTEN
GLOBALA STYLES I APP.VUE */
  .list-container {
    border: 1px solid black;
  }

  .menu-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .showMenu {
    display: block;
    background-color: #2980b9;
  }

  .hideMenu {
    display: none;
  }

  .dropbtn {
    background-color: #0d2bc3;
    color: white;
    padding: 16px;
    font-size: 16px;
    border: none;
    border-radius: 10px;
    min-width: 140px;
  }

  .startbtn {
    background-color: #1b7934;
    color: white;
    padding: 35px;
    font-size: 16px;
    border: none;
    border-radius: 50%;
  }

  .dropup {
    position: relative;
    display: inline-block;
  }

  .dropup-content {
    /* display: none; */
    position: absolute;
    background-color: #a3a3a3;
    min-width: 160px;
    bottom: 70px;
    z-index: 1;
  }

  .dropup-content a {
    color: black;
    padding: 12px 16px;
    display: block;
  }

  .dropup-content a:hover {
    background-color: #ccc;
  }

  .dropup:focus .dropup-content,
  .dropup:hover .dropup-content {
    display: block;
  }

  .dropup:hover .dropbtn {
    background-color: #2980b9;
  }

  .startbtn:hover {
    background-color: #35bd49;
  }
</style>
