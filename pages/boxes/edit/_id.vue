<template>
  <div class="px-6">
    <div class="w-full py-8">
      <div class="flex items-center justify-between w-full">
        <div class="">
          <h2 class="md:text-4xl text-2xl font-bold text-gray-700 mb-2.5">
            Изменить
          </h2>
          <span class="text-gray-800">Процес редактирование упаковки</span>
        </div>
        <div class="flex">
          <nuxt-link to="/boxes" class="d-btn d-btn-primary">
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
            <span>Назад</span>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="w-full my-5">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-4" v-if="box">
        <form @submit.prevent="save">
          <div class="w-full md:px-3 py-2">
            <label
              class="block text-sm font-medium text-gray-700"
              id="find-boxes"
            >
              <p class="mb-2.5 block">
                Трек код товара<span class="text-red-600">*</span>
              </p>
            </label>
            <Multiselect
              placeholder="Добавьте товары в упаковку"
              tag-placeholder="Выберите товары"
              label="track_code"
              track-by="id"
              v-model="dump_orders"
              :closeOnSelect="false"
              :hideSelected="true"
              :loading="true"
              :searchable="true"
              :options="dump_orders"
              :multiple="true"
              :taggable="true"
              @input="selectOrders"
            />
          </div>
          <div class="md:px-3 w-full">
            <d-button
              :loading="loading"
              :disabled="disabled"
              buttonText="Сохранить"
              classList="rounded bg-bo-primary text-center text-white py-3 px-7 mt-3 w-full md:w-max hover:bg-bo-primary"
            />
          </div>
        </form>
      </div>
    </div>
    <div class="my-8">
      <h2 class="md:text-2xl text-xl font-bold text-gray-600 mb-2.5">
        Просмотр содержимого
      </h2>
    </div>

    <TablesOrders
      :orders="dump_orders"
      :loading="loading"
      :isAction="isAction"
    />
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
      box: {
        name: "",
        box: "",
        box_id: "",
        orders: [],
      },
      dump_orders: [],
      loading: false,
      isAction: true,
      disabled: false,
      orders: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$axios
        .get(`/dashboard/get-data`, {
          params: {
            type: ["orders"],
            statuses: [1],
            isPagination: 1,
          },
        })
        .then((res) => {
          this.orders = res.data;
          this.$axios
            .get(`/dashboard/boxes/${this.$route.params.id}`)
            .then((res) => {
              this.box = res.data.box;
              this.dump_orders = res.data.orders;
              res.data.orders.map((el) => this.orders.push(el));

              if (this.box.status_id == 11) this.orders = this.box.orders;
            });
        });
    },
    save() {
      if (this.box.status) {
        this.box.status_id = this.box.status.id;
      }
      if (this.box.status_id == 8)
        this.$axios
          .put(`/dashboard/boxes/${this.$route.params.id}`, this.box)
          .then((res) => {
            this.$swal({
              icon: "success",
              title: "Успешно",
              text: res.message,
              timer: 2000,
              timerProgressBar: true,
            }).then((res) => {
              this.$router.push({
                path: "/boxes",
              });
            });
          })
          .catch((err) => {
            this.$swal({
              icon: "erros",
              title: "Ошибка",
              text: err.response.data[Object.keys(err.response.data)[0]][0],
              timer: 2000,
              timerProgressBar: true,
            });
          });
    },
    selectOrders() {
      this.box.orders = this.dump_orders.map((o) => o.id);
    },
  },
};
</script>
