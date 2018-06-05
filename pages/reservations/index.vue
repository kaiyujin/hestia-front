<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      :pagination.sync="pagination"
      hide-actions
      class="elevation-1"
    >
      <template slot="headerCell" slot-scope="props">
        <v-tooltip bottom>
          <span slot="activator">
            {{ props.header.text }}
          </span>
          <span>
            {{ props.header.text }}
          </span>
        </v-tooltip>
      </template>
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.calories }}</td>
        <td class="text-xs-left">{{ props.item.fat }}</td>
        <td class="text-xs-left">{{ props.item.carbs }}</td>
        <td class="text-xs-left">{{ props.item.protein }}</td>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    layout: 'main',
    data () {
      return {
        search: '',
        pagination: {
          rowsPerPage: 10
        },
        selected: [],
        headers: [
          {
            text: '来店時間',
            align: 'left',
            value: 'name'
          },
          { text: 'ご予約者名', value: 'calories', sortable: false,},
          { text: '人数', value: 'fat' },
          { text: 'テーブル', value: 'carbs' },
          { text: '備考', value: 'protein', sortable: false,}
        ],
        desserts: [
          {
            value: false,
            name: '17:00',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0
          },
          {
            value: false,
            name: '17:30',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3
          },
          {
            value: false,
            name: '17:30',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0
          },
          {
            value: false,
            name: '18:00',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3
          },
          {
            value: false,
            name: '18:00',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9
          },
          {
            value: false,
            name: '18:00',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0
          },
          {
            value: false,
            name: '18:30',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0
          },
          {
            value: false,
            name: '18:30',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5
          },
          {
            value: false,
            name: '18:30',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9
          },
          {
            value: false,
            name: '19:00',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7
          }
        ]
      }
    },
    computed: {
      pages () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
    }
  }
</script>
