<script>
  export default {
    components: {},
    created() {
      this.$store.commit('addDuration')
      // Make copy of routineList(must use JSONParse, otherwise errors when changing it )
      let routineListCopy = JSON.parse(
        JSON.stringify(
          this.$store.state.routineList.filter((el) => el.show == true)
        )
      )
      // Add cycles to routineListCopy
      this.routineListWithAddedCycles = routineListCopy.map((el) =>
        Object.assign(el, { cycles: 1 })
      )
    },
    beforeUnmount() {
      /* this.routineListWithAddedCycles.forEach((element) => {
        if (
          element.cycles <= 0 ||
          element.cycles == typeof 'undefined' ||
          element.cycles == '' ||
          element.cycles === null ||
          element.cycles == typeof 'undefined'
        ) {
          element.cycles = 1
        }
      }) */
    },
    data() {
      return {
        input: '',
        /* routineListWithAddedCycles: this.$store.state.routineList */
        routineListWithAddedCycles: null,
        durationValue: 60
      }
    },
    watch: {
      durationValue() {
        // this.$forceUpdate()
      }
    },

    computed: {
      // Get exercisesArray from vuex
      routineList: function () {
        return this.$store.state.routineList
      },
      exerciseList: function () {
        return this.$store.state.exercise
      },
      // Get data from router
      getRoutePathName: function () {
        return this.$route.fullPath
      },
      filteredList: function () {
        return this.routineListWithAddedCycles.filter((routineId) =>
          this.routineListWithAddedCycles.length
            ? Object.keys(this.routineListWithAddedCycles[0]).some((key) =>
                ('' + routineId[key])
                  .split(' ')
                  .join('')
                  .toLowerCase()
                  .includes(this.input.split(' ').join('').toLowerCase())
              )
            : true
        )
      },
      filterListWithDuration: function () {
        this.$store.commit('addDuration')
        return this.filteredList.filter(
          (routine) => routine.duration * routine.cycles <= this.durationValue
        )
      }
    },
    /*             if (element.cycles <= 1) {
              element.cycles = 1
            } else if (element.cycles >= 10) {
              element.cycles = 10
            } */
    methods: {
      cycleClickChange(eventClick, id) {
        this.routineListWithAddedCycles.forEach((element) => {
          if (element.id == id) {
            if (eventClick == 'down') {
              if (element.cycles <= 1) {
                element.cycles = 1
              } else {
                element.cycles -= 1
              }
            } else if (eventClick == 'up') {
              if (element.cycles >= 10) {
                element.cycles = 10
              } else {
                element.cycles += 1
              }
            }
          }
        })
      },
      changeCycles(e, id) {
        let newCycleValue = e.target.value
        /* console.log(id)
        console.log(e.target.value) */
        /*         console.log('newCyclevalue: ', newCycleValue)
        console.log('typeof cycle', typeof newCycleValue) */

        if (
          newCycleValue == '0' ||
          newCycleValue == '' ||
          newCycleValue === null ||
          newCycleValue == typeof 'undefined'
        ) {
          /* console.log('refs', this.$refs[id + 'playbtn']) */
          this.$refs[id + 'playbtn'][0].disabled = true
        } else {
          this.$refs[id + 'playbtn'][0].disabled = false
          this.routineListWithAddedCycles.forEach((element) => {
            if (element.id == id) {
              element.cycles = Number(newCycleValue)
            }
          })
        }

        /* this.routineListWithAddedCycles = this.routineListWithAddedCycles.map((el) =>
          el.id == id ? (el.cycles = Number(e.target.value)) : el
        ) */
      },
      newRoutineRouterLink(selectedId, blockName) {
        this.$router.push({
          name: 'create',
          params: {
            id: selectedId,
            blockName: blockName
          }
        })
      },
      editRoutineRouterLink(selectedId, blockName) {
        this.$router.push({
          name: 'details',
          params: {
            id: selectedId,
            blockName: blockName
          }
        })
      },
      startRoutineRouterLink(selectedId, blockName, cycles) {
        this.$router.push({
          name: 'exercise',
          params: {
            id: selectedId,
            blockName: blockName,
            cycles: cycles
          }
        })
      }
      /*       isDisabled(id) {
        return !this.doesRoutineExist
      } */
    }
  }
</script>

<template>
  <div class="header">
    <button id="timata-icon" @click="$router.push('/')" />
    <button id="hamburger-btn" />
  </div>
  <div class="container">
    <div class="content-container">
      <!--       <h3>(RouterPath: {{ getRoutePathName }})</h3> -->
      <div class="search-routine">
        <input
          id="search-btn"
          type="text"
          v-model="input"
          placeholder="  Search Routine"
        />
        <div class="search-duration">
          <input
            type="range"
            min="5"
            max="60"
            name="Duration"
            id="Duration"
            step="5"
            @click="testMethod"
            v-model="durationValue"
          />
          <label id="duration-label" for="Duration">{{ durationValue }}</label>
        </div>
      </div>
      <table class="list-container" v-if="filterListWithDuration">
        <tr
          class="list-item"
          v-for="(routineId, index) in filterListWithDuration"
          :key="routineId.id"
        >
          <td>
            <h2 class="info">{{ filterListWithDuration[index].blockName }}</h2>
            <p>{{ filterListWithDuration[index].cycle }}</p>
            <h2 class="info">
              {{
                this.$store.getters.calculateRoutineTimeByRoutineId(
                  routineId.id
                ) * routineId.cycles
              }}
              Minutes
            </h2>
          </td>

          <div class="button-input-row">
            <div class="input-cycles-container">
              <span
                @click="cycleClickChange('down', routineId.id)"
                class="down-a"
              />

              <input
                class="input-cycles"
                min="1"
                max="10"
                type="number"
                :value="routineId.cycles"
                :v-model="routineId.cycles"
                @input="changeCycles($event, routineId.id)"
              />
              <span
                @click="cycleClickChange('up', routineId.id)"
                class="up-a"
              />
            </div>
            <button
              class="routine-btns"
              id="edit-btn"
              @click="editRoutineRouterLink(routineId.id, routineId.blockName)"
            />
            <!--  id="start-btn" -->
            <!--  :disabled="isDisabled" -->
            <button
              class="routine-btns start-btn"
              :ref="routineId.id + 'playbtn'"
              @click="
                startRoutineRouterLink(
                  routineId.id,
                  routineId.blockName,
                  routineId.cycles
                )
              "
            />
          </div>
        </tr>
      </table>
      <div id="create">
        <button class="create-btn" @click="newRoutineRouterLink(0, 'new')" />
      </div>
    </div>
  </div>
</template>

<style scoped>
  #duration-label {
    color: white;
    background: linear-gradient(17deg, #2d2b2b, #8d8d8d);
    border: 1px solid black;
    border-radius: 10%;
    padding: 5px;
    text-align: center;
    font-family: Quicksand;
    width: 20px;
    opacity: 0.8;
  }
  input[type='range'] {
    background-color: transparent;
    width: 250px;
    border-radius: 5px;
    margin: 0 auto;
  }

  input[type='range']::-moz-range-thumb {
    -webkit-appearance: none;
    background-color: #5c5250;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid rgb(207, 202, 202);
    cursor: pointer;
  }

  input[type='range']::-moz-range-track {
    background: linear-gradient(17deg, #423a3a, #8d8d8d);
    height: 5px;
    border-radius: 10px;
  }

  .search-duration {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 10px 5px 0px 0px;
  }
  .header {
    margin-right: 30px;
    margin-left: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  #timata-icon {
    height: 63px;
    width: 64px;
    background-image: url('/assets/timata-icon.svg');
    background-repeat: no-repeat;
    border: none;
    background-color: transparent;
    background-position: 50%;
    background-size: 50px;
    padding: 2px;
    cursor: pointer;
  }

  #hamburger-btn {
    height: 38px;
    width: 44px;
    background-image: url('/assets/hamburger-icon.svg');
    background-repeat: no-repeat;
    border: none;
    background-color: transparent;
    background-size: 35px;
    background-position: 50%;
    padding: 2px;
    cursor: pointer;
  }
  .container {
    display: flex;
    /* border: 1px solid white; */
    justify-content: center;
  }
  .content-container {
    display: flex;
    flex-direction: column;
    flex-basis: 311px;
  }

  .info {
    text-align: left;
    text-indent: 0.7em;
    font-size: 30px;
    font-weight: 400;
    color: #343434;
  }

  /*   Input cycles start */
  .input-cycles-container {
    /* width: 2rem; */

    margin: 0;
    padding: 0;
    display: flex;
    /* border: 1px solid white; */
    position: relative;
  }
  .input-cycles {
    width: 1.6rem;
  }
  .cycle-label {
    right: 10px;
    position: absolute;
    top: -16px;
    left: 0px;
    font-size: 0.8rem;
  }
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }

  input[type='number'] {
    width: 1.6rem;
    height: 1.6rem;
    background: transparent;
    background-image: url('/assets/cyc.svg');
    background-position: center;
    background-repeat: no-repeat;
    text-align: center;
    color: #f6f5f3;
    background-size: cover;
    border: none;
  }

  .input-cycles-container input:focus {
    outline: 0;
  }

  .down-a {
    width: 10px;
    height: 10px;
    background-image: url('/assets/down-a.svg');
    background-position: center;
    background-repeat: no-repeat;
    /*   border: 1px solid white; */
    align-self: flex-start;
    cursor: pointer;
  }
  .up-a {
    width: 10px;
    height: 10px;
    background-image: url('/assets/up-a.svg');
    background-position: center;
    background-repeat: no-repeat;
    /* border: 1px solid white; */
    align-self: flex-end;
    cursor: pointer;
  }
  /*   Input cycles end */
  .search-routine {
    /*     margin-left: auto;
      margin-right: auto; */
    display: flex;
    flex-direction: column;
    margin-bottom: 36px;
    width: 304px;
  }

  #search-btn {
    border-radius: 15px;
    height: 34px;
    background-image: url('/assets/glass-icon.svg');
    background-repeat: no-repeat;
    background-color: #a6a6a6;
    background-position-x: 95%;
    background-position-y: 50%;
    background-size: 20px;
    padding: 2px;
  }

  ::placeholder {
    color: #343434;
    font-size: 15px;
  }
  .list-container {
    /*  border: 1px solid black; */
    display: inline;
  }
  .list-item {
    border-radius: 10px;
    background: rgb(126, 133, 147);
    width: 100%;
    height: 215px;
    /*     margin-left: auto;
      margin-right: auto; */
    margin-bottom: 48px;
    display: flex;
    /* align-items: center; */

    flex-direction: column;
  }
  .button-input-row {
    margin-bottom: 0.4em;
    /*  border: 1px solid black; */
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .routine-btns {
    width: 38px;
    /*     margin-left: 32px;
      margin-right: 32px; */
    border: none;
  }

  #edit-btn {
    background-color: transparent;
    height: 25px;
    width: 60px;
    background-image: url('/assets/edit-icon.svg'), url('/assets/edit-text.svg');
    background-position: left top, right center;
    background-repeat: no-repeat;
    border: none;
    background-size: 25px;
    cursor: pointer;
  }

  .start-btn {
    background-color: transparent;
    height: 60px;
    width: 60px;
    background-image: url('/assets/start-icon.svg'),
      url('/assets/start-background.svg');
    background-position: center, center;
    background-repeat: no-repeat;
    border: none;
    background-size: 20px, 50px;
    background-position-x: 52%, center;
    background-position-y: 55%, center;
    cursor: pointer;
  }
  .start-btn:disabled {
    opacity: 0.15;
  }

  .create-btn {
    background-image: url('/assets/create-btn.svg');
    background-repeat: no-repeat;
    background-color: transparent;
    height: 65px;
    width: 65px;
    background-size: 63px;
    border: none;
    background-position: 55%;
    cursor: pointer;
  }

  #create {
    position: fixed;
    right: 10px;
    bottom: 10px;
  }

  tr:nth-child(1n) {
    background: linear-gradient(17deg, #0467ba, #4be8f2);
  }
  tr:nth-child(2n) {
    background: linear-gradient(17deg, #f85642, #ff767e);
  }

  tr:nth-child(3n) {
    background: linear-gradient(17deg, #04b76b, #6bff9d);
  }
</style>
