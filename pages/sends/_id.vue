<template>
  <div class="px-6" v-if="send">
    <div class="w-full py-8">
      <div class="flex items-center justify-between w-full">
        <div class="">
          <h2 class="md:text-4xl text-2xl font-bold text-gray-700 mb-2.5">Просмотр ｜ 看法</h2>
          <span class="text-gray-800">Режим просмотр упаковки ｜ 包装查看方式</span>
        </div>
        <div class="flex">
          <span onclick="history.back()" class="cursor-pointer d-btn d-btn-primary">
            <svg class="stroke-current text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span>Назад ｜ 后退</span>
          </span>
        </div>
      </div>
    </div>
    <div class="w-full my-5">
      <div class="bg-white shadow sm:rounded-lg" v-if="send">
        <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 class="flex items-center text-lg leading-6 font-medium text-gray-900">
                <span class="mr-3">Карточка упаковки ｜包装卡: </span>
                <span class="text-yellow-600">{{ send.name }}</span>
            </h3>
            <p class="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
                Персональная карточка для подробной информации. ｜ 个人卡以获取详细信息。
            </p>
        </div>
        <div class="px-4 py-5 sm:p-0 mb-10">
            <dl>
                <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                    <dt class="text-sm leading-5 font-medium text-gray-500">
                        Название ｜ 姓名：
                    </dt>
                    <dd class="mt-1 text-sm leading-5 text-gray-900 font-medium sm:mt-0 sm:col-span-2">
                    {{ send.name }}
                    </dd>
                </div>
                <div class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                    <dt class="text-sm leading-5 font-medium text-gray-500">
                    Место ｜ 地方:
                    </dt>
                    <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                    {{ send.boxes.length }} (шт)
                    </dd>
                </div>
                <div class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                    <dt class="text-sm leading-5 font-medium text-gray-500">
                    Общий вес ｜ 总重量:
                    </dt>
                    <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                    {{ parseInt(send.info.sending.weight + send.info.reception.weight) }} (кг)
                    </dd>
                </div>
<!--                <div class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">-->
<!--                    <dt class="text-sm leading-5 font-medium text-gray-500">-->
<!--                    Общая сумма доставки:-->
<!--                    </dt>-->
<!--                    <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">-->
<!--                    {{ send.info.sending.cost + send.info.reception.cost }} (USD)-->
<!--                    </dd>-->
<!--                </div>-->
                <div class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                    <dt class="text-sm leading-5 font-medium text-gray-500">
                    Общая сумма доставки в китае ｜ 中国境内总运费：
                    </dt>
                    <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                    {{ parseInt(send.info.sending.cost_china + send.info.reception.cost_china) }} (CNY)
                    </dd>
                </div>
                <div class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                    <dt class="text-sm leading-5 font-medium text-gray-500">
                        Статус упаковки ｜ 包装状态：
                    </dt>
                    <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                      <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full whitespace-nowrap"
                          :class="send.status.id == 8 ? 'bg-blue-100 text-blue-800' : 
                          (send.status.id == 9 ? 'bg-yellow-100 text-yellow-800' : 
                          (send.status.id == 11 ? 'bg-yellow-300 text-yellow-800' :'bg-green-100 text-green-800'))">
                          {{ send.status.name }}
                      </span>
                    </dd>
                </div>
                <div class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                    <dt class="text-sm leading-5 font-medium text-gray-500">
                        Дата ｜ 日期 <span class="lowercase">{{ send.status.name }}</span>:
                    </dt>
                    <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ moment(String(send.updated_at)).format('LLL') }}
                    </dd>
                </div>
            </dl>
        </div>
      </div>
    </div>
    <div class="w-full my-5">
      <div class="bg-white shadow sm:rounded-lg" v-if="send">
        <div class="grid grid-cols-1 md:grid-cols-2 divide-x-2">
          <div>
            <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 class="flex items-center text-lg leading-6 font-medium text-gray-900">
                  <span class="mr-1.5">Товаров в ｜ 产品于</span>
                  <span class="text-yellow-600">пути</span>
              </h3>
              <p class="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
                  Данные товаров которые в отправке | 正在运输的货物的详细信息
              </p>
            </div>
          
            <div class="px-4 py-5 sm:p-0 mb-10">
              <dl>
                  <div class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                      <dt class="text-sm leading-5 font-medium text-gray-500">
                      Товаров | 产品:
                      </dt>
                      <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ send.info.sending.orders_total }} (шт)
                      </dd>
                  </div>
<!--                  <div class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">-->
<!--                      <dt class="text-sm leading-5 font-medium text-gray-500">-->
<!--                      Место:-->
<!--                      </dt>-->
<!--                      <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">-->
<!--                      {{ send.info.sending.boxes }} (шт)-->
<!--                      </dd>-->
<!--                  </div>-->
                  <div class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                      <dt class="text-sm leading-5 font-medium text-gray-500">
                        Общий вес | 总重量：
                      </dt>
                      <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ parseInt(send.info.sending.weight) }} (кг)
                      </dd>
                  </div>
<!--                  <div class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">-->
<!--                      <dt class="text-sm leading-5 font-medium text-gray-500">-->
<!--                      Общая сумма доставки:-->
<!--                      </dt>-->
<!--                      <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">-->
<!--                      {{ send.info.sending.cost }} (USD)-->
<!--                      </dd>-->
<!--                  </div>-->
                  <div class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                      <dt class="text-sm leading-5 font-medium text-gray-500">
                        Общая сумма доставки в китае | 中国境内总运费：
                      </dt>
                      <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ send.info.sending.cost_china }} (CNY)
                      </dd>
                  </div>
              </dl>
            </div>
          </div>
          <div>
            <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 class="flex items-center text-lg leading-6 font-medium text-gray-900">
                  <span class="mr-1.5">Товаров | 产品 </span>
                  <span class="text-green-600">в Душанбе | 在杜尚别</span>
              </h3>
              <p class="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
                  Товары которые в прием в душанбе | 杜尚别接受的产品
              </p>
            </div>
          
            <div class="px-4 py-5 sm:p-0 mb-10">
              <dl>
                  <div class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                      <dt class="text-sm leading-5 font-medium text-gray-500">
                      Товаров | 产品:
                      </dt>
                      <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ send.info.reception.orders_total }} (шт)
                      </dd>
                  </div>
<!--                  <div class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">-->
<!--                      <dt class="text-sm leading-5 font-medium text-gray-500">-->
<!--                      Место:-->
<!--                      </dt>-->
<!--                      <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">-->
<!--                      {{ send.info.reception.boxes }} (шт)-->
<!--                      </dd>-->
<!--                  </div>-->
                  <div class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                      <dt class="text-sm leading-5 font-medium text-gray-500">
                      Общий вес | 总重量:
                      </dt>
                      <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ parseInt(send.info.reception.weight) }} (кг)
                      </dd>
                  </div>
<!--                  <div class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">-->
<!--                      <dt class="text-sm leading-5 font-medium text-gray-500">-->
<!--                      Общая сумма доставки:-->
<!--                      </dt>-->
<!--                      <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">-->
<!--                      {{ send.info.reception.cost }} (USD)-->
<!--                      </dd>-->
<!--                  </div>-->
                  <div class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                      <dt class="text-sm leading-5 font-medium text-gray-500">
                        Общая сумма доставки в китае | 中国境内总运费:
                      </dt>
                      <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                      {{ send.info.reception.cost_china }} (CNY)
                      </dd>
                  </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="my-8">
        <h2 class="md:text-2xl text-xl font-bold text-gray-600 mb-2.5">Просмотр содержимого | 查看内容</h2>
    </div>
    
    <TablesBoxes :boxes="boxes" :loading="loading" :isAction="isAction"/>
  </div>
  <div class="flex items-center justify-center flex-1 w-full h-screen" v-else>
        <h1 class="text-2xl text-gray-400 font-medium text-center" v-if="empty">Извините ничего не найдено ... | 不好意思，没有发现什么...</h1>
        <svg v-else class="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </div>
</template>


<script>
import moment from 'moment';
import 'moment/locale/ru'

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
export default {
  components: {
    vSelect
  },

  data() {
    return {
      moment: moment,
      send: null,
      empty: false,
      boxes: [],
      loading: false,
      isAction: true,
      disabled: false,
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init(){
      this.$axios.get(`/dashboard/sends/${this.$route.params.id}`).then(res=> {
        this.send = res.data.send
        this.boxes = res.data.boxes
      })
    },
  }
}
</script>
