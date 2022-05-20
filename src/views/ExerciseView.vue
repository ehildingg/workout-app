<script>
  import ExerciseCircle from '../components/ExerciseCircle.vue'
  import CircleTimer from '../components/CircleTimer.vue'
  import FinishedExerciseDialog from '../components/FinishedExerciseDialog.vue'
  let that
  export default {
    components: { ExerciseCircle, CircleTimer, FinishedExerciseDialog },
    /*     beforeCreated() {
        this.$router.go()
      }, */
    created() {
      that = this
      // Watch router.params. Use router.params.id to get exercise from vuex-store
      this.$watch(
        () => this.$route.params.id,
        (newValue) => {
          console.log('bb2', this.$route.params.id)
          // Check if the exercise exists in vuex-store. If not show error message
          if (this.$route.params.id == 'temp') {
            this.initData(this.$route.params.id)
          } else {
            this.$store.getters.checkIfRoutineExists(newValue)
              ? this.initData('')
              : (this.doesRoutineExist = false)
          }
        },
        { immediate: true }
      )
      window.addEventListener('resize', this.screenSizeEvent)
    },
    mounted() {
      /*       console.log(this.$refs.dots.clientWidth)
        console.log(
          this.$refs.exercise.reduce(
            (previousValue, currentValue) =>
              previousValue + currentValue.clientWidth,
            0
          )
        ) */

      this.totalWidthCircles = this.$refs.exercise.reduce(
        (previousValue, currentValue) =>
          previousValue + currentValue.clientWidth,
        0
      )

      this.initialScreenSizeEvent(window.innerWidth)
    },
    beforeUnmount() {
      console.log('before pause ?')
      // Always stop timer when leaving route
      if (this.timerIsRunning) {
        this.$timer.stop('exerciseTimer')
      }
    },
    unmounted() {
      window.removeEventListener('resize', this.screenSizeEvent)
    },
    timers: {
      // This is the timer
      exerciseTimer: {
        time: 1000,
        autostart: true,
        /*         immediate: true, */
        repeat: true,
        isSwitchTab: true
      }
    },
    data() {
      return {
        doesRoutineExist: true,
        exerciseArrayIds: null,
        exerciseArray: null,
        tempaArr: null,
        totalCounter: null,
        counterInSeconds: null,
        currentExercise: null,

        circleTimerInSeconds: null,

        totalWidthCircles: null,
        centerOrNot: null,
        showDialog: false,

        pos: { top: 0, left: 0, x: 0, y: 0 }
      }
    },
    methods: {
      // Method that executes every second, connected to the timerdeclaration() in timers(row 28)
      exerciseTimer() {
        /* console.log('Timer', that.$timer) */
        if (!that.doesRoutineExist) {
          that.$timer.stop('exerciseTimer')
        }
        /* console.log('ÖvningsTimer: ' + that.counterInSeconds) */
        that.counterInSeconds--
        that.totalCounter--
        /* console.log('Total Timer:' + that.totalCounter) */

        if (that.counterInSeconds == 0 && that.totalCounter != 0) {
          this.$timer.stop('exerciseTimer')
          that.prepareNextExercise()
          this.startNextExercise()
        }
        if (that.totalCounter <= 0) {
          that.finishWorkout()
        }
      },
      prepareNextExercise() {
        this.currentExercise++
        this.scrollToElement(this.currentExercise)
        /* console.log(this.exerciseArray[this.currentExercise].blockName) */
        this.counterInSeconds = this.exerciseArray[this.currentExercise].seconds

        that.circleTimerInSeconds =
          that.exerciseArray[that.currentExercise].seconds
      },
      startNextExercise() {
        that.$timer.start('exerciseTimer')
      },
      finishWorkout() {
        that.$timer.stop('exerciseTimer')
        this.showDialog = true
      },

      dialogStayOnPage() {
        console.log('stay on page')
        this.showDialog = false
      },
      dialogBackToRoutines() {
        console.log('Go back to routines')
        this.$router.push('/')
      },

      playPauseBtnClick() {
        /*         if (this.totalCounter > 0) { */
        /* console.log(this.timers.exerciseTimer) */
        this.timerIsRunning
          ? this.$timer.stop('exerciseTimer')
          : this.$timer.start('exerciseTimer')

        /*           console.log(this.timers.exerciseTimer.isRunning)
            } else {
              console.log('Exercise is done')
            } */
      },

      fastForwardRewindBtnClick(goToExerciseIndex) {
        // Calculate values to previous or next exercise. Simulate the timer in for-loop, set values original-timer

        that.$timer.stop('exerciseTimer')

        // Make copy of original exercise-array
        let exerciseArrayCopy = this.exerciseArray
        // Count total seconds to selected exercise
        let secondsToSelectedExersice = this.exerciseArray
          .slice(0, goToExerciseIndex)
          .reduce(
            (previousValue, currentValue) =>
              previousValue + currentValue.seconds,
            0
          )
        // Sum up totalseconds routine/workout
        let totalCounterCopy = this.exerciseArray.reduce(
          (previousValue, currentValue) => previousValue + currentValue.seconds,
          0
        )
        // Set initial seconds to first interval
        let counterInSecondsCopy = this.exerciseArray[0].seconds
        // Set intial current-exercise index
        let currentExerciseCopy = 0

        // Simulate timer, make it iterate to selected exercise
        for (let i = 0; i < secondsToSelectedExersice; i++) {
          counterInSecondsCopy--
          totalCounterCopy--

          if (counterInSecondsCopy == 0 && totalCounterCopy != 0) {
            currentExerciseCopy++
            counterInSecondsCopy =
              exerciseArrayCopy[currentExerciseCopy].seconds
          }
        }
        // Set simulted timer-values to orignal-timer-values
        this.counterInSeconds = counterInSecondsCopy
        this.totalCounter = totalCounterCopy
        this.currentExercise = currentExerciseCopy

        // Scroll to selected exercise-dot
        this.scrollToElement(this.currentExercise)

        /* this.$timer.start('exerciseTimer') */
      },

      initData(id) {
        this.$timer.stop('exerciseTimer')

        // Check if routine is temporary(edited but not saved)
        if (id == 'temp') {
          // If routine is temporary
          this.getTempExersices()
        } else {
          // Check if routine is original
          if (
            this.$store.state.routineList[
              this.$store.state.routineList.findIndex(
                (element) => element.id == this.routeRoutineId
              )
            ].exercisesEdited.edited == false
          ) {
            // If routine is original
            this.getExerciseArrayIds()
            this.getExersices()
          } else {
            // If routine is edited
            this.getEditedExersices()
          }
        }
        // Execute in all cases (temp/original/edited)
        this.setTotalCounter()
        this.setFirstCounterInterval()
        this.currentExercise = 0
        this.circleTimerInSeconds = this.exerciseArray[0].seconds
      },

      getExerciseArrayIds() {
        this.exerciseArrayIds = this.$store.state.routineList
          .filter((el) => el.id == this.routeRoutineId)
          .map((ele) => ele.exercises)
          .flat()
      },

      getExersices() {
        // Necessary variables/decalarations for constructing exerciseArray
        this.exerciseArray = []
        let prepareOrRecovery = 0

        // Create exercisearray, adding prepare/recovery-blocks on suitable indexes
        for (let i = 0; i < this.routeValueCycles; i++) {
          this.exerciseArrayIds.forEach((id, index) => {
            this.exerciseArray.push(this.$store.state.exerciseList[id])
            if (index == this.exerciseArrayIds.length - 1) {
              /* console.log('lastindex') */
              this.exerciseArray.splice(
                i == 0 ? 0 : (this.exerciseArrayIds.length + 1) * i,
                0,
                this.$store.getters.getExerciseById(prepareOrRecovery)
                // { id: 0, blockName: 'Prepare', seconds: 5, resting: false, color: 'yellow' }
              )
              // Change from prepare to recovery block after first iteration
              if (prepareOrRecovery === 0) {
                prepareOrRecovery = 2
              }
            }
          })
        }
        // console.log(this.exerciseArrayIds)
      },

      getEditedExersices() {
        // Necessary variables/decalarations to construct exerciseArray
        this.exerciseArray = []
        let prepareOrRecovery = 0
        let editedList = JSON.parse(
          JSON.stringify(
            this.$store.state.routineList[
              this.$store.state.routineList.findIndex(
                (element) => element.id == this.routeRoutineId
              )
            ].exercisesEdited.exercises.map((el) => el)
          )
        )

        // Create exercisearray, adding prepare/recovery-blocks on suitable indexes
        for (let i = 0; i < this.routeValueCycles; i++) {
          editedList.forEach((el, index) => {
            this.exerciseArray.push(el)
            if (index == editedList.length - 1) {
              this.exerciseArray.splice(
                i == 0 ? 0 : (editedList.length + 1) * i,
                0,
                this.$store.getters.getExerciseById(prepareOrRecovery)
              )
              // Change from prepare to recovery block after first iteration
              if (prepareOrRecovery === 0) {
                prepareOrRecovery = 2
              }
            }
          })
        }
      },

      getTempExersices() {
        // Necessary variables/decalarations to construct exerciseArray
        this.exerciseArray = []
        let prepareOrRecovery = 0
        let tempList = JSON.parse(
          JSON.stringify(
            this.$store.state.tempRoutine.exercisesEdited.exercises.map(
              (el) => el
            )
          )
        )

        // Create exercisearray, adding prepare/recovery-blocks on suitable indexes
        for (let i = 0; i < this.routeValueCycles; i++) {
          tempList.forEach((el, index) => {
            this.exerciseArray.push(el)
            if (index == tempList.length - 1) {
              /* console.log('lastindex') */
              this.exerciseArray.splice(
                i == 0 ? 0 : (tempList.length + 1) * i,
                0,
                this.$store.getters.getExerciseById(prepareOrRecovery)
              )
              // Change from prepare to recovery block after first iteration
              if (prepareOrRecovery === 0) {
                prepareOrRecovery = 2
              }
            }
          })
        }
      },

      setTotalCounter() {
        this.totalCounter = this.exerciseArray.reduce(
          (previousValue, currentValue) => previousValue + currentValue.seconds,
          0
        )
      },
      setFirstCounterInterval() {
        this.counterInSeconds = this.exerciseArray[0].seconds
      },

      checkIfResting(blockName) {
        return (
          blockName == 'Rest' ||
          blockName == 'Recovery' ||
          blockName == 'Prepare'
        )
      },
      scrollToElement(elRefIndex) {
        /* console.log('allrefs: ', this.$refs.exercise) */
        this.$refs.exercise[elRefIndex].scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        })
      },
      screenSizeEvent(e) {
        /* console.log(e.currentTarget.innerWidth) */
        e.currentTarget.innerWidth > this.totalWidthCircles
          ? (this.centerOrNot = 'center-temp')
          : (this.centerOrNot = '')
      },
      initialScreenSizeEvent(width) {
        console.log(
          'screen: ' + width + ' ' + ' circles: ' + this.totalWidthCircles
        )
        width > this.totalWidthCircles
          ? (this.centerOrNot = 'center-temp')
          : (this.centerOrNot = '')
      },

      mouseDownHandler(e) {
        this.$refs.dots.style.cursor = 'grabbing'
        this.$refs.dots.style.userSelect = 'none'

        this.pos = {
          // The current scroll
          left: this.$refs.dots.scrollLeft,
          top: this.$refs.dots.scrollTop,
          // Get the current mouse position
          x: e.clientX,
          y: e.clientY
        }

        this.$refs.dots.addEventListener('mousemove', this.mouseMoveHandler)
        this.$refs.dots.addEventListener('mouseup', this.mouseUpHandler)
      },

      mouseMoveHandler(e) {
        // How far the mouse has been moved
        const dx = e.clientX - this.pos.x
        const dy = e.clientY - this.pos.y

        this.$refs.dots.scrollTop = this.pos.top - dy
        this.$refs.dots.scrollLeft = this.pos.left - dx
      },
      mouseUpHandler() {
        this.$refs.dots.removeEventListener('mousemove', this.mouseMoveHandler)
        this.$refs.dots.removeEventListener('mouseup', this.mouseUpHandler)

        this.$refs.dots.style.cursor = 'grab'
        this.$refs.dots.style.removeProperty('user-select')
      }
    },
    computed: {
      timerIsRunning: function () {
        return this.timers.exerciseTimer.isRunning
      },
      playOrPause: function () {
        return this.timerIsRunning
          ? '/assets/pause-button.svg'
          : '/assets/play-button.svg'
      },
      playOrPauseBack: function () {
        return this.timerIsRunning
          ? '/assets/back-btn-active.svg'
          : '/assets/back-btn-pause.svg'
      },
      playOrPauseForward: function () {
        return this.timerIsRunning
          ? '/assets/forward-btn-active.svg'
          : '/assets/forward-btn-pause.svg'
      },

      totalTimeLeft: function () {
        return new Date(this.totalCounter * 1000).toISOString().slice(14, 19)
      },
      routeRoutineId: function () {
        return Number(this.$route.params.id)
      },
      routeValueCycles: function () {
        if (
          this.$route.params.cycles == '' ||
          this.$route.params.cycles == null ||
          this.$route.params.cycles == typeof 'undefined'
        ) {
          return 1
        } else if (this.$route.params.cycles <= Number('0')) {
          return 1
        } else {
          return Number(this.$route.params.cycles)
        }
        /* return this.$route.params.cycles ? Number(this.$route.params.cycles) : 1 */
      },
      routineName: function () {
        return this.$route.params.blockName
          ? this.$route.params.blockName
          : 'No name'
      },
      isDisabled() {
        // Disable start/pause-btn
        return !this.doesRoutineExist
      }
    }
  }
</script>

<template>
  <div>
    <button id="back-btn" @click="$router.push('/')" />
    <div v-if="exerciseArray && doesRoutineExist">
      <div class="center-temp">
        <h1>{{ routineName }}</h1>
        <div class="in-row">
          <span>Total time left:</span>
          <h3>{{ totalTimeLeft + ' ' }}</h3>
        </div>

        <CircleTimer
          :timer-is-running="timerIsRunning"
          :count-down-interval="circleTimerInSeconds"
          :count-down-sec="counterInSeconds"
        />

        <p>
          {{ this.exerciseArray[this.currentExercise].blockName }}
          {{ this.exerciseArray[this.currentExercise].seconds + ' s' }}
        </p>

        <span class="next-routine">{{
          checkIfResting(this.exerciseArray[this.currentExercise].blockName)
            ? 'Next ' +
              this.exerciseArray[this.currentExercise + 1].blockName +
              ' ' +
              this.exerciseArray[this.currentExercise + 1].seconds +
              ' s'
            : '.'
        }}</span>
      </div>

      <div :class="centerOrNot">
        <div ref="dots" class="dot-container" @mousedown="mouseDownHandler">
          <span
            class="circle"
            :key="exercise.id"
            v-for="(exercise, index) in exerciseArray"
            ref="exercise"
          >
            <ExerciseCircle
              :timer-is-running="timerIsRunning"
              :activeindex="currentExercise"
              :circleindex="index"
              :exercise="exercise"
            />
          </span>
        </div>
      </div>
      <div class="center-temp">
        <nav>
          <button @click="fastForwardRewindBtnClick(this.currentExercise - 1)">
            <img alt="back-btn" :src="playOrPauseBack" />
          </button>
          <button @click="playPauseBtnClick()" :disabled="isDisabled">
            <img alt="playOrPause" :src="playOrPause" />
          </button>
          <button @click="fastForwardRewindBtnClick(this.currentExercise + 1)">
            <img alt="forward-btn" :src="playOrPauseForward" />
          </button>
        </nav>
      </div>
    </div>
    <div v-else>Sorry, the exercise does not exist</div>

    <FinishedExerciseDialog
      :show="showDialog"
      :stay="dialogStayOnPage"
      :go="dialogBackToRoutines"
      title="Great job!"
      description="Go to Routines or stay?"
    />
  </div>
</template>

<style scoped>
  #back-btn {
    background-image: url('/assets/back-btn.svg');
    background-repeat: no-repeat;
    width: 38px;
    height: 38px;
    background-size: 24px;
    border: none;
    background-position: 40%;
    background-color: transparent;
  }
  nav {
    /* border: 1px solid white; */
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
  .center-temp {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  p,
  h1,
  h2,
  h3 {
    /*  border: 1px solid white; */
    line-height: 3rem;
    margin: 0;
  }
  p {
    font-size: 20px;
    font-weight: bold;
  }
  h1 {
    /* font-size: 30px; */
    font-size: 1.9rem;
  }
  .in-row {
    margin-top: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
  }
  button {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
  button:disabled,
  button[disabled] {
    background-color: #aeaeae35;
    color: #84848455;
  }
  .dot-container {
    /*  min-height: 200px; */
    position: relative;
    overflow: scroll;
    white-space: nowrap;
    display: flex;
    align-items: center;
  }
  .circle {
    pointer-events: none;
  }
  .circle:nth-child(2) {
    padding-left: 1rem;
  }
  .circle:last-child {
    padding-right: 1rem;
  }
  .next-routine {
    opacity: 0.7;
    font-size: 0.9rem;
  }
  /* Vue Transitions */
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }
  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
