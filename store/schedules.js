export const state = () => ({
  list: []
})

export const mutations = {
  add(state, schedules) {
    state.list.push(...schedules)
  },
  emptyList(state) {
    state.list = []
  }
}

export const getters = {
  list: state => {
    return state.list
  }
}
