<template>
  <div class="px-6 w-full relative z-0 overflow-y-auto focus:outline-none">
    <div class="py-8">
      <div class="flex items-center justify-between w-full">
        <div class="">
          <h2 class="md:text-4xl text-2xl font-bold text-gray-700 mb-2.5">
            Прием заказа |  添加
          </h2>
          <span class="text-gray-800">Процес добавление товара | 产品添加流程.</span>
        </div>
        <div class="flex">
          <span onclick="history.back()" class="cursor-pointer d-btn d-btn-primary">
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
    <div class="bg-white shadow sm:rounded-lg p-5 px-2.5">
      <form class="space-y-6" @submit.prevent="save">
        <div class="flex flex-wrap w-full">

          <div class="w-full lg:w-1/3 md:w-1/2 md:px-3 py-2">
            <label class="block text-sm font-medium text-gray-700">
              Трек код | 追踪代码 <span class="text-red-600">*</span>
            </label>
            <div class="mt-1 relative">
              <input
                  v-model="order.track_code"
                  type="text"
                  required=""
                  :disabled="boxes_mode"
                  class="form-control disabled:bg-gray-300"
              />
              <button
                  v-if="!boxes_mode"
                  type="button"
                  @click="generateCode"
                  class="
                  absolute
                  inset-y-0
                  right-0
                  focus:outline-none
                  px-3
                  bg-gray-700
                  rounded-r
                  text-white
                "
              >
                <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <div class="w-full lg:w-1/3 md:w-1/2 md:px-3 py-2">
            <label class="block text-sm font-medium text-gray-700">
              Вес | 重量 <span class="text-red-600">*</span>
            </label>
            <div class="mt-1 flex">
              <input
                  v-model="order.weight"
                  type="tel"
                  required=""
                  maxlength="5"
                  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                  class="form-control"
              />
            </div>
          </div>

          <div class="w-full lg:w-1/3 md:w-1/2 md:px-3 py-2">
            <label class="block text-sm font-medium text-gray-700">
              Ширина  | 宽度<span class="text-red-600">*</span>
            </label>
            <div class="mt-1 flex">
              <input
                  v-model="order.width"
                  type="tel"
                  required
                  maxlength="5"
                  :disabled="boxes_mode"
                  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                  class="form-control disabled:bg-gray-300"
              />
            </div>
          </div>
          <div class="w-full lg:w-1/3 md:w-1/2 md:px-3 py-2">
            <label class="block text-sm font-medium text-gray-700">
              Длина | 长度 <span class="text-red-600">*</span>
            </label>
            <div class="mt-1 flex">
              <input
                  v-model="order.length"
                  type="tel"
                  required
                  maxlength="5"
                  :disabled="boxes_mode"
                  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                  class="form-control disabled:bg-gray-300"
              />
            </div>
          </div>
          <div class="w-full lg:w-1/3 md:w-1/2 md:px-3 py-2">
            <label class="block text-sm font-medium text-gray-700">
              Высота | 高度 <span class="text-red-600">*</span>
            </label>
            <div class="mt-1 flex">
              <input
                  v-model="order.height"
                  type="tel"
                  required
                  maxlength="5"
                  :disabled="boxes_mode"
                  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                  class="form-control disabled:bg-gray-300"
              />
            </div>
          </div>
          <div class="w-full lg:w-1/3 md:w-1/2 md:px-3 py-2">
            <label class="block text-sm font-medium text-gray-700">
              Стоимость доставки в китае | 中国的运费 <span class="text-red-600">*</span>
            </label>
            <div class="mt-1 flex">
              <input
                  v-model="order.cost_china"
                  type="tel"
                  required
                  maxlength="8"
                  :disabled="boxes_mode"
                  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                  class="form-control disabled:bg-gray-300"
              />
            </div>
          </div>

          <div class="w-full lg:w-1/3 md:w-1/2 md:px-3 py-2">
            <label class="block text-sm font-medium text-gray-700">
              Тип доставки | 交货类型 <span class="text-red-600">*</span>
            </label>
            <div class="mt-1">
              <select
                  v-model="order.shipping_id"
                  id="installment"
                  class="form-control disabled:bg-gray-300"
                  :disabled="boxes_mode"
              >
                <option value="" selected disabled>
                  Выберите тип доставки | 选择交付类型
                </option>
                <option
                    :value="shipping.id"
                    v-for="(shipping, index) in shippings"
                    :key="index"
                >
                  {{ shipping.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="w-full lg:w-1/3 md:w-1/2 md:px-3 py-2">
            <label class="block text-sm font-medium text-gray-700">
              Город отправки | 出发城市 <span class="text-red-600">*</span>
            </label>
            <div class="mt-1">
              <select
                  v-model="order.direction_id"
                  id="installment"
                  class="form-control disabled:bg-gray-300"
                  disabled
              >
                <option value="" selected disabled>
                  Выберите от куда куда
                </option>
                <option
                    :value="direction.id"
                    v-for="(direction, index) in directions"
                    :key="index"
                >
                  {{ direction.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="w-full lg:w-1/3 md:w-1/2 md:px-3 py-2">
            <label class="block text-sm font-medium text-gray-700">
              Номер телефона | 电话号码 <span class="text-red-600">*</span>
            </label>
            <div class="mt-1 flex">
              <input
                  v-model="order.phone"
                  type="tel"
                  required=""
                  maxlength="5"
                  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                  class="form-control"
              />
            </div>
          </div>

          <div class="tabs px-5">
            <div class="mt-6">
            <span class="block text-xl font-semibold bo-gray-600 mb-4"
            >Добавьте изображение | 添加图像 <span class="text-red-700">*</span></span
            >
              <div class="grid grid-cols-8 gap-5">
                <div class="row-span-2 col-span-2 relative group">
                  <label for="image" class="cursor-pointer"
                  ><img
                      :src="previewImage"
                      class="w-full h-full"
                  /></label>
                  <input type="file" id="image" class="hidden"
                         accept="image/*"
                         ref="image"
                         @change="handleImageUpload"/>
                </div>
              </div>
              <div class="notes-upload mt-9">
                <small class="block mb-3 text-bo-gray-400"
                >Максимальный размер файла не должен превышать 5МБ, формат
                  изображений: .jpg, .jpeg, .png, .gif | 最大文件大小不得超过 5 MB，图片格式：.jpg、.jpeg、.png、.gif</small>
              </div>
            </div>
          </div>

          <div class="w-full px-3 mt-6">
            <label class="block text-sm font-medium text-gray-700">
              Комментарии | 评论
            </label>
            <span class="text-sm text-gray-500"
            >Если у вас есть какое-то описание касательно заявки,
              пожалуйста поставьте свое описание | 如果您有任何有关该应用程序的描述，
               请添加您的描述
            </span>
            <div class="mt-1">
              <textarea v-model="order.comment" class="form-control">
              </textarea>
            </div>
          </div>
        </div>

        <div>
          <d-button
              :loading="loading"
              :disabled="disabled"
              buttonText="Сохранить | 节省"
              classList="rounded bg-bo-primary text-center text-white py-3 px-7 my-5 lg:ml-3 w-full md:w-max hover:bg-bo-primary"
          />
        </div>
      </form>
    </div>


  </div>

</template>

<script>
import Multiselect from 'vue-multiselect';

export default {
  components: {
    Multiselect,
  },

  data() {
    return {
      previewImage: '/img/upload_plus.svg',
      boxes_mode: false,
      boxes_step: 1,
      order: {
        user: null,
        track_code: null,
        weight: null,
        comment: null,
        length: null,
        width: null,
        height: null,
        cost: null,
        cost_china: 0,
        shipping_id: null,
        direction_id: this.$auth.user.direction_id,
        boxes: 1,
        status_id: 1,
        status: '',
        image: null,
      },
      loading: false,
      disabled: false,
      directions: [],
      shippings: [],
      users: [],
    };
  },
  computed: {
    type_delivery() {
      return this.$store.state.dummy.type_delivery;
    }
  },
  watch: {
    'order.shipping_id': function (newValue, oldValue) {
      this.$store.commit('dummy/SET_TYPE_DELIVERY', newValue);
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    handleImageUpload(event) {
      this.image = event.target.files[0];

      // Создаем объект FileReader
      const reader = new FileReader();

      // Устанавливаем обработчик события, который будет вызван после загрузки изображения
      reader.onload = (e) => {
        // Обновляем превью с использованием Data URL изображения
        this.previewImage = e.target.result;
      };

      // Читаем файл как Data URL
      reader.readAsDataURL(this.image);
    },
    // uploadFile(event, type = 'avatar') {
    //   this.loading = true;
    //   this.disabled = true;
    //   if (event.target.files.length > 0) {
    //     let fd = new FormData();
    //     fd.append('file', event.target.files[0]);
    //   }
    // },
    generateCode() {
      let min = Math.ceil(10000000);
      let max = Math.floor(99999999);
      this.order.track_code = String(Math.floor(Math.random() * (max - min + 1)) + min);
    },
    init() {
      if (this.type_delivery) {
        this.order.shipping_id = this.type_delivery;
      }
      this.$axios
      .get('/dashboard/get-data', {
        params: {
          type: [ 'directions', 'shippings', 'users' ],
          isPagination: 0,
        },
      })
      .then((res) => {
        this.directions = res.data.directions;
        this.shippings = res.data.shippings;
        this.users = res.data.users;
      });
    },
    save() {
      const formData = new FormData();

      let any_track =
          this.order.track_code + 'A' + this.order.boxes + '-' + this.boxes_step;

      // if (this.order.user) {
      //   this.order.user_id = this.order.user.id;
      // }
      if (this.order.status) {
        this.order.status_id = this.order.status.id;
      }

      formData.append('track_code', this.order.boxes >= this.boxes_step > 1 ? any_track : this.order.track_code);
      formData.append('weight', this.order.weight);
      formData.append('height', this.order.height);
      formData.append('length', this.order.length);
      formData.append('width', this.order.width);
      formData.append('comment', this.order.comment);
      // formData.append('cost', this.order.cost);
      formData.append('cost_china', this.order.cost_china);
      formData.append('shipping_id', this.order.shipping_id);
      formData.append('direction_id', this.order.direction_id);
      formData.append('boxes', this.order.boxes);
      formData.append('status_id', this.order.status_id);
      formData.append('status', JSON.stringify(this.order.status));

      if (this.image) {
        formData.append('image', this.image);
      }

      this.$axios
      .post('/dashboard/orders', formData)
      .then((res) => {
        this.$swal.fire({
          // icon: 'swal2-success',
          title: 'Успешно',
          text: 'Товар успешно добавлен !',
          showCancelButton: true,
          confirmButtonText: 'Распечатать',
          confirmButtonColor: '#e5b840',
          cancelButtonText: 'Закрыть',
        }).then((result) => {

          if (this.boxes_step == this.order.boxes) {
            if (result.value) {
              this.$router.push({
                path: '/orders/' + res.data.id,
              });
            } else {
              this.$router.push({
                path: '/orders'
              });
            }
          } else {
            this.boxes_step += 1;
            this.boxes_mode = true;
            this.order.weight = null;
          }
        });
      })
      .catch((err) => {
        this.$swal({
          icon: 'erros',
          title: 'Ошибка',
          text: err.response.data.message
              ? err.response.data.message
              : err.response.data[Object.keys(err.response.data)[0]][0],
          timer: 2000,
          timerProgressBar: true,
        });
      });
    },
  },
};
</script>
