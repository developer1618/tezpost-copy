<template>
<vue-good-table
    v-if="boxes.length > 0"
    :columns="columns"
    :rows="boxes"
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
    <div v-if="props.column.field === 'orders_status'">
        <select
        :value="props.row.status_id"
        @change="$emit('updateStatus', +$event.target.value, props.row.id)"
        class="rounded-md py-1 px-2"
        :class="{
            'bg-green-100 text-green-800': props.row.status_id === 4,
            'bg-red-100 text-red-800': props.row.status_id === 20,
        }"
        >
        <option
            :value="20"
            class="bg-red-100 text-red-800"
        >
            Пропал
        </option>
        <option
            :value="4"
            class="bg-green-100 text-green-800"
        >
            Прием в Душанбе
        </option>
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
    VueGoodTable,
},
props: {
    boxes: {
    type: Array,
    required: true,
    default: () => [],
    },
},

data() {
    return {
    loading: false,
    columns: [
        {
        label: "Трек-код товара | 跟踪代码",
        field: "track_code",
        tdClass: "vgt-center-align",
        thClass: "vgt-center-align",
        },
        {
        label: "Статус | 缺失的订单",
        field: "orders_status",
        tdClass: "vgt-center-align",
        thClass: "vgt-center-align",
        },
    ],
    };
},

methods: {},
};
</script>

<style scoped>
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
