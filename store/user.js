export const state = () => ({
    locale: 'en'
})

export const mutations = {
  SET_LANG(state, user) {
    state.locale = user
  }
}

export const actions = {
  commitLocale(context, value) {
    context.commit('SET_LANG', value)
  }
}
