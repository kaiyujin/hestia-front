<template>
  <div id="app">
    <v-container>
      <v-layout row class="text-xs-center">
        <v-flex xs4/>
        <v-flex xs4 class="blue lighten-5">
          <v-container class="text-xs-center">
            <v-card flat>
              <v-card-title primary-title>
                <h4>Login{{errorMessage}}</h4>
              </v-card-title>
              <v-form ref="form">
                <v-text-field prepend-icon="person"
                              v-model="username"
                              label="username"
                              required
                              v-validate="'required|max:255'"
                              :error-messages="errors.collect('username')"
                              data-vv-name="username"
                ></v-text-field>
                <v-text-field prepend-icon="lock"
                              v-model="password"
                              name="password"
                              label="password"
                              v-validate="'required|max:255'"
                              :error-messages="errors.collect('password')"
                              type="password"
                              data-vv-name="password">
                </v-text-field>
                <v-card-actions>
                  <v-btn primary round large block color="blue lighten-3" @click="submit">Login</v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {

    data: () => ({
      username: '',
      password: '',
      errorMessage: '',
    }),

    methods: {
      submit() {
        this.$validator.validateAll().then(result => {
          let params = new URLSearchParams();
          params.append('username', this.username);
          params.append('password', this.password);
          if (result) {
            axios.post('http://localhost:8080/api/auth/login', params)
              .then(
                response => {
                  console.log(response.data.token)
                  this.$store.dispatch('writeToken',response.data.token)
                  this.$router.push('/reservations/')
                }
              )
              .catch(error => {
                if (error.response) {
                  if (error.response.status === 401) {
                    this.errorMessage = this.$t('error.login_failed')
                  } else if (error.response.status === 500) {
                    this.errorMessage = this.$t('error.internal_server_error')
                  } else {
                    this.errorMessage = this.$t('error.internal_server_error')
                  }
                }
                console.log(error)
              })
          }
        })
      }
    }
  }
</script>
