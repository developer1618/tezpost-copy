<template>
<vue-good-table
    v-if="missingOrders.length > 0"
    :columns="columns"
    :rows="missingOrders"
    :line-numbers="true"
    theme="polar-bear"
    styleClass="vgt-table"
    :search-options="{
    enabled: true,
    placeholder: 'Поиск ...'
    }"
    :pagination-options="{
    enabled: true,
    nextLabel: 'След',
    prevLabel: 'Пред',
    ofLabel: 'из',
    rowsPerPageLabel: 'Строк на странице',
    perPageDropdown: [10, 25, 50, 100],
    allLabel: 'Все'
    }"
>
    <template slot="table-row" slot-scope="props">
    <span v-if="props.column.field === 'track_code'">
        <span>{{ props.row.track_code }}</span>
    </span>
    <div v-if="props.column.field === 'orders_status'">
        <select 
        v-model="props.row.orders_status" 
        @change="updateOrderStatus(props.row)"
        class="rounded-md py-1 px-2"
        :class="{
            'bg-green-100 text-green-800': props.row.orders_status === 'Прием в Душанбе',
            'bg-red-100 text-red-800': props.row.orders_status === 'Пропал',
            'bg-gray-100 text-gray-800': !props.row.orders_status
        }"
        >
        <option value="Прием в Душанбе" class="bg-green-100 text-green-800">Прием в Душанбе</option>
        <option value="Пропал" class="bg-red-100 text-red-800">Пропал</option>
        </select>
    </div>
    </template>
    <div slot="emptystate" class="text-center">
    <span v-if="loading">Загрузка...</span>
    <span v-else>По вашему запросу ничего не найдено</span>
    </div>
</vue-good-table>
</template>

<script>
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";

export default {
components: {
    VueGoodTable
},
data() {
    return {
    loading: false,
    columns: [
        {
            label: "Трек-код товара | 跟踪代码",
            field: "track_code",
            tdClass: "vgt-center-align",
            thClass: "vgt-center-align"
        },
        {
            label: "Статус | 缺失的订单",
            field: "orders_status",
            tdClass: "vgt-center-align",
            thClass: "vgt-center-align"
        }
    ],
    missingOrders: []
    };
},
methods: {
    processOrders(response) {
    this.missingOrders = response.box_orders.map((box) => ({
        track_code: box.track_code || "—",
        orders_status: box.orders_status || "Неизвестно"
    }));
    },
    updateOrderStatus(row) {
    console.log(`Status for track code ${row.track_code} changed to ${row.orders_status}`);
    }
},
mounted() {
    const testResponse = {
    box_orders: [
        { track_code: "dpk301478982645", orders_status: "Прием в Душанбе" },
        { track_code: "gtr404914221487", orders_status: "Пропал" }
    ]
    };
    this.processOrders(testResponse);
}
};
</script>

<style scoped>
/* Optional: Add specific styles for the select element */
.bg-green-100 {
background-color: #d1fae5;
}
.text-green-800 {
color: #065f46;
}
.bg-red-100 {
background-color: #fee2e2;
}
.text-red-800 {
color: #b91c1c;
}
.bg-yellow-300 {
background-color: #fef3c7;
}
.text-yellow-800 {
color: #92400e;
}
.bg-gray-100 {
background-color: #f3f4f6;
}
.text-gray-800 {
color: #1f2937;
}
</style>
