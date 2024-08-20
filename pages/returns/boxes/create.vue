<template>
  <div class="px-6">
    <div class="w-full py-8">
      <div class="flex items-center justify-between w-full">
        <div class="">
          <h2 class="md:text-3xl text-2xl font-bold text-gray-700 mb-2.5">Добавить | Возврат упаковки</h2>
          <span class="text-gray-800">Процесс возврата упаковки</span>
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
                <p class="mb-2.5 block">Трек код Упаковки<span class="text-red-600">*</span></p> 
                </label>
                <Multiselect placeholder="Возвратить упаковки в склад" tag-placeholder="Выберите упаковки" label="name" track-by="id" v-model="dump_boxes" :closeOnSelect="false" :hideSelected="true" :loading="true" :searchable="true" :options="boxes" :multiple="true" :taggable="true"  @input="selectBoxes" />
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
    <TablesBoxes :boxes="dump_boxes" :loading="loading" :isAction="isAction"/>
  </div>
</template>

<script>

import Multiselect from 'vue-multiselect'

export default {
  components: {
    Multiselect,
  },

  data() {
    return {
      returns: {
        boxes: []
      },
      dump_boxes: [],
      isAction: true,
      loading: false,
      disabled: false,
      boxes: []
    }
  },
  computed: {
    hasBoxes() {
      return this.$store.state.dummy.return_boxes
    }
  },
  mounted() {
   this.init()
  },
  methods: {
    init() {
      if(this.hasBoxes.length != 0) {
        this.dump_boxes = this.hasBoxes
      }
      this.$axios.get('/dashboard/get-data', {
      params: {
        type: ["boxes"],
        statuses: [9],
      }})
      .then(res => {
        this.boxes = res.data.boxes
      })
    },
    save() {
      if(this.hasBoxes != 0) {
        this.returns.boxes = this.hasBoxes.map(o => o.id)
      }
      this.$axios.post('/dashboard/return/boxes', this.returns)
      .then(res=> {
        this.$swal({
          icon: 'success',
          title: 'Успешно',
          text: res.message,
          timer: 2000,
          timerProgressBar: true,
        }).then(res => {
          this.$store.commit('dummy/SET_RETURNS_BOXES', [])
          this.$router.push({
              path: '/returns/boxes'
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
    selectBoxes () {
      this.$store.commit('dummy/SET_RETURNS_BOXES', this.dump_boxes)
      this.returns.boxes = this.dump_boxes.map(box => box.id)
    },
  }
}
</script>
