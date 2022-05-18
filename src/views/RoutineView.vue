<script>
  export default {
    components: {},
    created() {
      // Make copy of routineList(must use JSONParse, otherwise errors when changing it )
      let routineListCopy = JSON.parse(
        JSON.stringify(this.$store.state.routineList)
      )
      // Add cycles to routineListCopy
      this.routineListWithAddedCycles = routineListCopy.map((el) =>
        Object.assign(el, { cycles: 2 })
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
        routineListWithAddedCycles: null
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
                ('' + routineId[key]).toLowerCase().includes(this.input)
              )
            : true
        )
      }
    },

    methods: {
      myChangeFunction(e, id) {
        /* console.log(id)

        console.log(e.target.value) */
        let newCycleValue = e.target.value
        console.log('newCyclevalue: ', newCycleValue)
        console.log('typeof cycle', typeof newCycleValue)
        if (
          newCycleValue == '0' ||
          newCycleValue == '' ||
          newCycleValue === null ||
          newCycleValue == typeof 'undefined'
        ) {
          console.log('refs', this.$refs[id + 'editbtn'])
          this.$refs[id + 'editbtn'][0].disabled = true
        } else {
          this.$refs[id + 'editbtn'][0].disabled = false
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
      },
      isDisabled(id) {
        return !this.doesRoutineExist
      }
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
      <h3>(RouterPath: {{ getRoutePathName }})</h3>
      <div class="search-routine">
        <input
          id="search-btn"
          type="text"
          v-model="input"
          placeholder="  Search Routine"
        />
      </div>
      <table class="list-container" v-if="filteredList">
        <tr
          class="list-item"
          v-for="(routineId, index) in filteredList"
          :key="routineId.id"
        >
          <td>
            <h2 class="info">{{ filteredList[index].blockName }}</h2>
            <p>{{ filteredList[index].cycle }}</p>
            <h2 class="info">
              {{
                this.$store.getters.calculateRoutineTimeByRoutineId(
                  routineId.id
                )
              }}
              Minutes
            </h2>
          </td>
          <!-- :value="routineId.cycles" -->
          <div class="button-input-row">
            <div class="input-cycles-container">
              <span class="cycle-label">Cycles</span>
              <input
                class="input-cycles"
                min="1"
                max="100"
                type="number"
                :value="routineId.cycles"
                :v-model="routineId.cycles"
                @input="myChangeFunction($event, routineId.id)"
              />
            </div>
            <button
              class="routine-btns"
              id="edit-btn"
              @click="editRoutineRouterLink(routineId.id, routineId.blockName)"
            />

            <!--  :disabled="isDisabled" -->
            <button
              class="routine-btns"
              id="start-btn"
              :ref="routineId.id + 'editbtn'"
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
        <button class="create-btn" @click="$router.push('/edit')" />
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  }
  .container {
    display: flex;
    border: 1px solid white;
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
  .input-cycles-container {
    width: 2rem;
    position: relative;
  }
  .input-cycles {
    width: 2rem;
  }
  .cycle-label {
    right: 10px;
    position: absolute;
    top: -16px;
    left: 0px;
    font-size: 0.8rem;
  }
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
  }

  #start-btn {
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
