export const state = () => ({
  list: []
})

export const mutations = {
  add(state, slides) {
    state.list.push(...slides)
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
