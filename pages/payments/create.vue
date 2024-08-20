<template>
  <div class="px-6">
    <div class="w-full py-8">
      <div class="flex items-center justify-between w-full">
        <div class="">
          <h2 class="md:text-4xl text-2xl font-bold text-gray-700 mb-2.5">
            Добавить
          </h2>
          <span class="text-gray-800">Процес добавление товара.</span>
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
            <span>Назад</span>
          </span>
        </div>
      </div>
    </div>
    <form @submit.prevent="save">
      <div class="w-full bg-white py-4 px-4 shadow sm:rounded-lg sm:px-4">
          <ul class="grid grid-cols-1 divide-y">
            <li class="flex items-center justify-between py-5">
              <span class="font-medium">Имя: </span>
              <div class="w-full lg:w-1/3 md:w-1/2 md:px-3">
                <input
                    type="text"
                    required
                    placeholder="Введите имя"
                    v-model="payment.first_name"
                    class="form-control disabled:bg-gray-300"
                />
              </div>
            </li>
            <li class="flex items-center justify-between py-5">
              <span class="font-medium">Фамилия: </span>
              <div class="w-full lg:w-1/3 md:w-1/2 md:px-3">
                <input
                    type="text"
                    placeholder="Введите фамилию"
                    v-model="payment.last_name"
                    required
                    class="form-control disabled:bg-gray-300"
                />
              </div>
            </li>
            <li class="flex items-center justify-between py-5">
              <span class="font-medium">Номер телефона: </span>
              <div class="w-full lg:w-1/3 md:w-1/2 md:px-3">
                <input
                    type="tel"
                    required
                    placeholder="Введите номер телефона"
                    v-model="payment.phone"
                    maxlength="14"
                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                    class="form-control disabled:bg-gray-300"
                />
              </div>
            </li>

            <li class="py-5">
              <nav class="flex items-center justify-between">
                <span class="font-medium">Введите трек коды: </span>
                <div class="w-full lg:w-1/3 md:w-1/2 md:px-3" v-if="payment.user">
                  <Multiselect
                    placeholder="Выберите товары для оплаты"
                    :disabled="!payment.user"
                  />
                </div>
                <div class="w-full lg:w-1/3 md:w-1/2 md:px-3" v-else>
                  <Multiselect
                    placeholder="Выберите товары для оплаты"
                    label="track_code" track-by="id"
                    v-model="dump_orders"
                    :closeOnSelect="false"
                    :hideSelected="true"
                    :searchable="true"
                    :options="orders"
                    :multiple="true"
                    :taggable="true"
                    @input="selectOrders"
                  />
                </div>
              </nav>
            </li>
          </ul>
        </div>
        <div class="w-full bg-white py-4 px-4 shadow sm:rounded-lg sm:px-4 mt-2.5">
          <h3 class="text-gray-800 font-bold text-lg">Итог Авиа:</h3>
          
          <ul class="grid grid-cols-1 divide-y">

            <li class="flex items-center justify-between py-5">
              <span class="font-medium">Общий вес: </span>
              <span class="text-base">
                {{ payment.weight }} <span class="font-medium">(кг)</span></span
              >
            </li>
           <li class="flex items-center justify-between py-5">
             <span class="font-medium">Кол/во товаров: </span>
             <span class="text-base"> - <span class="font-medium">(шт)</span></span>
           </li>
            <li class="flex items-center justify-between py-5">
              <span class="font-medium">Стоимость доставки в Китае: </span>
              <span class="text-base"
                >{{ payment.cost_china }}
                <span class="font-medium">CNY</span></span
              >
            </li>
          </ul>
        </div>
        <div class="w-full bg-white py-4 px-4 shadow sm:rounded-lg sm:px-4 mt-2.5">
          <h3 class="text-gray-800 font-bold text-lg">Итог Truck:</h3>
          
          <ul class="grid grid-cols-1 divide-y">

            <li class="flex items-center justify-between py-5">
              <span class="font-medium">Общий вес: </span>
              <span class="text-base">
                {{ payment.weight }} <span class="font-medium">(кг)</span></span
              >
            </li>
           <li class="flex items-center justify-between py-5">
             <span class="font-medium">Кол/во товаров: </span>
             <span class="text-base"> - <span class="font-medium">(шт)</span></span>
           </li>
            <li class="flex items-center justify-between py-5">
              <span class="font-medium">Стоимость доставки в Китае: </span>
              <span class="text-base"
                >{{ payment.cost_china }}
                <span class="font-medium">CNY</span></span
              >
            </li>
          </ul>
        </div>


        <div class="w-full bg-white py-4 px-4 shadow sm:rounded-lg sm:px-4 mt-2.5">
          <h3 class="text-gray-800 font-bold text-lg">Общий итог:</h3>
          
          <ul class="grid grid-cols-1 divide-y">

            <li class="flex items-center justify-between py-5">
              <span class="font-medium">Общий вес: </span>
              <span class="text-base">
                {{ payment.weight }} <span class="font-medium">(кг)</span></span
              >
            </li>
  <!--          <li class="flex items-center justify-between py-5">-->
  <!--            <span class="font-medium">Места: </span>-->
  <!--            <span class="text-base">-->
  <!--              {{ payment.places }} <span class="font-medium">(шт)</span></span-->
  <!--            >-->
  <!--          </li>-->
            <li class="flex items-center justify-between py-5">
              <span class="font-medium">Стоимость доставки в Китае: </span>
              <span class="text-base"
                >{{ payment.cost_china }}
                <span class="font-medium">CNY</span></span
              >
            </li>
  <!--          <li class="flex items-center justify-between py-5">-->
  <!--            <span class="font-medium">Оплата: </span>-->
  <!--            <div class="w-full lg:w-1/3 md:w-1/2 md:px-3">-->
  <!--              <input-->
  <!--                  type="tel"-->
  <!--                  maxlength="7"-->
  <!--                  placeholder="Введите cтоимость доставки"-->
  <!--                  required-->
  <!--                  class="form-control disabled:bg-gray-300"-->
  <!--              />-->
  <!--            </div>-->
  <!--          </li>-->

            <li class="flex items-center justify-between py-5">
              <span class="font-medium text-xl">Итого: </span>
              <div class="w-full lg:w-1/3 md:w-1/2 md:px-3">
                <input
                    type="tel"
                    maxlength="7"
                    v-model="payment.total"
                    placeholder="Введите итог"
                    required
                    class="form-control disabled:bg-gray-300"
                />
              </div>
            </li>
            <li class="flex items-center justify-between py-5">
              <div class="col-6">
                <button
                  type="submit"
                  class="
                    rounded
                    bg-bo-primary
                    text-center text-white
                    py-3
                    px-7
                    mt-3
                    lg:ml-3
                    w-full
                    md:w-max
                    hover:bg-bo-primary
                  "
                >
                  Сохранить
                </button>
              </div>
              <div class="col-6 text-right">
                <p class="font-semibold h3">Спасибо за доверие !</p>
                <small
                  >Дата / время:
                  <strong> {{ moment().format("L | LTS") }} </strong></small
                >
              </div>
            </li>
          </ul>
      </div>
    </form>

    <div class="my-8">
      <h2 class="md:text-2xl text-xl font-bold text-gray-600 mb-2.5">
        Просмотр содержимого
      </h2>
    </div>
    <TablesOrders :orders="dump_orders" :loading="loading" />
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/ru";
import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      moment: moment,
      payment: {
        first_name: null,
        last_name: null,
        phone: null,
        user_id: null,
        orders: null,
        weight: 0,
        cost_china: 0,
        // places: 0,
        total: null,
      },
      orders: [],
      dump_orders: [],
      loading: false,
      disabled: false,
      users: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // this.$axios
        // .get("/dashboard/get-data", {
        //   params: {
        //     type: ["users"],
        //   },
        // })
        // .then((res) => {
        //   this.users = res.data.users;
        // });
      this.$axios.get("/dashboard/payments?orders=1").then((res) => {
        this.orders = res.data.orders;
      });
    },
    save() {
      // if (this.payment.user) {
      //   this.payment.user_id = this.payment.user.id;
      // }
      this.$axios
        .post("/dashboard/payments", this.payment)
        .then((res) => {
          this.$swal({
            icon: "success",
            title: "Успешно",
            text: res.message,
            timer: 2000,
            timerProgressBar: true,
          }).then((res) => {
            this.$router.push({
              path: "/payments",
            });
          });
        })
        .catch((err) => {
          this.$swal({
            icon: "erros",
            title: "Ошибка",
            text: err.response.data.message
              ? err.response.data.message
              : err.response.data[Object.keys(err.response.data)[0]][0],
            timer: 2000,
            timerProgressBar: true,
          });
        });
    },
    selectOrders() {
      this.dump_orders = this.dump_orders;
      this.payment.orders = this.dump_orders.map((el) => el.id);
      this.payment.weight = this.dump_orders
        .map((el) => el.weight)
        .reduce((a, b) => a + b);
      // this.payment.cost = this.dump_orders
      //   .map((el) => el.cost)
      //   .reduce((a, b) => a + b);
      this.payment.cost_china = this.dump_orders
        .map((el) => el.cost_china)
        .reduce((a, b) => a + b);
      // this.payment.places = this.dump_orders.length;
      // this.payment.total = this.payment.cost_china;
    },
  },
};
</script>
