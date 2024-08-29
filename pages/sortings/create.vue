<template>
  <div class="px-6">
    <div class="w-full py-8">
      <div class="flex items-center justify-between w-full">
        <div class="">
          <h2 class="md:text-4xl text-2xl font-bold text-gray-700 mb-2.5">
            Добавить | 添加
          </h2>
          <span class="text-gray-800"
            >Процес добавление упаковок в отправку |
            将包裹添加到货件的过程</span
          >
        </div>
        <div class="flex">
          <span
            onclick="history.back()"
            class="cursor-pointer d-btn d-btn-primary"
          >
            <svg
              class="stroke-current text-white"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Назад | 后退</span>
          </span>
        </div>
      </div>
    </div>
    <div class="w-full my-5">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-4">
        <form @submit.prevent="save">
          <div>
            <div class="w-1/2 md:px-3 py-2">
              <label class="block text-sm font-medium text-gray-700">
                Номер телефон | 电话号码 <span class="text-red-600">*</span>
              </label>
              <div class="mt-1">
                <input
                  v-model="sortings.phone"
                  type="tel"
                  placeholder="Введите номер телефон | 输入电话号码"
                  required=""
                  maxlength="9"
                  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                  class="form-control disabled:bg-gray-300"
                />
              </div>
            </div>
            <div class="w-1/2 md:px-3 py-2">
              <label
                class="block text-sm font-medium text-gray-700"
                id="find-orders"
              >
                <p class="mb-2.5 block">
                  Трек код Упаковки | 跟踪代码包装<span class="text-red-600"
                    >*</span
                  >
                </p>
              </label>
              <Multiselect
                placeholder="Добавьте упаковки в отправку | 将包裹添加到您的货件中"
                tag-placeholder="Выберите упаковки | 选择包装"
                label="track_code"
                track-by="id"
                v-model="dump_orders"
                :closeOnSelect="false"
                :hideSelected="true"
                :loading="true"
                :searchable="true"
                :options="orders"
                :multiple="true"
                :taggable="true"
                @input="selectBoxes"
              />
              
            </div>
          </div>
          <div class="md:px-3 w-full">
            <d-button
              :loading="loading"
              :disabled="disabled"
              buttonText="Сохранить | 节省"
              classList="rounded bg-bo-primary text-center text-white py-3 px-7 mt-3 w-full md:w-max hover:bg-bo-primary"
            />
          </div>
        </form>
      </div>
    </div>
    <div class="my-8">
      <h2 class="md:text-2xl text-xl font-bold text-gray-600 mb-2.5">
        Просмотр содержимого | 查看内容
      </h2>
    </div>
    <TablesBoxes :orders="dump_orders" :loading="loading" :isAction="isAction" />
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect,
  },

  data() {
    return {
      sortings: {
        status: "",
        status_id: 21,
        orders: [],
        track_code: null,
        cost_china: 0,
        direction_id: this.$auth.user.direction_id,
        boxes: 1,
        phone: null,
      },
      dump_orders: [],
      isAction: true,
      loading: false,
      disabled: false,
      orders: [],
    };
  },
  computed: {
    hasSorting() {
      return this.$store.state.dummy.create_sortings;
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (this.hasSorting.length != 0) {
        this.dump_orders = this.hasSorting;
      }
      this.$axios
        .get("/dashboard/get-data", {
          params: {
            type: ["orders"],
            statuses: [4],
            isPagination: 0,
          },
        })
        .then((res) => {
          this.orders = res.data.orders;
        });
    },
    save() {
  if (this.sortings.status) {
    this.sortings.status_id = this.sortings.status.id;
  }
  if (this.hasSorting.length != 0) {
    this.sortings.orders = this.hasSorting.map((o) => o.id);
  }
  this.$axios
    .post("/dashboard/sortings", this.sortings)
    .then((res) => {
      this.$swal({
        icon: "success",
        title: "Успешно",
        text: res.message,
        timer: 2000,
        timerProgressBar: true,
      }).then((res) => {
        this.dump_orders = [];
        this.$store.commit("dummy/SET_CREATE_SORTING", []);
        this.$router.push({
          path: "/sortings/create",
        });
      });
    })
    .catch((err) => {
      this.$swal({
        icon: "error",
        title: "Ошибка",
        text: err.response.data[Object.keys(err.response.data)[0]][0],
        timer: 2000,
        timerProgressBar: true,
      });
    });
  },
    selectBoxes() {
      this.$store.commit("dummy/SET_CREATE_SORTINGS", this.dump_orders);
      this.sortings.orders = this.dump_orders.map((o) => o.id);
    },
  },
};
</script>