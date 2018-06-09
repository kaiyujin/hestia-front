<template>
  <div>
    <v-form ref="form">
    <v-container>
      <v-layout row wrap>
        <v-flex sm5 md5>
          <v-text-field
            v-validate="'required|max:10'"
            v-model="ShopName"
            :counter="10"
            :error-messages="errors.collect('ShopName')"
            label="Shop Name"
            data-vv-name="ShopName"
            required
          ></v-text-field>
        </v-flex>
        <v-flex sm1 md1></v-flex>
        <v-flex sm5 md5>
          <v-text-field
            v-validate="'required|max:10'"
            v-model="Email"
            :counter="10"
            :error-messages="errors.collect('Email')"
            label="Email"
            data-vv-name="Email"
            required
          ></v-text-field>
        </v-flex>
        <v-flex sm1 md1></v-flex>
        <v-flex sm11 md11 class="text-xs-right">
          <v-btn @click="submit" color="primary">submit</v-btn>
        </v-flex>
        <v-flex sm1 md1 class="text-xs-right">
        </v-flex>
      </v-layout>
    </v-container>
    </v-form>
  </div>
</template>

<script>
  export default {
    layout: 'main',
    data: () => ({
      Name: '',
      Email: '',
      dictionary: {
        attributes: {

        },
        custom: {
          ShopName: {

          }
        }
      }
    }),
    mounted () {
      this.$validator.localize('en', this.dictionary)
    },
    methods: {
      submit() {
        this.$validator.validateAll().then(result => {
          if (result) this.$router.push('/settings/shop')
        })
      }
    }
  }
</script>
