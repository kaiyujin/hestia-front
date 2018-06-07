<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile @click="reservations">
          <v-list-tile-action>
            <v-icon>subtitles</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>予約</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list>
        <v-list-group
          v-for="item in items"
          v-model="item.active"
          :key="item.title"
          :prepend-icon="item.action"
          no-action
        >
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-for="subItem in item.items" :key="subItem.title" @click="settings(subItem.action)">
            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        </v-list>
        <v-list-tile @click="logout">
          <v-list-tile-action>
            <v-icon>clear</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>ログアウト</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
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
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2018</span>
    </v-footer>
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
</style>

<script>
  import moment from 'moment';
  export default {
    data: () => ({
      drawer: null,
      date: moment(new Date()).format('YYYY/MM/DD'),
      items: [
        {
          action: 'settings',
          title: '設定',
          active: true,
          items: [
            { title: '店舗基本情報' ,action: 'shop'},
            { title: 'テーブル' ,action: 'table'},
            { title: 'WEB予約' ,action: 'reservation'}
          ]
        }
      ]
    }),
    props: {
      source: String
    },
		methods :{
			reservations() {
        this.$router.push('/reservations/')
      },
			settings(action) {
        this.$router.push('/settings/' + action)
      },
      logout(){
        this.$router.push('/')
      },
      prev_day(){
        this.date = moment(this.date).subtract(1, 'days').format('YYYY/MM/DD')
      },
      today(){
        this.date = moment(new Date()).format('YYYY/MM/DD')
      },
      next_day(){
			  this.date = moment(this.date).add(1, 'days').format('YYYY/MM/DD')
      }
    }
  }
</script>
