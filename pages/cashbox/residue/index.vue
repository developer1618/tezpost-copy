<template>
  <div class="px-6">
    <div class="w-full py-8">
      <div class="flex items-center justify-between w-full">
        <div>
          <h2 class="md:text-4xl text-2xl font-bold text-gray-700 mb-2.5">Остаток</h2>
          <span class="text-gray-800">Раздел кассы, ежемесячный остаток</span>
        </div>
      </div>
    </div>
    <TablesCashbox :orders="reports" :loading="loading"/>
  </div>
</template>

<script>

export default {
  head() {
      return {
        title: 'Aistork - Касса - Остаток'
      }
  },
  data() {
    return {
      reports: [],
      loading: true,

    }
  },
  mounted(){
    this.init()
  },
  methods: {
    init() {
      this.$axios.get('/dashboard/remain-orders')
      .then(res=> {
        this.reports = res.data.remain_orders
        this.loading = false
      })
    },
  }
}
</script>
