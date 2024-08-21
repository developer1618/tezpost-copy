<template>
  <div class="px-6">
    <div class="w-full py-8">
      <div class="flex items-center justify-between w-full">
        <div class="">
          <h2 class="md:text-3xl text-2xl font-bold text-gray-700 mb-2.5">
            Добавить | 添加
          </h2>
          <span class="text-gray-800"
            >Ура ваши товары прибыли так добавить их в Склад. |
            万岁，您的货物已到达，请将它们添加到仓库。</span
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
          <div class="flex flex-wrap w-full">
            <div class="w-full lg:w-1/2 md:w-1/2 md:px-3 py-2">
              <label
                class="block text-sm font-medium text-gray-700"
                id="find-boxes"
              >
                <p class="mb-2.5 block">
                  Трек код Упаковки | 跟踪代码包装<span class="text-red-600"
                    >*</span
                  >
                </p>
              </label>
              <Multiselect
                placeholder="Примите упаковки в Душанбе | 在杜尚别接受包裹"
                tag-placeholder="Выберите упаковки | 在杜尚别接受包裹"
                label="name"
                track-by="id"
                v-model="dump_boxes"
                :closeOnSelect="false"
                :hideSelected="true"
                :loading="true"
                :searchable="true"
                :options="boxes"
                :multiple="true"
                :taggable="true"
                @input="selectBoxes"
              />
            </div>
            <div class="w-full lg:w-1/2 md:w-1/2 md:px-3 py-2">
              <label
                class="block text-sm font-medium text-gray-700"
                id="find-boxes"
              >
                <p class="mb-2.5 block">
                  Трек код Товара | 产品追踪码<span class="text-red-600">*</span>
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
                @input="selectOrders"
              />
            </div>
            <div class="md:px-3 w-full">
              <d-button
                :loading="loading"
                :disabled="disabled"
                buttonText="Сохранить | 节省"
                classList="rounded bg-bo-primary text-center text-white py-3 px-7 mt-3 w-full md:w-max hover:bg-bo-primary"
              />
            </div>
            <modal name="missing-orders-modal" height="auto" width="800">
              <div class="p-8">
                <h2 class="text-xl font-bold text-gray-700 mb-4">Не все заказы найдены!</h2>
                <p>Отсутствующие заказы:</p>
                <ul>
                  <li v-for="order in missingOrders" :key="order.id" class="text-red-600 font-semibold">
                    {{ order.track_code }}
                  </li>
                </ul>
                <TablesReception :boxes="missingOrders" />
                <div class="flex justify-items-end">
                  <button @click="$modal.hide('missing-orders-modal')" class="mt-4 d-btn d-btn-primary">Сохранить</button>
                </div>
              </div>
            </modal>
          </div>
        </form>
      </div>
    </div>
    <div class="my-8">
      <h2 class="md:text-2xl text-xl font-bold text-gray-600 mb-2.5">
        Просмотр содержимого | 查看内容
      </h2>
    </div>
    <TablesBoxes :boxes="dump_boxes" :loading="loading" :isAction="isAction" />
  </div>
  
</template>

<script>
import Multiselect from "vue-multiselect";
import Vue from 'vue';
import VModal from 'vue-js-modal';
import Reception from '@/components/Tables/Reception.vue'; // Verify this path

Vue.use(VModal, {
  dynamicDefaults: {
    draggable: true,
    resizable: true,
  },
});

export default {
  components: {
    Multiselect,
    Reception, // Register the Reception component
  },

  data() {
    return {
      reception: {
        name: "",
        status_id: 10,
        boxes: [],
        orders: [],
      },
      dump_boxes: [],
      dump_orders: [],
      isAction: true,
      loading: false,
      disabled: false,
      boxes: [],
      orders: [],
      missingOrders: [],
    };
  },

  computed: {
    hasBoxes() {
      return this.$store.state.dummy.create_boxes;
    },
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      if (this.hasBoxes.length != 0) {
        this.dump_boxes = this.hasBoxes;
      }
      this.$axios
        .get("/dashboard/get-data", {
          params: {
            type: ["boxes"],
            statuses: [9],
          },
        })
        .then((res) => {
          this.boxes = res.data.boxes;
        });
    },
    
    save() {
      if (this.reception.status) {
        this.reception.status_id = this.reception.status.id;
      }
      if (this.hasBoxes.length != 0) {
        this.reception.boxes = this.hasBoxes.map((o) => o.id);
      }
      this.$axios
        .post("/dashboard/reception", this.reception)
        .then((res) => {
          this.$swal({
            icon: "success",
            title: "Успешно",
            text: res.message,
            timer: 3000,
            timerProgressBar: true,
          }).then((res) => {
            this.$store.commit("dummy/SET_CREATE_RECEPTIONS", []);
            this.$router.push({
              path: "/reception",
            });
          });
        })
        .catch((err) => {
          this.missingOrders = err.response.data.missing_orders;
          this.$modal.show('missing-orders-modal');
        });
    },
    
    selectBoxes(value) {
      value[0].orders.forEach((item) => {
        this.orders.push(item);
      });
      this.$store.commit("dummy/SET_CREATE_BOXES", this.dump_boxes);
      this.reception.boxes = this.dump_boxes.map((o) => o.id);
    },
    
    selectOrders(value) {
      this.reception.orders = value.map(order => {
        return {
          id: order.id,
          status_id: 4
        };
      });
      this.$store.commit("dummy/SET_CREATE_RECEPTIONS", this.reception.orders);
    },
  },
};
</script>