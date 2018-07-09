<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-group
          v-for="item in menu_reservations"
          v-model="item.active"
          :key="item.title"
          :prepend-icon="item.action"
          no-action
        >
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>{{ $t(item.title) }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile v-for="subItem in item.items" :key="subItem.title" @click="link(subItem.action)">
            <v-list-tile-content>
              <v-list-tile-title>{{ $t(subItem.title) }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>

        <v-list-tile @click="customers">
          <v-list-tile-action>
            <v-icon>person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{$t('menu.customers')}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-group
          v-for="item in menu_settings"
          v-model="item.active"
          :key="item.title"
          :prepend-icon="item.action"
          no-action
        >
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>{{ $t(item.title) }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile v-for="subItem in item.items" :key="subItem.title" @click="link(subItem.action)">
            <v-list-tile-content>
              <v-list-tile-title>{{ $t(subItem.title) }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>

        <v-list-tile @click="logout">
          <v-list-tile-action>
            <v-icon>clear</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{$t('menu.logout')}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="brown darken-4" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        {{date}}
        <v-btn outline color="white" @click="prev_day">
          <v-icon>keyboard_arrow_left</v-icon>
        </v-btn>
        <v-btn outline color="white" @click="today">
          Today
        </v-btn>
        <v-btn outline color="white" @click="next_day">
          <v-icon>keyboard_arrow_right</v-icon>
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
      <v-toolbar-title>
        <v-select
          :items="shops"
          v-model="shop.id"
          item-value="id"
          item-text="name"
        ></v-select>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-bottom-sheet v-model="notification" class="pointer">
        <v-badge slot="activator" overlap color="red">
          <span slot="badge">{{notification_count}}</span>
          <v-icon middle color="grey">notifications</v-icon>
        </v-badge>
        <v-list>
          <v-subheader>Notifications</v-subheader>
          <v-list-tile
            v-for="n in notifications"
            :key="n.title"
            @click="notification = false"
          >
            <v-list-tile-title>{{n.title}}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-bottom-sheet>
      <v-menu :nudge-width="100">
        <v-toolbar-title slot="activator">
          <span>{{language}}</span>
          <v-icon dark>arrow_drop_down</v-icon>
        </v-toolbar-title>
        <v-list>
          <v-list-tile-content>
            <v-list-tile v-for="item in languages" :key="item" ripple avatar>
              <v-list-tile-title v-text="item" @click="change_language(item)"></v-list-tile-title>
            </v-list-tile>
          </v-list-tile-content>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-layout
          justify-center
          align-center
        >
          <v-flex text-xs-center>
            <nuxt/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<style>
  html {
    font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: border-box;
    margin: 0;
  }

  .button--green {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #3b8070;
    color: #3b8070;
    text-decoration: none;
    padding: 10px 30px;
  }

  .button--green:hover {
    color: #fff;
    background-color: #3b8070;
  }

  .button--grey {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #35495e;
    color: #35495e;
    text-decoration: none;
    padding: 10px 30px;
    margin-left: 15px;
  }

  .button--grey:hover {
    color: #fff;
    background-color: #35495e;
  }

  .pointer {
    cursor: pointer;
  }

</style>

<script>
  import moment from 'moment';

  export default {
    data: () => ({
      drawer: null,
      date: moment(new Date()).format('YYYY/MM/DD'),
      shop: {id: 1, name: 'Bar hoobar'},
      language: 'ja',
      notification: null,
      notification_count: 2,
      notifications: [
        {title: '予約が入りました。'},
        {title: 'キャンセルがあります。'},
      ],
      shops: [
        {id: 1, name: 'Bar hoobar'},
        {id: 2, name: 'Sushi fizzbuzz'},
      ],
      menu_reservations: [{
        action: 'subtitles',
        title: 'menu.reservation',
        active: true,
        items: [
          {title: 'menu.reservation_calender', action: '/reservations'},
          {title: 'menu.reservation_search', action: '/reservations/search'},
        ]
      }],
      menu_settings: [
        {
          action: 'settings',
          title: 'menu.settings',
          active: false,
          items: [
            {title: 'menu.settings_shop', action: '/settings/shop'},
            {title: 'menu.settings_table', action: '/settings/table'},
            {title: 'menu.settings_web_reservation', action: '/settings/reservation'}
          ]
        }
      ],
      languages: [
        'en',
        'ja',
        'vi'
      ]
    }),
    props: {
      source: String
    },
    methods: {
      reservations() {
        this.$router.push('/reservations/')
      },
      link(action) {
        this.$router.push(action)
      },
      logout() {
        this.$store.dispatch('logout')
        this.$router.push('/')
      },
      customers() {
        this.$router.push('/customers/')
      },
      prev_day() {
        this.date = moment(this.date).subtract(1, 'days').format('YYYY/MM/DD')
      },
      today() {
        this.date = moment(new Date()).format('YYYY/MM/DD')
      },
      next_day() {
        this.date = moment(this.date).add(1, 'days').format('YYYY/MM/DD')
      },
      change_language(language) {
        this.language = language
      }
    }
  }
</script>
