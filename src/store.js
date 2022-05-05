import { createStore /*storeKey */ } from 'vuex'

const mutations = {
    increment(state) {
      state.counter += 1
    }
  },
  state = {
    routineList: [
      {
        id: 1,
        blockName: 'Full body',
        durationInSeconds: 5,
        resting: true,
        color: 'blue',
        exercises: [3, 1, 4, 1, 5, 1, 6, 1, 7, 1, 8, 2]
      },
      {
        id: 3,
        blockName: 'Upper body',
        durationInSeconds: 5,
        resting: true,
        color: 'green',
        exercises: [9, 1, 10, 1, 11, 1, 12, 1, 13, 1, 14, 2]
      },
      {
        id: 2,
        blockName: 'Lower Body',
        durationInSeconds: 5,
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
        durationInSeconds: 15,
        resting: false,
        color: 'red'
      },
      2: {
        id: 2,
        blockName: 'Recovery',
        durationInSeconds: 45,
        resting: false,
        color: 'red'
      },
      // FULLBODY
      3: {
        id: 3,
        blockName: 'Push-Ups',
        durationInSeconds: 30,
        resting: true,
        color: 'blue'
      },
      4: {
        id: 4,
        blockName: 'Squats',
        durationInSeconds: 30,
        resting: true,
        color: 'green'
      },
      5: {
        id: 5,
        blockName: 'Burpees',
        durationInSeconds: 30,
        resting: true,
        color: 'blue'
      },
      6: {
        id: 6,
        blockName: 'Bicycle Crunches',
        durationInSeconds: 30,
        resting: true,
        color: 'green'
      },
      7: {
        id: 7,
        blockName: 'Mountain Climbers',
        durationInSeconds: 30,
        resting: true,
        color: 'blue'
      },
      8: {
        id: 8,
        blockName: 'Plank',
        durationInSeconds: 30,
        resting: true,
        color: 'blue'
      },
      // UPPERBODY
      9: {
        id: 9,
        blockName: 'Push-Up Side Plank',
        durationInSeconds: 30,
        resting: true,
        color: 'blue'
      },
      10: {
        id: 10,
        blockName: 'Situps',
        durationInSeconds: 30,
        resting: true,
        color: 'blue'
      },
      11: {
        id: 11,
        blockName: 'Superman',
        durationInSeconds: 30,
        resting: true,
        color: 'blue'
      },
      12: {
        id: 12,
        blockName: 'Leg Raises',
        durationInSeconds: 30,
        resting: true,
        color: 'blue'
      },
      13: {
        id: 13,
        blockName: 'Elbow Lifts',
        durationInSeconds: 30,
        resting: true,
        color: 'blue'
      },
      14: {
        id: 14,
        blockName: 'Triceps Dips',
        durationInSeconds: 30,
        resting: true,
        color: 'blue'
      },
      // LOWERBODY
      15: {
        id: 15,
        blockName: 'Jumping Lunges',
        durationInSeconds: 30,
        resting: true,
        color: 'blue'
      },
      16: {
        id: 16,
        blockName: 'Side Squats',
        durationInSeconds: 30,
        resting: true,
        color: 'blue'
      },
      17: {
        id: 17,
        blockName: 'High Knees',
        durationInSeconds: 30,
        resting: true,
        color: 'blue'
      },
      18: {
        id: 18,
        blockName: 'Glute Bridge March',
        durationInSeconds: 30,
        resting: true,
        color: 'blue'
      },
      19: {
        id: 19,
        blockName: 'Toe Raises',
        durationInSeconds: 30,
        resting: true,
        color: 'blue'
      },
      20: {
        id: 20,
        blockName: 'Bulgarian Split Squats',
        durationInSeconds: 30,
        resting: true,
        color: 'blue'
      }
    }

    //   rest : { blockName: 'Rest', durationInSeconds: 15, resting: false, color: 'red' },
    // recovery : {
    //   blockName: 'Recovery',
    //   durationInSeconds: 45,
    //   resting: false,
    //   color: 'red'
    // },
    // fullBodyExercies : [
    //   { id: 1, blockName: 'Push-Ups', durationInSeconds: 30, resting: true, color: 'blue' },
    //   { id: 2, rest },
    //   { id: 3, blockName: 'Squats', durationInSeconds: 30, resting: true, color: 'green' },
    //   { id: 4, rest },
    //   { id: 5, blockName: 'Burpees', durationInSeconds: 30, resting: true, color: 'blue' },
    //   { id: 6, rest },
    //   {
    //     id: 7,
    //     blockName: 'Bicycle Crunches',
    //     durationInSeconds: 30,
    //     resting: true,
    //     color: 'green'
    //   },
    //   { id: 8, rest },
    //   {
    //     id: 9,
    //     blockName: 'Mountain Climbers',
    //     durationInSeconds: 30,
    //     resting: true,
    //     color: 'blue'
    //   },
    //   { id: 10, rest },
    //   { id: 11, blockName: 'Plank', durationInSeconds: 30, resting: true, color: 'green' },
    //   { id: 12, recovery }
    // ],
    // upperBodyExercises : [
    //   {
    //     id: 1,
    //     blockName: 'Push-Ups Side Plank',
    //     durationInSeconds: 30,
    //     resting: true,
    //     color: 'blue'
    //   },
    //   { id: 2, rest },
    //   { id: 3, blockName: 'Situps', durationInSeconds: 30, resting: true, color: 'green' },
    //   { id: 4, rest },
    //   { id: 5, blockName: 'Superman', durationInSeconds: 30, resting: true, color: 'blue' },
    //   { id: 6, rest },
    //   {
    //     id: 7,
    //     blockName: 'Leg Raises',
    //     durationInSeconds: 30,
    //     resting: true,
    //     color: 'green'
    //   },
    //   { id: 8, rest },
    //   {
    //     id: 9,
    //     blockName: 'Elbow Lifts',
    //     durationInSeconds: 30,
    //     resting: true,
    //     color: 'blue'
    //   },
    //   { id: 10, rest },
    //   {
    //     id: 11,
    //     blockName: 'Triceps Dips',
    //     durationInSeconds: 30,
    //     resting: true,
    //     color: 'green'
    //   },
    //   { id: 12, recovery }
    // ],
    // lowerBodyExercises : [
    //   {
    //     id: 1,
    //     blockName: 'Jumping Lunges',
    //     durationInSeconds: 30,
    //     resting: true,
    //     color: 'blue'
    //   },
    //   { id: 2, rest },
    //   {
    //     id: 3,
    //     blockName: 'Side Squats',
    //     durationInSeconds: 30,
    //     resting: true,
    //     color: 'green'
    //   },
    //   { id: 4, rest },
    //   {
    //     id: 5,
    //     blockName: 'High Knees',
    //     durationInSeconds: 30,
    //     resting: true,
    //     color: 'blue'
    //   },
    //   { id: 6, rest },
    //   {
    //     id: 7,
    //     blockName: 'Glute Bridge March',
    //     durationInSeconds: 30,
    //     resting: true,
    //     color: 'green'
    //   },
    //   { id: 8, rest },
    //   {
    //     id: 9,
    //     blockName: 'Toe Raises',
    //     durationInSeconds: 30,
    //     resting: true,
    //     color: 'blue'
    //   },
    //   { id: 10, rest },
    //   {
    //     id: 11,
    //     blockName: 'Bulgarian Split Squats',
    //     durationInSeconds: 30,
    //     resting: true,
    //     color: 'green'
    //   },
    //   { id: 12, recovery }
    // ],

    //   workoutList: [
    //     {
    //       id: 1,
    //       blockName: 'Full body',
    //       durationInSeconds: 5,
    //       resting: true,
    //       color: 'blue',
    //       exercises: fullBodyExercies
    //     },
    //     {
    //       id: 3,
    //       blockName: 'Upper body',
    //       durationInSeconds: 5,
    //       resting: true,
    //       color: 'green',
    //       exercises: upperBodyExercises
    //     },
    //     {
    //       id: 2,
    //       blockName: 'Lower Body',
    //       durationInSeconds: 5,
    //       resting: false,
    //       color: 'red',
    //       exercises: lowerBodyExercises
    //     }
    //   ]
  }

export default createStore({ mutations, state, strict: true })

/* import { createStore } from 'vuex'

const mutations = {
    increment(state) {
      state.counter += 1
    }
  },
  state = {
    counter: 0,

    settings: {
      default: {
        initialCoundown: 5,
        cycleCountdown: 45
      },
      customized: {
        initialCoundown: 5,
        cycleCountdown: 45
      }
    },
    // fullBodyExercies: [
    //   { id: 1, blockName: 'pullups', durationInSeconds: 6, resting: true, color: 'blue' },
    //   { id: 2, blockName: 'rest', durationInSeconds: 5, resting: false, color: 'red' },
    //   { id: 3, blockName: 'jump', durationInSeconds: 6, resting: true, color: 'green' },
    //   { id: 4, blockName: 'rest', durationInSeconds: 5, resting: false, color: 'red' }
    // ],
    // lowerBodyExercises: [
    //   { id: 1, blockName: 'pullups', durationInSeconds: 6, resting: true, color: 'blue' },
    //   { id: 2, blockName: 'rest', durationInSeconds: 5, resting: false, color: 'red' },
    //   { id: 3, blockName: 'jump', durationInSeconds: 6, resting: true, color: 'green' },
    //   { id: 4, blockName: 'rest', durationInSeconds: 5, resting: false, color: 'red' }
    // ],
    upperBodyExercises: [
      {
        id: 1,
        blockName: 'pullups',
        durationInSeconds: 2,
        resting: true,
        color: 'blue'
      },
      {
        id: 2,
        blockName: 'rest',
        durationInSeconds: 2,
        resting: false,
        color: 'red'
      },
      {
        id: 3,
        blockName: 'jump',
        durationInSeconds: 2,
        resting: true,
        color: 'green'
      },
      {
        id: 4,
        blockName: 'rest',
        durationInSeconds: 2,
        resting: false,
        color: 'red'
      }
    ],
    workoutList: [
      {
        id: 1,
        blockName: 'fullBody',
        durationInSeconds: 6,
        resting: true,
        color: 'blue',
        exercises: [
          {
            id: 1,
            blockName: 'pullups',
            durationInSeconds: 6,
            resting: true,
            color: 'blue'
          },
          {
            id: 2,
            blockName: 'rest',
            durationInSeconds: 5,
            resting: false,
            color: 'red'
          },
          {
            id: 3,
            blockName: 'jump',
            durationInSeconds: 6,
            resting: true,
            color: 'green'
          },
          { id: 4, blockName: 'rest', durationInSeconds: 5, resting: false, color: 'red' }
        ]
      },
      {
        id: 2,
        blockName: 'lowerBody',
        durationInSeconds: 5,
        resting: false,
        color: 'red',
        exercises: [
          {
            id: 1,
            blockName: 'pullups',
            durationInSeconds: 6,
            resting: true,
            color: 'blue'
          },
          {
            id: 2,
            blockName: 'rest',
            durationInSeconds: 5,
            resting: false,
            color: 'red'
          },
          {
            id: 3,
            blockName: 'jump',
            durationInSeconds: 6,
            resting: true,
            color: 'green'
          },
          { id: 4, blockName: 'rest', durationInSeconds: 5, resting: false, color: 'red' }
        ]
      },
      {
        id: 3,
        blockName: 'upperBody',
        durationInSeconds: 6,
        resting: true,
        color: 'green',
        exercises: [
          {
            id: 1,
            blockName: 'pullups',
            durationInSeconds: 6,
            resting: true,
            color: 'blue'
          },
          {
            id: 2,
            blockName: 'rest',
            durationInSeconds: 5,
            resting: false,
            color: 'red'
          },
          {
            id: 3,
            blockName: 'jump',
            durationInSeconds: 6,
            resting: true,
            color: 'green'
          },
          { id: 4, blockName: 'rest', durationInSeconds: 5, resting: false, color: 'red' }
        ]
      }
    ]
  }

export default createStore({ mutations, state, strict: true }) */
