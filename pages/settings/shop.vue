<template>
  <div>
    <v-form ref="form">
    <v-container>
      <v-layout row wrap>
        <v-flex sm5 md5>
          <v-text-field
            v-validate="'required|max:10'"
            v-model="shop.name"
            :counter="10"
            :error-messages="errors.collect('shop.name')"
            label="Shop Name"
            data-vv-name="shop.name"
            required
          ></v-text-field>
        </v-flex>
        <v-flex sm1 md1></v-flex>
        <v-flex sm5 md5>
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
          <v-select
            v-validate="'required'"
            :items="countries"
            v-model="shop.country_code"
            :error-messages="errors.collect('shop.country_code')"
            label="Country"
            data-vv-name="shop.country_code"
            required
          ></v-select>
        </v-flex>
        <v-flex sm1 md1></v-flex>
        <v-flex sm3 md3>
          <v-select
            v-validate="'required'"
            :items="timezones"
            v-model="shop.timezone_code"
            :error-messages="errors.collect('shop.timezone_code')"
            label="Timezone"
            data-vv-name="shop.timezone_code"
            required
          ></v-select>
        </v-flex>

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
  import axios from 'axios';
  export default {
    layout: 'main',
    data: () => ({
      countries: [
        'Japan',
        'Vietnam'
      ],
      timezones: [
        'JST(+9:00)',
        'ICT(+7:00)'
      ],
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
          if (result) this.$router.push('/settings/shop')
        })
      }
    },
    asyncData(context) {

      return axios.get(`http://localhost:8080/api/shops/1`)
        .then((res) => {
          const shop = res.data
          console.log(shop)
          return {shop: shop}
        })
    }
  }
</script>
