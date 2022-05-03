import { createStore } from 'vuex'

const mutations = {
    increment(state) {
      state.counter += 1
    }
  },
  state = {
    counter: 0,
    exerciseList: [
      { blockName: 'pullups', seconds: 6, resting: true, color: 'blue' },
      { blockName: 'rest', seconds: 5, resting: false, color: 'red' },
      { blockName: 'crunches', seconds: 6, resting: true, color: 'green' },
      { blockName: 'rest', seconds: 5, resting: false, color: 'red' }
    ]
  }

export default createStore({ mutations, state, strict: true })
