import { createStore } from 'vuex'

const mutations = {
    increment(state) {
      state.counter += 1
    }
  },
  state = {
    counter: 0,
    // fullBodyExercies: [
    //   { id: 1, blockName: 'pullups', seconds: 6, resting: true, color: 'blue' },
    //   { id: 2, blockName: 'rest', seconds: 5, resting: false, color: 'red' },
    //   { id: 3, blockName: 'jump', seconds: 6, resting: true, color: 'green' },
    //   { id: 4, blockName: 'rest', seconds: 5, resting: false, color: 'red' }
    // ],
    // lowerBodyExercises: [
    //   { id: 1, blockName: 'pullups', seconds: 6, resting: true, color: 'blue' },
    //   { id: 2, blockName: 'rest', seconds: 5, resting: false, color: 'red' },
    //   { id: 3, blockName: 'jump', seconds: 6, resting: true, color: 'green' },
    //   { id: 4, blockName: 'rest', seconds: 5, resting: false, color: 'red' }
    // ],
    upperBodyExercises: [
      { id: 1, blockName: 'pullups', seconds: 6, resting: true, color: 'blue' },
      { id: 2, blockName: 'rest', seconds: 5, resting: false, color: 'red' },
      { id: 3, blockName: 'jump', seconds: 6, resting: true, color: 'green' },
      { id: 4, blockName: 'rest', seconds: 5, resting: false, color: 'red' }
    ],
    workoutList: [
      {
        id: 1,
        blockName: 'fullBody',
        seconds: 6,
        resting: true,
        color: 'blue',
        exercises: [
          {
            id: 1,
            blockName: 'pullups',
            seconds: 6,
            resting: true,
            color: 'blue'
          },
          {
            id: 2,
            blockName: 'rest',
            seconds: 5,
            resting: false,
            color: 'red'
          },
          {
            id: 3,
            blockName: 'jump',
            seconds: 6,
            resting: true,
            color: 'green'
          },
          { id: 4, blockName: 'rest', seconds: 5, resting: false, color: 'red' }
        ]
      },
      {
        id: 2,
        blockName: 'lowerBody',
        seconds: 5,
        resting: false,
        color: 'red',
        exercises: [
          {
            id: 1,
            blockName: 'pullups',
            seconds: 6,
            resting: true,
            color: 'blue'
          },
          {
            id: 2,
            blockName: 'rest',
            seconds: 5,
            resting: false,
            color: 'red'
          },
          {
            id: 3,
            blockName: 'jump',
            seconds: 6,
            resting: true,
            color: 'green'
          },
          { id: 4, blockName: 'rest', seconds: 5, resting: false, color: 'red' }
        ]
      },
      {
        id: 3,
        blockName: 'upperBody',
        seconds: 6,
        resting: true,
        color: 'green',
        exercises: [
          {
            id: 1,
            blockName: 'pullups',
            seconds: 6,
            resting: true,
            color: 'blue'
          },
          {
            id: 2,
            blockName: 'rest',
            seconds: 5,
            resting: false,
            color: 'red'
          },
          {
            id: 3,
            blockName: 'jump',
            seconds: 6,
            resting: true,
            color: 'green'
          },
          { id: 4, blockName: 'rest', seconds: 5, resting: false, color: 'red' }
        ]
      }
    ]
  }

export default createStore({ mutations, state, strict: true })
