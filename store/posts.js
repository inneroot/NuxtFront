export const state = () => ({
  list: []
})

export const mutations = {
  add(state, posts) {
    state.list.push(...posts)
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
