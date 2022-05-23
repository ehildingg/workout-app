import { createStore /*storeKey */ } from 'vuex'

const mutations = {
    updateEditedRoutine(state, { exArr, updateId }) {
      if (updateId == 0) {
        // If id = 0, add new routine to routineList

        // Get routine-id-index 0 and put copy in end of routineList
        state.routineList.push(state.routineList[0])
        // Update created routine copy
        state.routineList[state.routineList.length - 1] = {
          ...state.routineList.at(-1),
          /* blockName: name, */
          id: state.routineList.length - 1,
          show: true,
          exercisesEdited: {
            edited: true,
            exercises: exArr
          }
        }
        //
        state.savedNewId = state.routineList.length - 1
      } else {
        // Other id:s(), just update
        state.routineList[
          state.routineList.findIndex((element) => element.id == updateId)
        ].exercisesEdited = { edited: true, exercises: exArr }
      }

      /* console.log('changed state store', state.routineList) */
    },

    updateTempRoutine(state, { exArr }) {
      state.tempRoutine = {
        ...state.tempRoutine,
        id: 'temp',
        show: true,
        blockName: 'changed temp',
        exercisesEdited: {
          edited: true,
          exercises: exArr
        }
      }
    },

    clearSavedId(state) {
      /* console.log('clearing temp', state.savedNewId) */
      state.savedNewId = null
    }
  },
  state = {
    savedNewId: null,

    tempRoutine: {
      id: 'temp',
      show: true,
      blockName: 'Temp',
      seconds: 30,
      resting: true,
      color: 'blue',
      exercises: [21, 1],
      exercisesEdited: {
        edited: false,
        exercises: []
      }
    },

    routineList: [
      {
        id: 0,
        show: false,
        blockName: '...',
        seconds: 30,
        resting: true,
        color: 'blue',
        exercises: [21, 1, 21, 1, 21],
        exercisesEdited: {
          edited: false,
          exercises: []
        }
      },
      {
        id: 1,
        show: true,
        blockName: 'FULL BODY',
        seconds: 30,
        resting: true,
        color: 'blue',
        exercises: [3, 1, 4, 1, 5, 1, 6, 1, 7, 1, 8],
        exercisesEdited: {
          edited: false,
          exercises: [
            {
              id: 1,
              blockName: 'Rest',
              seconds: 3,
              resting: false,
              color: 'red'
            },
            {
              id: 4,
              blockName: 'Squats',
              seconds: 3,
              resting: true,
              color: 'green'
            },
            {
              id: 1,
              blockName: 'Rest',
              seconds: 3,
              resting: false,
              color: 'red'
            },
            {
              id: 4,
              blockName: 'Squats',
              seconds: 3,
              resting: true,
              color: 'green'
            }
            /*             { id: 3, seconds: 4 },
            { id: 1, seconds: 4 },
            { id: 4, seconds: 4 },
            { id: 1, seconds: 4 },
            { id: 5, seconds: 4 },
            { id: 1, seconds: 4 },
            { id: 6, seconds: 4 },
            { id: 1, seconds: 4 },
            { id: 7, seconds: 4 },
            { id: 1, seconds: 4 },
            { id: 8, seconds: 4 } */
          ]
        }
      },
      {
        id: 2,
        show: true,
        blockName: 'UPPER BODY',
        seconds: 30,
        resting: true,
        color: 'green',
        exercises: [9, 1, 10, 1, 11, 1, 12, 1, 13, 1, 14],
        exercisesEdited: {
          edited: false,
          exercises: []
        }
      },
      {
        id: 3,
        show: true,
        blockName: 'LOWER BODY',
        seconds: 30,
        resting: false,
        color: 'red',
        exercises: [15, 1, 16, 1, 17, 1, 18, 1, 19, 1, 20],
        exercisesEdited: {
          edited: false,
          exercises: []
        }
      }
    ],

    exerciseList: {
      // Har kortat ner sekundrarna till 3 sek på varje exercise
      // Har lagt den ursprungliga exerciseList med längre sekundintervall borkommenterat längre ner i koden

      // REST
      0: {
        id: 0,
        blockName: 'Prepare',
        seconds: 5,
        resting: false,
        color: 'red'
      },
      1: {
        id: 1,
        blockName: 'Rest',
        seconds: 10,
        resting: false,
        color: 'red'
      },
      2: {
        id: 2,
        blockName: 'Recovery',
        seconds: 20,
        resting: false,
        color: 'darkred'
      },
      // FULLBODY
      3: {
        id: 3,
        blockName: 'Push-Ups',
        seconds: 15,
        resting: true,
        color: 'blue'
      },
      4: {
        id: 4,
        blockName: 'Squats',
        seconds: 22,
        resting: true,
        color: 'green'
      },
      5: {
        id: 5,
        blockName: 'Burpees',
        seconds: 5,
        resting: true,
        color: 'blue'
      },
      6: {
        id: 6,
        blockName: 'Bicycle Crunches',
        seconds: 3,
        resting: true,
        color: 'skyblue'
      },
      7: {
        id: 7,
        blockName: 'Mountain Climbers',
        seconds: 3,
        resting: true,
        color: 'steelblue'
      },
      8: {
        id: 8,
        blockName: 'Plank',
        seconds: 3,
        resting: true,
        color: 'teal'
      },
      // UPPERBODY
      9: {
        id: 9,
        blockName: 'Push-Up Side Plank',
        seconds: 3,
        resting: true,
        color: 'violet'
      },
      10: {
        id: 10,
        blockName: 'Situps',
        seconds: 3,
        resting: true,
        color: 'turquoise'
      },
      11: {
        id: 11,
        blockName: 'Superman',
        seconds: 3,
        resting: true,
        color: 'coral'
      },
      12: {
        id: 12,
        blockName: 'Leg Raises',
        seconds: 3,
        resting: true,
        color: 'pink'
      },
      13: {
        id: 13,
        blockName: 'Elbow Lifts',
        seconds: 3,
        resting: true,
        color: 'darkorange'
      },
      14: {
        id: 14,
        blockName: 'Triceps Dips',
        seconds: 3,
        resting: true,
        color: 'forestgreen'
      },
      // LOWERBODY
      15: {
        id: 15,
        blockName: 'Jumping Lunges',
        seconds: 3,
        resting: true,
        color: 'fuchsia'
      },
      16: {
        id: 16,
        blockName: 'Side Squats',
        seconds: 3,
        resting: true,
        color: 'gold'
      },
      17: {
        id: 17,
        blockName: 'High Knees',
        seconds: 3,
        resting: true,
        color: 'indigo'
      },
      18: {
        id: 18,
        blockName: 'Glute Bridge March',
        seconds: 3,
        resting: true,
        color: 'lime'
      },
      19: {
        id: 19,
        blockName: 'Toe Raises',
        seconds: 3,
        resting: true,
        color: 'maroon'
      },
      20: {
        id: 20,
        blockName: 'Bulgarian Split Squats',
        seconds: 4,
        resting: true,
        color: 'orchid'
      },
      21: {
        id: 21,
        blockName: '...',
        seconds: 0,
        resting: false,
        color: 'red'
      }
    }
  },
  getters = {
    checkIfRoutineExists: (state) => (id) => {
      return state.routineList.some((routine) => routine.id == id)
    },

    checkIExerciseExists: (state) => (id) => {
      let exists = false
      for (const value of Object.values(state.exerciseList)) {
        if (value.id == id) {
          exists = true
          break
        }
      }
      return exists
    },

    getRoutineById: (state, getters) => (id) => {
      let routine = null

      if (getters.checkIfRoutineExists(id)) {
        routine = state.routineList.find((element) => element.id == id)
      } else {
        console.log('Routine ID does not exist!')
      }

      return routine
    },

    getExerciseById: (state, getters) => (id) => {
      let exercise = null

      if (getters.checkIExerciseExists(id)) {
        exercise = state.exerciseList[id]
      } else {
        console.log('Routine ID does not exist!')
      }

      return exercise
    },

    getListOfExercisesByRoutineId: (state, getters) => (id) => {
      let exercisesList = []

      if (getters.checkIfRoutineExists(id)) {
        let routine = state.routineList.find((element) => element.id === id)
        routine.exercises.forEach((exerciseId) => {
          exercisesList.push(state.exerciseList[exerciseId])
        })
      } else {
        console.log('Routine ID does not exist!')
      }

      return exercisesList
    },

    calculateRoutineTimeByRoutineId: (state, getters) => (id) => {
      let timeInSeconds = 0
      let timeInMinutes = 0

      if (getters.checkIfRoutineExists(id)) {
        let listOfExercises = getters.getListOfExercisesByRoutineId(id)
        listOfExercises.forEach((exercise) => {
          timeInSeconds += exercise.seconds
        })

        timeInMinutes = Math.round(timeInSeconds / 60)
      } else {
        console.log('Routine ID does not exist!')
      }

      return timeInMinutes
    }
  }

export default createStore({ mutations, state, getters, strict: true })

// Lista med längre sekund-intervall
/* exerciseList: {
  // REST
  1: {
    id: 1,
    blockName: 'Rest',
    seconds: 15,
    resting: false,
    color: 'red'
  },
  2: {
    id: 2,
    blockName: 'Recovery',
    seconds: 45,
    resting: false,
    color: 'darkred'
  },
  // FULLBODY
  3: {
    id: 3,
    blockName: 'Push-Ups',
    seconds: 3,
    resting: true,
    color: 'blue'
  },
  4: {
    id: 4,
    blockName: 'Squats',
    seconds: 30,
    resting: true,
    color: 'green'
  },
  5: {
    id: 5,
    blockName: 'Burpees',
    seconds: 30,
    resting: true,
    color: 'blue'
  },
  6: {
    id: 6,
    blockName: 'Bicycle Crunches',
    seconds: 30,
    resting: true,
    color: 'skyblue'
  },
  7: {
    id: 7,
    blockName: 'Mountain Climbers',
    seconds: 30,
    resting: true,
    color: 'steelblue'
  },
  8: {
    id: 8,
    blockName: 'Plank',
    seconds: 30,
    resting: true,
    color: 'teal'
  },
  // UPPERBODY
  9: {
    id: 9,
    blockName: 'Push-Up Side Plank',
    seconds: 30,
    resting: true,
    color: 'violet'
  },
  10: {
    id: 10,
    blockName: 'Situps',
    seconds: 30,
    resting: true,
    color: 'turquoise'
  },
  11: {
    id: 11,
    blockName: 'Superman',
    seconds: 30,
    resting: true,
    color: 'coral'
  },
  12: {
    id: 12,
    blockName: 'Leg Raises',
    seconds: 30,
    resting: true,
    color: 'pink'
  },
  13: {
    id: 13,
    blockName: 'Elbow Lifts',
    seconds: 30,
    resting: true,
    color: 'darkorange'
  },
  14: {
    id: 14,
    blockName: 'Triceps Dips',
    seconds: 30,
    resting: true,
    color: 'forestgreen'
  },
  // LOWERBODY
  15: {
    id: 15,
    blockName: 'Jumping Lunges',
    seconds: 30,
    resting: true,
    color: 'fuchsia'
  },
  16: {
    id: 16,
    blockName: 'Side Squats',
    seconds: 30,
    resting: true,
    color: 'gold'
  },
  17: {
    id: 17,
    blockName: 'High Knees',
    seconds: 30,
    resting: true,
    color: 'indigo'
  },
  18: {
    id: 18,
    blockName: 'Glute Bridge March',
    seconds: 30,
    resting: true,
    color: 'lime'
  },
  19: {
    id: 19,
    blockName: 'Toe Raises',
    seconds: 30,
    resting: true,
    color: 'maroon'
  },
  20: {
    id: 20,
    blockName: 'Bulgarian Split Squats',
    seconds: 30,
    resting: true,
    color: 'orchid'
  }
}
}, */
