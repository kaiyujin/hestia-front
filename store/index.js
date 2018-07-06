const inBrowser = typeof window !== 'undefined'

export const state = () => {
  return {
    loggedIn: false,
    token: null
  }
}

export const getters = {}

export const mutations = {

  setToken (state, { token }) {
    state.token = token
    state.loggedIn = Boolean(token)
  }

}

export const actions = {
  writeToken(context, value) {
    context.commit('setToken', { token: value})
  },
  logout ({ commit }) {
    // Revoke access token
    commit('setToken', { token: null })
  }
}
