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
          <div class="flex flex-wrap w-full">
            <div class="w-full lg:w-3/5 md:w-3/5 md:px-3 py-2">
              <label class="block text-sm font-medium text-gray-700 mb-2.5">
                Название | 后退 <span class="text-red-600">*</span>
              </label>
              <div class="mt-1">
                <input
                  v-model="send.name"
                  type="text"
                  placeholder="Введите название | 输入标题"
                  required=""
                  class="form-control"
                />
              </div>
            </div>
            <!-- <div class="w-full lg:w-1/2 md:w-1/2 md:px-3 py-2">
              <label class="block text-sm font-medium text-gray-700">
                Город отправки | 后退 <span class="text-red-600">*</span>
              </label>
              <div class="mt-1">
                <select
                  id="installment"
                  class="form-control disabled:bg-gray-300"
              >
                <option value="" selected disabled>
                  Выберите город | 选择交付类型
                </option>
                <option value="Урумчи">
                  Урумчи
                </option>
                <option value="Душанбе">
                  Душанбе
                </option>
              </select>
              </div>
            </div> -->
            <div class="w-full lg:w-3/5 md:w-3/5 md:px-3 py-2">
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
                placeholder="Добавьте упаковки в отправку | 将包裹添加到您的货件中"
                tag-placeholder="Выберите упаковки | 选择包装"
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
                @select="selectBoxes"
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
    <TablesBoxes :boxes="dump_boxes" :loading="loading" :isAction="isAction" />
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
      send: {
        name: "",
        status: "",
        status_id: 12,
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
    };
  },
  computed: {
    hasSend() {
      return this.$store.state.dummy.create_sends;
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (this.hasSend.length != 0) {
        this.dump_boxes = this.hasSend;
      }
      this.$axios
        .get("/dashboard/get-data?boxes=8", {
          params: {
            type: ["boxes"],
            statuses: [8, 11],
          },
        })
        .then((res) => {
          this.boxes = res.data.boxes;
        });
    },
    save() {
      if (this.send.status) {
        this.send.status_id = this.send.status.id;
      }
      if (this.hasSend.length != 0) {
        this.send.boxes = this.hasSend.map((o) => o.id);
      }
      this.$axios
        .post("/dashboard/sends", this.send)
        .then((res) => {
          this.$swal({
            icon: "success",
            title: "Успешно",
            text: res.message,
            timer: 2000,
            timerProgressBar: true,
          }).then((res) => {
            this.$store.commit("dummy/SET_CREATE_SENDS", []);
            this.$router.push({
              path: "/sends",
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
    selectBoxes(value) {
      value.orders.forEach((item) => {
        this.orders.push(item)
      })
      this.$store.commit("dummy/SET_CREATE_SENDS", this.dump_boxes);
      this.send.boxes = this.dump_boxes.map((o) => o.id);
    },
  },
};
</script>