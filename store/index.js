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

    // Store token in cookies
    console.log(token)
    if (inBrowser) {
      if (token) {
        this.$cookies.set('token', token, { expires: 30 })
      } else {
        this.$cookies.remove('token')
      }
    }
  }

}

export const actions = {
  writeToken(context, value) {
    context.commit('setToken', { token: value})
  },
  logout ({ commit }) {
    // Revoke access token
    commit('setToken', { token: null })
    this.$cookies.remove('token')
  }
}
