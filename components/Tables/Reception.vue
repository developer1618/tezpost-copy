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
    allLabel: 'Все',
    }"
>
    <template slot="table-row" slot-scope="props">
    <span v-if="props.column.field === 'track_code'">
        <span>{{ props.row.track_code }}</span>
    </span>
    <div class="flex justify-around" v-if="props.column.field === 'action'">
        <nuxt-link
        :to="`/boxes/${props.row.id}`"
        class="text-blue-500"
        title="Просмотреть"
        >
        <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        </svg>
        </nuxt-link>
        <div v-if="!isAction">
        <nuxt-link
            :to="`/boxes/edit/${props.row.id}`"
            v-if="props.row.status_id === 8 || props.row.status_id === 11"
            class="text-yellow-500"
            title="Редактировать"
        >
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-edit"
            >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path
                d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
            ></path>
            </svg>
        </nuxt-link>
        </div>
        <div v-if="!isAction">
        <button
            type="button"
            class="text-red-600"
            v-if="
            $store.$auth.$state.user.allPermissions.some(
                (o) => o.name === 'admin-read' || o.name === 'order-read'
            )
            "
            @click="removeItem(props.row)"
            title="Удалить"
        >
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-trash-2"
            >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path
                d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
            ></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
        </button>
        </div>
    </div>
    <span v-else-if="props.column.field === 'orders_status'">
        <span
        class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full whitespace-nowrap"
        :class="{
            'bg-blue-100 text-blue-800': props.row.orders_status === 'Найден',
            'bg-yellow-100 text-yellow-800': props.row.orders_status === 'Не найден',
            'bg-green-100 text-green-800': props.row.orders_status !== 'Найден' && props.row.orders_status !== 'Не найден'
        }"
        >
        {{ props.row.orders_status }}
        </span>
    </span>
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
    this.missingOrders = response.boxes.map((box) => ({
        track_code: box.track_code || "—",
        orders_status: box.orders_status || "Неизвестно"
    }));
    }
},
mounted() {
    const testResponse = {
    boxes: [
        { track_code: "dpk301478982645", orders_status: "Найден" },
        { track_code: "gtr404914221487", orders_status: "Не найден" }
    ]
    };
    this.processOrders(testResponse);
}
};
</script>