import { createStore } from 'vuex'

const mutations = {
    increment(state) {
      state.counter += 1
    }
  },
  state = {
    counter: 0,
    exerciseList: [
      { id: 1, blockName: 'pullups', seconds: 6, resting: true, color: 'blue' },
      { id: 2, blockName: 'rest', seconds: 5, resting: false, color: 'red' },
      { id: 3, blockName: 'jump', seconds: 6, resting: true, color: 'green' },
      { id: 4, blockName: 'rest', seconds: 5, resting: false, color: 'red' }
    ]
  }

export default createStore({ mutations, state, strict: true })
