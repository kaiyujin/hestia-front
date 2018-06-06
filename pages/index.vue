<template>
  <div id="app">
    <v-container>
      <v-layout row class="text-xs-center">
        <v-flex xs4 />
        <v-flex xs4 class="blue lighten-5">
          <v-container class="text-xs-center">
            <v-card flat>
              <v-card-title primary-title>
                <h4>Login</h4>
              </v-card-title>
              <v-form ref="form">
                <v-text-field prepend-icon="person"
                              v-model="Username"
                              label="Username"
                              required
                              v-validate="'required|max:255'"
                              :error-messages="errors.collect('Username')"
                              data-vv-name="Username"
                ></v-text-field>
                <v-text-field prepend-icon="lock" name="Password" label="Password" type="password"></v-text-field>
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
  export default {

    data: () => ({
      Username: '',
      Password: '',
      dictionary: {
        attributes: {
          //Username: 'E-mail Address'
        },
        custom: {
          password: {
            required: () => 'pass can not be empty',
            max: 'The name field may not be greater than 100 characters'
            // custom messages
          }
        }
      }
    }),

    mounted () {
      this.$validator.localize('en', this.dictionary)
    },

    methods: {
      submit () {
        this.$validator.validateAll().then(result => {
            if (result) this.$router.push('/reservations/')
        })
      }
    }
  }
</script>
