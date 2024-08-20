<template>
  <div class="px-6">
    <div class="w-full py-8">
      <div class="flex items-center justify-between w-full">
        <div class="">
          <h2 class="md:text-4xl text-2xl font-bold text-gray-700 mb-2.5">Добавить | Возврат товара</h2>
          <span class="text-gray-800">Процесс возврата товара</span>
        </div>
        <div class="flex">
          <span onclick="history.back()" class="cursor-pointer d-btn d-btn-primary">
            <svg class="stroke-current text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span>Назад</span>
          </span>
        </div>
      </div>
    </div>
    <div class="w-full my-5">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-4">
        <form @submit.prevent="save">
            <div class="w-full md:px-3 py-2">
              <label class="block text-sm font-medium text-gray-700" id="find-boxes">
                <p class="mb-2.5 block">Трек код товара<span class="text-red-600">*</span></p> 
              </label>
            <Multiselect placeholder="Возвратите товары в склад" tag-placeholder="Выберите товары" label="track_code" track-by="id" v-model="dump_orders" :closeOnSelect="false" :hideSelected="true" :loading="true" :searchable="true" :options="orders" :multiple="true" :taggable="true" @input="selectOrders" />
            </div>
            <div class="md:px-3 w-full">
              <d-button :loading="loading" :disabled="disabled" buttonText="Сохранить" classList="rounded bg-bo-primary text-center text-white py-3 px-7 mt-3 w-full md:w-max hover:bg-bo-primary" />
            </div>
        </form>
      </div>
    </div>
    <div class="my-8">
        <h2 class="md:text-2xl text-xl font-bold text-gray-600 mb-2.5">Просмотр содержимого</h2>
    </div>
    <TablesOrders :orders="dump_orders" :loading="loading" :isAction="isAction"/>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  head() {
    return {
        title: 'Aistork - Возврат товаров'
      }
  },
  components: {
    Multiselect,
  },

  data() {
    return {
      returns: {
        orders: []
      },
      dump_orders: [],
      loading: false,
      disabled: false,
      orders: [],
      isAction: 1
    }
  },
  computed: {
    hasOrders() {
      return this.$store.state.dummy.return_orders
    }
  },
  mounted() {
    this.init()
    
  },
  methods: {
    init() {
      if(this.hasOrders.length != 0) {
        this.dump_orders = this.hasOrders
      }
      this.$axios.get('/dashboard/get-data', {
        params: {
          type: ["orders"],
          statuses: [3],
        }})
      .then(res => {
        this.orders = res.data.orders
      })
    },
    save() {
      if(this.hasOrders != 0) {
        this.returns.orders = this.hasOrders.map(o => o.id)
      }
      this.$axios.post('/dashboard/return/orders', this.returns)
      .then(res=> {
        this.$swal({
          icon: 'success',
          title: 'Успешно',
          text: res.message,
          timer: 2000,
          timerProgressBar: true,
        }).then(res => {
          this.$store.commit('dummy/SET_RETURNS_ORDERS', [])
          this.$router.push({
            path: '/returns/orders'
          })
        })
      })
      .catch(err=> {
        this.$swal({
          icon: 'erros',
          title: 'Ошибка',
          text: err.response.data[Object.keys(err.response.data)[0]][0],
          timer: 2000,
          timerProgressBar: true,
        })
      })
    },
    selectOrders () {
      this.$store.commit('dummy/SET_RETURNS_ORDERS', this.dump_orders)
      this.returns.orders = this.dump_orders.map(o => o.id)
    }
  }
}
</script>
