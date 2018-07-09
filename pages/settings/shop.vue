<template>
  <div>
    <v-form ref="form">
    <v-container>
      <v-layout row wrap>
        <v-flex sm3 md3>
          <v-text-field
            v-validate="'required|max:50'"
            v-model="shop.name"
            :counter="50"
            :error-messages="errors.collect('shop.name')"
            label="Shop Name"
            data-vv-name="shop.name"
            required
          ></v-text-field>
        </v-flex>
        <v-flex sm1 md1></v-flex>
        <v-flex sm3 md3>
          <v-text-field
            v-validate="'required|max:255'"
            v-model="shop.email"
            :counter="255"
            :error-messages="errors.collect('shop.email')"
            label="email"
            data-vv-name="shop.email"
            required
          ></v-text-field>
        </v-flex>
        <v-flex sm1 md1></v-flex>
        <v-flex sm3 md3>
          <v-text-field
            v-validate="'required|max:255'"
            v-model="shop.phoneNumber"
            :counter="13"
            :error-messages="errors.collect('shop.phoneNumber')"
            label="phoneNumber"
            data-vv-name="shop.phoneNumber"
            required
          ></v-text-field>
        </v-flex>
        <v-flex sm1 md1></v-flex>
        <v-flex sm3 md3>
          <v-select
            v-validate="'required'"
            :items="countries"
            item-value="code"
            item-text="name"
            v-model="shop.countryCode"
            :error-messages="errors.collect('shop.countryCode')"
            label="Country"
            data-vv-name="shop.countryCode"
            required
          ></v-select>
        </v-flex>
        <v-flex sm1 md1></v-flex>
        <v-flex sm3 md3>
          <v-select
            v-validate="'required'"
            :items="timezones"
            item-value="code"
            item-text="name"
            v-model="shop.timezoneCode"
            :error-messages="errors.collect('shop.timezoneCode')"
            label="Timezone"
            data-vv-name="shop.timezoneCode"
            required
          ></v-select>
        </v-flex>

        <v-flex sm8 md8>
          <div>
            <v-alert v-model="alert" type="success" dismissible>
              updated.
            </v-alert>
          </div>
        </v-flex>
        <v-flex sm3 md3 class="text-xs-right">
          <v-btn @click="reset" >reset</v-btn>
          <v-btn @click="submit" color="red accent-1" >save</v-btn>
        </v-flex>
        <v-flex sm1 md1 class="text-xs-right">
        </v-flex>
      </v-layout>
    </v-container>
    </v-form>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    layout: 'main',
    data: () => ({
      alert: false,
      dictionary: {
        attributes: {

        },
        custom: {
        }
      }
    }),
    mounted () {
      this.$validator.localize('en', this.dictionary)
    },
    methods: {
      submit() {
        this.$validator.validateAll().then(result => {
          if (result) {
            axios.patch('http://localhost:8080/api/client/shops/1',{
              name : this.shop.name,
              email: this.shop.email,
              phoneNumber: this.shop.phoneNumber,
              countryCode: this.shop.countryCode,
              timezoneCode: this.shop.timezoneCode
            },
              {
                headers: {'AUTHORIZATION': this.$store.state.token}
              }
            )
            setTimeout(() => { this.alert = false }, 2000)
            this.alert = true
            this.$router.push('/settings/shop')
          }
        })
      },
      reset() {
        window.location.reload(true)
      }
    },
    async asyncData({ store, error }) {
      const headers = { headers: {'AUTHORIZATION': store.state.token} }
      axios.get(`http://localhost:8080/api/auth/refreshToken`, headers)
        .then((res) => {
          store.dispatch('writeToken',res.data.token)
        }).catch((err) => {
          error({ statusCode: 401, message: err.message })
      })
      const [shop,countries,timezones] = await Promise.all([
        axios.get(`http://localhost:8080/api/client/shops/1`, headers)
          .then((res) => {
            return res.data
          }).catch((err) => {
            error({ statusCode: 500, message: err.message })
          }),
        axios.get(`http://localhost:8080/api/client/countries`, headers)
          .then((res) => {
            return res.data
          }).catch((err) => {
          error({ statusCode: 500, message: err.message })
        }),
        axios.get(`http://localhost:8080/api/client/timezones`, headers)
          .then((res) => {
            return res.data
          }).catch((err) => {
          error({ statusCode: 500, message: err.message })
        })
      ])
      return {
        shop: shop,
        countries: countries,
        timezones: timezones
      }
    }
  }
</script>
