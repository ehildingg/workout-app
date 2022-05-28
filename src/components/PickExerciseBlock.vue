<template>
  <div v-if="showExercises" class="overlay">
    <div class="dialog scale-in-center">
      <div class="dialog__content">
        <div class="buttons">
          <div class="in-row">
            <button
              @click="toggleBtn"
              class="img-btn"
              :style="singleOrMultipleStyles"
            />
            <button
              v-if="singleOrMultiple"
              @click="closeAndEmitExercises"
              class="button"
            >
              Add all selected exercises
            </button>
            <span class="header-message" v-if="!singleOrMultiple"
              >Select exercise</span
            >
          </div>
          <div class="in-row">
            <button class="cross-btn" @click="closeDialog" />
          </div>
        </div>
        <section class="list-container">
          <article
            ref="exercises"
            :key="exercise.id"
            v-for="(exercise, index) in exerciseList"
            @click="handleExerciseClick(exercise, index)"
          >
            <h2>{{ exercise.blockName }}</h2>
            <h2>{{ exercise.seconds + ' ' + 's' }}</h2>
          </article>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    created() {
      /*       this.exerciseList = this.$store.state.exerciseList */
    },
    computed: {
      exerciseList: function () {
        return this.$store.state.exerciseList
      },
      singleOrMultipleStyles() {
        if (this.singleOrMultiple) {
          return {
            'background-image': "url('/multi-single.svg')"
            /*             'background-image': "url('/assets/single-multi.svg')" */
          }
        } else {
          return {
            'background-image': "url('/single-multi.svg')"
          }
        }
      }
    },
    emits: ['childCloseExercisePicker', 'closeAndAddExercises'],
    methods: {
      handleExerciseClick(exercise, index) {
        if (this.singleOrMultiple) {
          this.addOrDeleteExercise(exercise)
        } else {
          this.pickedExercisesArr = []
          this.pickedExercisesArr.push(exercise)
          this.closeAndEmitExercises()
        }
        this.styleSelectedExercise(index)
      },
      addOrDeleteExercise(exercise) {
        if (this.pickedExercisesArr.some((el) => el.id == exercise.id)) {
          this.pickedExercisesArr = this.pickedExercisesArr.filter(
            (el) => exercise.id != el.id
          )
        } else {
          this.pickedExercisesArr.push(exercise)
        }
      },
      styleSelectedExercise(index) {
        if (
          this.$refs.exercises[index].classList.value == 'selected-exercise'
        ) {
          this.$refs.exercises[index].classList.value = ''
        } else {
          this.$refs.exercises[index].classList.value = 'selected-exercise'
        }
      },
      closeAndEmitExercises() {
        this.$emit('closeAndAddExercises', {
          closeDialog: false,
          pickedExercisesArr: this.pickedExercisesArr
        })
      },
      toggleBtn() {
        this.$refs.exercises.map((el) => (el.classList.value = ''))
        this.pickedExercisesArr = []
        this.singleOrMultiple = !this.singleOrMultiple
      },
      closeDialog() {
        this.$emit(
          'childCloseExercisePicker',
          this.showExercises ? false : true
        )
      }
    },
    data() {
      return {
        pickedExercisesArr: null,
        singleOrMultiple: false
      }
    },

    props: {
      showExercises: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .selected-exercise {
    background: black;
    color: white;
  }
  .header-message {
    margin-top: 10px;
    font-size: 14px;

    /*  height: 2px; */

    background-color: white;
    background-image: none;
    color: white;
    background: transparent;

    font-family: Quicksand;
    font-weight: bold;
    padding: 6px;
  }
  .in-row {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .list-container {
    display: flex;
    flex-direction: column;
    height: 85vh;
    overflow-y: scroll;
    scrollbar-width: thin;
    /* padding: 0rem 0.5rem 0 0.5rem; */
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 0px 0px 8px 8px;
  }

  *::-webkit-scrollbar {
    width: 14px; /* vertical scrollbar */
    height: 14px; /* horizontal scrollbar */
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background: white;
    border-radius: 14px;
    /*     border: calc(14px / 4) solid #ccc; */
  }

  *::-webkit-scrollbar-thumb:hover {
    background: white;
  }
  /* Chrome, Edge, Safari */

  /* list-item start */
  article {
    display: flex;
    color: black;
    background-color: rgb(242, 242, 242);
    justify-content: space-between;
    /* border: 1px solid rgba(255, 255, 255, 0.147); */
    padding: 0rem 1rem 0 0.5rem;
    margin: 0.5rem 0.5rem 0 0.5rem;
    border-radius: 5px;
  }

  article:last-child {
    margin-bottom: 1rem;
  }
  /* list-item end */
  .buttons {
    margin-left: 0.6em;
    margin-right: 0.4em;
    margin-top: 10px;
    margin-bottom: 5px;
    justify-content: space-between;
    display: flex;
    /* background-color: green; */
  }

  .img-btn {
    background-repeat: no-repeat;
    margin-right: 1rem;
    width: 60px;
    height: 36px;
    background-size: contain;
    border: none;
    background-position: 40%;
    background-color: transparent;
  }
  .cross-btn {
    background-image: url('/assets/cross.svg');
    background-repeat: no-repeat;
    width: 38px;
    height: 38px;
    background-size: 20px;
    border: none;
    background-position: center;
    background-color: transparent;
  }

  button {
    margin-top: 10px;

    border-radius: 8px;
    /*  height: 2px; */
    border-style: none;
    background-color: white;
    background-image: none;
    color: white;
    background: transparent;
    border: 2px solid white;

    font-family: Quicksand;
    font-weight: bold;
    padding: 6px;
    /* padding: 0.5em 1em 0.5em 1em; */

    /*  font-size: 16px; */
  }

  *,
  ::before,
  ::after {
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    border-color: #e5e7eb;
  }

  .overlay {
    background-color: rgba(0, 0, 0, 0.4);
    height: 100%;
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    width: 100%;
    z-index: 10;
  }
  .dialog {
    /* background: linear-gradient(17deg, #ffffff, rgb(122, 122, 122)); */
    background: rgb(128, 127, 127);
    opacity: 0.95;
    border-radius: 1rem;
    margin-left: auto;
    margin-right: auto;
    margin-top: 3vh;
    max-width: 90%;
    width: 24rem;
    font-family: Quicksand;
    text-align: center;
  }
  .dialog__content {
    /* padding-left: 0.75rem; */
    /* padding-right: 0.75rem; */
    /*  padding-top: 1px; */
    /* padding-bottom: 1rem; */
  }
  h1 {
    font-weight: bold;
    font-size: 30px;
    line-height: 1.75rem;
    margin-bottom: 1rem;
    /* color: black; */
  }
  .in-row h2 {
    margin-right: 1.2rem;
    font-size: 25px;
    color: #f6f5f3;
  }

  h2 {
    font-size: 18px;
    line-height: 1.25rem;
    margin-bottom: 1rem;
    /* color: black; */
  }

  img {
    height: 50px;
    width: 50px;
  }

  .jello-horizontal {
    -webkit-animation: jello-horizontal 0.9s 1.5s both;
    animation: jello-horizontal 0.9s 1.5s both;
  }

  @-webkit-keyframes jello-horizontal {
    0% {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
    }
    30% {
      -webkit-transform: scale3d(1.25, 0.75, 1);
      transform: scale3d(1.25, 0.75, 1);
    }
    40% {
      -webkit-transform: scale3d(0.75, 1.25, 1);
      transform: scale3d(0.75, 1.25, 1);
    }
    50% {
      -webkit-transform: scale3d(1.15, 0.85, 1);
      transform: scale3d(1.15, 0.85, 1);
    }
    65% {
      -webkit-transform: scale3d(0.95, 1.05, 1);
      transform: scale3d(0.95, 1.05, 1);
    }
    75% {
      -webkit-transform: scale3d(1.05, 0.95, 1);
      transform: scale3d(1.05, 0.95, 1);
    }
    100% {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
    }
  }
  @keyframes jello-horizontal {
    0% {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
    }
    30% {
      -webkit-transform: scale3d(1.25, 0.75, 1);
      transform: scale3d(1.25, 0.75, 1);
    }
    40% {
      -webkit-transform: scale3d(0.75, 1.25, 1);
      transform: scale3d(0.75, 1.25, 1);
    }
    50% {
      -webkit-transform: scale3d(1.15, 0.85, 1);
      transform: scale3d(1.15, 0.85, 1);
    }
    65% {
      -webkit-transform: scale3d(0.95, 1.05, 1);
      transform: scale3d(0.95, 1.05, 1);
    }
    75% {
      -webkit-transform: scale3d(1.05, 0.95, 1);
      transform: scale3d(1.05, 0.95, 1);
    }
    100% {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
    }
  }

  .scale-in-center {
    -webkit-animation: scale-in-center 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
      both;
    animation: scale-in-center 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }

  @-webkit-keyframes scale-in-center {
    0% {
      -webkit-transform: scale(0);
      transform: scale(0);
      opacity: 1;
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 1;
    }
  }
  @keyframes scale-in-center {
    0% {
      -webkit-transform: scale(0);
      transform: scale(0);
      opacity: 1;
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 1;
    }
  }
</style>
