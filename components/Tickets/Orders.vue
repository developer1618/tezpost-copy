<template>
    <div id="barcode" class="overflow-hidden hidden w-full">
        <div>
            <div class="flex justify-between py-5 px-5 items-center">
                <h3 class="mb-0 font-bold uppercase">Tezpost</h3>
            </div>
            <div class="px-5 pt-5 pb-8 border-dashed border border-l-0 border-r-0 border-b-4" style="border-color: #E3EBF6;">
                <div class="flex justify-between space-x-5">
                    <div>
                        <small class="font-bold">Трек код:</small>
                        <h3 class="mt-2">{{ order.track_code }}</h3>
                    </div>
                    <div>
                        <small class="font-bold">Доставка в Китае:</small>
                        <h3 class="mt-2 text-right">{{ order.cost_china  }} CNY</h3>
                    </div>
                </div>
                <div class="flex mt-4 justify-between space-x-5">
                    <div>
                        <small class="font-bold">Место:</small>
                        <h3 class="mt-2">1 (шт)</h3>
                    </div>
                    <div>
                        <small class="font-bold">Вес: </small>
                        <h3 class="mt-2">{{ order.weight }} (кг)</h3>
                    </div>
                    <div>
                        <small class="font-bold">Отправлено:</small>
                        <h3 class="mt-2 text-right">{{ order.shipping ? order.shipping.name : '0' }}</h3>
                    </div>
                </div>
            </div>
            <div class="pt-4 px-5">
                <div class="flex justify-between space-x-5">
                    <div>
                        <small class="font-bold">Код клиета:</small>
                        <h3 class="mt-2 capitalize">{{ order.user ? order.user.client_code : '---------'}}</h3>
                    </div>
                    <div>
                        <small class="font-bold">Дата приема:</small>
                        <h3 class="mt-2 capitalize text-right">{{ moment(String(order.created_at)).format('L') }}</h3>
                    </div>
                </div>
                <barcode :value="order.track_code" :height="50" class="flex my-5 px-5 justify-center" />
            </div>
        </div>
    </div>
</template>

<style lang="postcss">
    @media print {
        body * {
            @apply invisible;
        }
        body aside, body nav, body main div.py-8, body main .info_box {
            @apply hidden !important;
        }
        #barcode {
            @apply grid !important;
        }
        #barcode, #barcode * {
            @apply visible;
        }
    }
</style>
<script>
    import VueBarcode from 'vue-barcode';

    import moment from 'moment'
    import 'moment/locale/ru'

    export default {
        components: {
            'barcode': VueBarcode
        },
        data() {
            return {
                moment: moment,
            }
        },
        props: ['order']   
    }
    
</script>