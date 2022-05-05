import { createStore /*storeKey */ } from 'vuex'

const mutations = {},
  state = {
    routineList: [
      {
        id: 1,
        blockName: 'FULL BODY',
        seconds: 30,
        resting: true,
        color: 'blue',
        exercises: [3, 1, 4, 1, 5, 1, 6, 1, 7, 1, 8, 2]
      },
      {
        id: 3,
        blockName: 'UPPER BODY',
        seconds: 30,
        resting: true,
        color: 'green',
        exercises: [9, 1, 10, 1, 11, 1, 12, 1, 13, 1, 14, 2]
      },
      {
        id: 2,
        blockName: 'LOWER BODY',
        seconds: 30,
        resting: false,
        color: 'red',
        exercises: [15, 1, 16, 1, 17, 1, 18, 1, 19, 1, 20, 2]
      }
    ],
    exerciseList: {
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
        color: 'red'
      },
      // FULLBODY
      3: {
        id: 3,
        blockName: 'Push-Ups',
        seconds: 30,
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
        color: 'green'
      },
      7: {
        id: 7,
        blockName: 'Mountain Climbers',
        seconds: 30,
        resting: true,
        color: 'blue'
      },
      8: {
        id: 8,
        blockName: 'Plank',
        seconds: 30,
        resting: true,
        color: 'blue'
      },
      // UPPERBODY
      9: {
        id: 9,
        blockName: 'Push-Up Side Plank',
        seconds: 30,
        resting: true,
        color: 'blue'
      },
      10: {
        id: 10,
        blockName: 'Situps',
        seconds: 30,
        resting: true,
        color: 'blue'
      },
      11: {
        id: 11,
        blockName: 'Superman',
        seconds: 30,
        resting: true,
        color: 'blue'
      },
      12: {
        id: 12,
        blockName: 'Leg Raises',
        seconds: 30,
        resting: true,
        color: 'blue'
      },
      13: {
        id: 13,
        blockName: 'Elbow Lifts',
        seconds: 30,
        resting: true,
        color: 'blue'
      },
      14: {
        id: 14,
        blockName: 'Triceps Dips',
        seconds: 30,
        resting: true,
        color: 'blue'
      },
      // LOWERBODY
      15: {
        id: 15,
        blockName: 'Jumping Lunges',
        seconds: 30,
        resting: true,
        color: 'blue'
      },
      16: {
        id: 16,
        blockName: 'Side Squats',
        seconds: 30,
        resting: true,
        color: 'blue'
      },
      17: {
        id: 17,
        blockName: 'High Knees',
        seconds: 30,
        resting: true,
        color: 'blue'
      },
      18: {
        id: 18,
        blockName: 'Glute Bridge March',
        seconds: 30,
        resting: true,
        color: 'blue'
      },
      19: {
        id: 19,
        blockName: 'Toe Raises',
        seconds: 30,
        resting: true,
        color: 'blue'
      },
      20: {
        id: 20,
        blockName: 'Bulgarian Split Squats',
        seconds: 30,
        resting: true,
        color: 'blue'
      }
    }
  }

export default createStore({ mutations, state, strict: true })
