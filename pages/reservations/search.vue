<template>
  <div>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex>
          <v-menu
            ref="fromPicker"
            :close-on-content-click="false"
            v-model="fromPicker"
            :nudge-right="40"
            :return-value.sync="fromDate"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <v-text-field
              slot="activator"
              v-model="fromDate"
              v-bind:label="this.$t('reserve_day_from')"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="fromDate"
                           v-bind:locale="dataPickerLocale"
                           @input="$refs.fromPicker.save(fromDate)">
            </v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex md1>
          <v-btn fab dark small color="brown darken-3" @click="clearFromDate">
            <v-icon dark>clear</v-icon>
          </v-btn>
        </v-flex>
        <v-flex>
          <v-menu
            ref="toPicker"
            :close-on-content-click="false"
            v-model="toPicker"
            :nudge-right="40"
            :return-value.sync="toDate"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <v-text-field
              slot="activator"
              v-model="toDate"
              v-bind:label="this.$t('reserve_day_to')"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="toDate"
                           locale="ja-jp"
                           @input="$refs.toPicker.save(toDate)">
            </v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex md1>
          <v-btn fab dark small color="brown darken-3" @click="clearToDate">
            <v-icon dark>clear</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs6 sm8 md10></v-flex>
        <v-flex xs3 sm2 md1>
          <v-btn fab dark small color="brown darken-3">
            <v-icon dark>search</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs3 sm2 md1>
          <v-dialog v-model="dialog" max-width="800px">
            <v-btn fab dark small slot="activator" color="brown darken-3">
              <v-icon dark>add</v-icon>
            </v-btn>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.time" v-bind:label="this.$t('reservation.time')"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.name" v-bind:label="this.$t('reservation.name')"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.person" v-bind:label="this.$t('reservation.person')"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-select
                        :items="tables"
                        item-value="id"
                        item-text="name"
                        v-model="editedItem.tables"
                        v-bind:label="this.$t('reservation.table')"
                        return-object
                        multiple
                      ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.note" v-bind:label="this.$t('reservation.note')"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click.native="close">Cancel</v-btn>
                <v-btn color="primary" flat @click.native="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>
    </v-container>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      :pagination.sync="pagination"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props" @click="editItem(props.item)">
        <tr @click="editItem(props.item)">
          <td class="text-xs-left">{{ props.item.time }}</td>
          <td class="text-xs-left">{{ props.item.name }}</td>
          <td class="text-xs-left">{{ props.item.person }}</td>
          <td class="text-xs-left">
            <template v-for="t in props.item.tables" >
              {{ t.name }}
            </template>
          </td>
          <td class="text-xs-left">{{ props.item.note }}</td>
        </tr>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import axios from 'axios';

  export default {
    layout: 'main',
    data () {
      return {
        dataPickerLocale: 'ja-jp',
        fromDate: moment(new Date()).format('YYYY-MM-DD'),
        fromPicker: false,
        toDate: moment(this.date).add(1, 'days').format('YYYY-MM-DD'),
        toPicker: false,
        dialog: false,
        search: '',
        pagination: {
          rowsPerPage: 10
        },
        selected: [],
        headers: [
          { text: this.$t('reservation.time'), align: 'left', value: 'time'},
          { text: this.$t('reservation.name'), value: 'name', sortable: false,},
          { text: this.$t('reservation.person'), value: 'person' },
          { text: this.$t('reservation.table'), value: 'table' },
          { text: this.$t('reservation.note'), value: 'note', sortable: false,}
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
          time: '',
          name: '',
          person: 2,
          tables: [{id:'', name:''}],
          note: ''
        },
        defaultItem: {
          time: '',
          name: '',
          person: 2,
          tables: [{id:'', name:''}],
          note: ''
        },
        tables: [
          {id: 1, name: 'カウンター'},
          {id: 2, name: 'テーブル'},
          {id: 3, name: 'ソファ'},
        ]
      }
    },
    created() {
      this.initialize()
    },
    watch: {
      dialog (val) {
        val || this.close()
      }
    },
    computed: {
      pages () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      },
      formTitle () {
        return this.editedIndex === -1 ? this.$t('new_item') : this.$t('edit_item')
      }
    },
    methods: {
      initialize () {
        this.desserts = [
          {
            value: false,
            time: '17:00',
            name: 'テスト 太郎1',
            person: 6,
            tables: [ {id: 1,name: 'カウンター'}],
            note: 'アレルギー'
          },
          {
            value: false,
            time: '17:00',
            name: 'テスト 太郎2',
            person: 6,
            tables: [ {id: 1,name: 'カウンター'}],
            note: 'アレルギー'
          },
          {
            value: false,
            time: '18:00',
            name: 'テスト 太郎3',
            person: 6,
            tables: [ {id: 1,name: 'カウンター'}],
            note: 'アレルギー'
          },
        ]
      },
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
      clearFromDate () {
        this.fromDate = null
      },
      clearToDate () {
        this.toDate = null
      }
    }
  }
</script>
