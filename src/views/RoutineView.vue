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
  <div class="container">
    <div class="content-container">
      <h3>(RouterPath: {{ getRoutePathName }})</h3>
      <div class="search-routine">
        <h3>ROUTINES</h3>
        <input
          id="serach-btn"
          type="text"
          v-model="input"
          placeholder="Search Routine"
        />
      </div>
      <table class="list-container" v-if="filteredList">
        <tr
          class="list-item"
          v-for="(routineId, index) in filteredList"
          :key="routineId.id"
        >
          <td>
            <p>{{ filteredList[index].blockName }}</p>
            <p>{{ filteredList[index].cycle }}</p>
            <p>
              {{
                this.$store.getters.calculateRoutineTimeByRoutineId(
                  routineId.id
                )
              }}
              Minutes
            </p>
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
            >
              Edit
            </button>
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
            >
              Start
            </button>
          </div>
        </tr>
      </table>
      <div id="create">
        <button class="create-btn" @click="$router.push('/edit')">+</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .container {
    display: flex;
    border: 1px solid white;
    justify-content: center;
  }
  .content-container {
    display: flex;
    flex-direction: column;
    flex-basis: 200px;
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
    max-width: 230px;
  }
  .list-container {
    /*  border: 1px solid black; */
    display: inline;
  }
  .list-item {
    border-radius: 8px;
    background: rgb(126, 133, 147);
    background: linear-gradient(
      17deg,
      rgba(126, 133, 147, 1) 0%,
      rgba(136, 147, 148, 1) 38%,
      rgba(160, 174, 180, 1) 63%,
      rgba(136, 147, 148, 1) 99%
    );
    width: 100%;
    /*     margin-left: auto;
    margin-right: auto; */
    margin-bottom: 1em;
    display: flex;
    /* align-items: center; */
    text-align: center;
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
    padding: 0.4em;
  }

  #edit-btn {
    background-color: lightgrey;
    border-radius: 10%;
    height: 30px;
  }

  #start-btn {
    background-color: grey;
    border-radius: 50%;
    height: 38px;
  }

  .create-btn {
    background-color: green;
    color: white;
    border-radius: 50%;
    height: 38px;
    width: 38px;
  }

  #create {
    display: flex;
    justify-content: right;
    margin-right: 3%;
    margin-bottom: 3%;
  }

  td {
    margin: 0.4em;
  }

  p {
    font-size: 17px;
  }
</style>
