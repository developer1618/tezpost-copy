<template>
<vue-good-table
    :columns="columns"
    :rows="missingOrders"
    :line-numbers="true"
    theme="polar-bear"
    styleClass="vgt-table"
    :search-options="{
    enabled: true,
    placeholder: 'Поиск ...',
    }"
    :pagination-options="{
    enabled: true,
    nextLabel: 'След',
    prevLabel: 'Пред',
    ofLabel: 'из',
    rowsPerPageLabel: 'Строк на странице',
    perPageDropdown: [10, 25, 50, 100],
    allLabel: 'Все',
    }"
>
    <template slot="table-row" slot-scope="props">
    <span v-if="props.column.field === 'track_code'">
        <span>{{ props.row.track_code }}</span>
    </span>
    <span v-if="props.column.field === 'missing_orders'">
        <span v-if="props.row.missing_orders && props.row.missing_orders.length > 0">
        <span v-for="(order, index) in props.row.missing_orders" :key="index">
            {{ order.track_code }}<span v-if="index < props.row.missing_orders.length - 1">, </span>
        </span>
        </span>
        <span v-else>—</span>
    </span>
    </template>
    <div slot="emptystate" class="text-center">
    <span v-if="loading">Загрузка...</span>
    <span v-else>По вашему запросу ничего не найдено</span>
    </div>
</vue-good-table>
</template>

<script>
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';

export default {
  components: {
    VueGoodTable,
  },
  data() {
    return {
      loading: false,
      columns: [
      {
            label: 'Трек код | 跟踪代码',
            field: 'track_code',
            tdClass: 'vgt-center-align',
            thClass: 'vgt-center-align',
        },
        {
            label: 'Статус | 地位',
            field: 'status.name',
            type: 'string',
            tdClass: 'vgt-center-align',
            thClass: 'vgt-center-align',
        },
      ],
      missingOrders: [],
    };
  },
  methods: {
    processOrders(response) {
      console.log('Response data:', response);

      this.missingOrders = response.boxes.map(box => {
        console.log('Processing box:', box);

        return {
          track_code: box.track_code || '—', // Assuming you want to show track_code in the table
          missing_orders: box.missing_orders || [],
        };
      });

      console.log('Processed Orders:', this.missingOrders);
    },
  },
  mounted() {
    // Fetch and process data as needed
    console.log('Component mounted, initial data boxes ', this.missingOrders);
  },
};
</script>
