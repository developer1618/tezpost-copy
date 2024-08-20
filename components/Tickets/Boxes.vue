<template>
    <div id="barcode-box" class="overflow-hidden w-full hidden">
        <div class="barcode-box__content">
            <div class="flex justify-between py-3 px-5 items-center">
                <h3 class="mb-0 font-bold uppercase">Tezpost</h3>
            </div>
            <div class="px-4 py-4 flex-grow">
                <div class="flex justify-between mb-5">
                        <div>
                            <small class="font-bold">Код упаковки</small>
                            <h3 class="mt-2">{{ box.name }}</h3>
                        </div>
                        <div>
                            <small class="font-bold">Место</small>
                            <h3 class="mt-2 text-right">{{ box.orders_count }} (шт)</h3>
                        </div>
                </div>
                <div class="flex justify-between">
                    <div>
                        <small class="font-bold">Общий вес </small>
                        <h3 class="mt-2">{{ parseInt(box.weight) }} (кг)</h3>
                    </div>
                    <div>
                        <small class="font-bold">Дата упаковки</small>
                        <h3 class="mt-2 capitalize text-right">{{ moment(String(box.created_at)).format('L') }}</h3>
                    </div>
                </div>
            </div>
            <div class="py-4 px-3 border-dashed border border-l-3" style="border-color: #E3EBF6;">   
                <barcode :value="box.name" :displayValue="false" :height="50" class="pre-barcode relative w-14" />
            </div>
        </div>    
    </div>
</template>

<style lang="postcss">
    @media print {  
        body * {
            @apply invisible;
        }
        body aside, body nav, body main div.py-8, body main .info_box, body main .info_header {
            @apply hidden !important;
        }
        #barcode-box, #barcode-box * {
            @apply visible;
        }
        #barcode-box {
            @apply grid fixed left-0 top-0 !important;
        }
        #barcode-box .barcode-box__content  {
            @apply flex !important;
        }
        .pre-barcode svg {
            @apply absolute w-max -left-10 top-11 h-10 transform -rotate-90 !important;
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
        props: ['box']   
    }
    
</script>