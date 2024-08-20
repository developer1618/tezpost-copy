import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6e65dbfe = () => interopDefault(import('..\\pages\\boxes\\index.vue' /* webpackChunkName: "pages/boxes/index" */))
const _0945d1a8 = () => interopDefault(import('..\\pages\\deliveries\\index.vue' /* webpackChunkName: "pages/deliveries/index" */))
const _278bab26 = () => interopDefault(import('..\\pages\\directions\\index.vue' /* webpackChunkName: "pages/directions/index" */))
const _00a796b5 = () => interopDefault(import('..\\pages\\employees\\index.vue' /* webpackChunkName: "pages/employees/index" */))
const _ae3284e2 = () => interopDefault(import('..\\pages\\employer_balance_histories\\index.vue' /* webpackChunkName: "pages/employer_balance_histories/index" */))
const _24c0eebf = () => interopDefault(import('..\\pages\\kanban.vue' /* webpackChunkName: "pages/kanban" */))
const _2c593851 = () => interopDefault(import('..\\pages\\login\\index.vue' /* webpackChunkName: "pages/login/index" */))
const _3bd43475 = () => interopDefault(import('..\\pages\\orders\\index.vue' /* webpackChunkName: "pages/orders/index" */))
const _212a672d = () => interopDefault(import('..\\pages\\payments\\index.vue' /* webpackChunkName: "pages/payments/index" */))
const _a1c0b4b2 = () => interopDefault(import('..\\pages\\posts\\index.vue' /* webpackChunkName: "pages/posts/index" */))
const _0e3655aa = () => interopDefault(import('..\\pages\\reception\\index.vue' /* webpackChunkName: "pages/reception/index" */))
const _4b857c7d = () => interopDefault(import('..\\pages\\roles\\index.vue' /* webpackChunkName: "pages/roles/index" */))
const _7fbdc08f = () => interopDefault(import('..\\pages\\sends\\index.vue' /* webpackChunkName: "pages/sends/index" */))
const _c8f5e496 = () => interopDefault(import('..\\pages\\shippings\\index.vue' /* webpackChunkName: "pages/shippings/index" */))
const _6d286f4c = () => interopDefault(import('..\\pages\\statuses\\index.vue' /* webpackChunkName: "pages/statuses/index" */))
const _d837ded2 = () => interopDefault(import('..\\pages\\top_questions\\index.vue' /* webpackChunkName: "pages/top_questions/index" */))
const _473f9052 = () => interopDefault(import('..\\pages\\users\\index.vue' /* webpackChunkName: "pages/users/index" */))
const _788978dd = () => interopDefault(import('..\\pages\\boxes\\create.vue' /* webpackChunkName: "pages/boxes/create" */))
const _1240b65a = () => interopDefault(import('..\\pages\\cashbox\\expense\\index.vue' /* webpackChunkName: "pages/cashbox/expense/index" */))
const _499fbf0c = () => interopDefault(import('..\\pages\\cashbox\\receipt\\index.vue' /* webpackChunkName: "pages/cashbox/receipt/index" */))
const _278d2747 = () => interopDefault(import('..\\pages\\cashbox\\residue\\index.vue' /* webpackChunkName: "pages/cashbox/residue/index" */))
const _1cc3f750 = () => interopDefault(import('..\\pages\\directions\\create.vue' /* webpackChunkName: "pages/directions/create" */))
const _3bff8aa9 = () => interopDefault(import('..\\pages\\employees\\create.vue' /* webpackChunkName: "pages/employees/create" */))
const _c8b581e2 = () => interopDefault(import('..\\pages\\employer_balance_histories\\create.vue' /* webpackChunkName: "pages/employer_balance_histories/create" */))
const _563d6852 = () => interopDefault(import('..\\pages\\extras\\user-profile.vue' /* webpackChunkName: "pages/extras/user-profile" */))
const _6666a4e9 = () => interopDefault(import('..\\pages\\orders\\create.vue' /* webpackChunkName: "pages/orders/create" */))
const _2bd6c931 = () => interopDefault(import('..\\pages\\payments\\create.vue' /* webpackChunkName: "pages/payments/create" */))
const _5c8959f7 = () => interopDefault(import('..\\pages\\posts\\create.vue' /* webpackChunkName: "pages/posts/create" */))
const _4b6a1af3 = () => interopDefault(import('..\\pages\\reception\\create.vue' /* webpackChunkName: "pages/reception/create" */))
const _3bba8124 = () => interopDefault(import('..\\pages\\returns\\boxes\\index.vue' /* webpackChunkName: "pages/returns/boxes/index" */))
const _2694a9b2 = () => interopDefault(import('..\\pages\\returns\\orders\\index.vue' /* webpackChunkName: "pages/returns/orders/index" */))
const _4cde5de1 = () => interopDefault(import('..\\pages\\roles\\create.vue' /* webpackChunkName: "pages/roles/create" */))
const _c0a2c7e2 = () => interopDefault(import('..\\pages\\sends\\create.vue' /* webpackChunkName: "pages/sends/create" */))
const _065e18ae = () => interopDefault(import('..\\pages\\shippings\\create.vue' /* webpackChunkName: "pages/shippings/create" */))
const _e87ce4b8 = () => interopDefault(import('..\\pages\\statuses\\create.vue' /* webpackChunkName: "pages/statuses/create" */))
const _10524d07 = () => interopDefault(import('..\\pages\\top_questions\\create.vue' /* webpackChunkName: "pages/top_questions/create" */))
const _6f3276a8 = () => interopDefault(import('..\\pages\\users\\create.vue' /* webpackChunkName: "pages/users/create" */))
const _267039b4 = () => interopDefault(import('..\\pages\\warehouse\\reception.vue' /* webpackChunkName: "pages/warehouse/reception" */))
const _1f2ed4a0 = () => interopDefault(import('..\\pages\\warehouse\\residue.vue' /* webpackChunkName: "pages/warehouse/residue" */))
const _63d6b510 = () => interopDefault(import('..\\pages\\warehouse\\shipped.vue' /* webpackChunkName: "pages/warehouse/shipped" */))
const _6349ee1a = () => interopDefault(import('..\\pages\\returns\\boxes\\create.vue' /* webpackChunkName: "pages/returns/boxes/create" */))
const _58965168 = () => interopDefault(import('..\\pages\\returns\\orders\\create.vue' /* webpackChunkName: "pages/returns/orders/create" */))
const _7f29e82e = () => interopDefault(import('..\\pages\\cashbox\\expense\\daily\\_id.vue' /* webpackChunkName: "pages/cashbox/expense/daily/_id" */))
const _51e9ef16 = () => interopDefault(import('..\\pages\\cashbox\\expense\\monthly\\_id.vue' /* webpackChunkName: "pages/cashbox/expense/monthly/_id" */))
const _4d28f5c9 = () => interopDefault(import('..\\pages\\cashbox\\receipt\\daily\\_id.vue' /* webpackChunkName: "pages/cashbox/receipt/daily/_id" */))
const _2bf5fa55 = () => interopDefault(import('..\\pages\\cashbox\\receipt\\monthly\\_id.vue' /* webpackChunkName: "pages/cashbox/receipt/monthly/_id" */))
const _67a3c51f = () => interopDefault(import('..\\pages\\boxes\\edit\\_id.vue' /* webpackChunkName: "pages/boxes/edit/_id" */))
const _4cfa4f6f = () => interopDefault(import('..\\pages\\cashbox\\residue\\_id.vue' /* webpackChunkName: "pages/cashbox/residue/_id" */))
const _b5117878 = () => interopDefault(import('..\\pages\\directions\\edit\\_id.vue' /* webpackChunkName: "pages/directions/edit/_id" */))
const _7084cfd3 = () => interopDefault(import('..\\pages\\employees\\edit\\_id.vue' /* webpackChunkName: "pages/employees/edit/_id" */))
const _36a6e4da = () => interopDefault(import('..\\pages\\orders\\edit\\_id.vue' /* webpackChunkName: "pages/orders/edit/_id" */))
const _14cfd476 = () => interopDefault(import('..\\pages\\posts\\edit\\_id.vue' /* webpackChunkName: "pages/posts/edit/_id" */))
const _aa2adcca = () => interopDefault(import('..\\pages\\roles\\edit\\_id.vue' /* webpackChunkName: "pages/roles/edit/_id" */))
const _7b4306a6 = () => interopDefault(import('..\\pages\\sends\\edit\\_id.vue' /* webpackChunkName: "pages/sends/edit/_id" */))
const _3c62725a = () => interopDefault(import('..\\pages\\shippings\\edit\\_id.vue' /* webpackChunkName: "pages/shippings/edit/_id" */))
const _1a44b210 = () => interopDefault(import('..\\pages\\statuses\\edit\\_id.vue' /* webpackChunkName: "pages/statuses/edit/_id" */))
const _8964ee96 = () => interopDefault(import('..\\pages\\top_questions\\edit\\_id.vue' /* webpackChunkName: "pages/top_questions/edit/_id" */))
const _511cb2f0 = () => interopDefault(import('..\\pages\\users\\edit\\_id.vue' /* webpackChunkName: "pages/users/edit/_id" */))
const _b66cbeae = () => interopDefault(import('..\\pages\\boxes\\_id.vue' /* webpackChunkName: "pages/boxes/_id" */))
const _23ec1e10 = () => interopDefault(import('..\\pages\\deliveries\\_id.vue' /* webpackChunkName: "pages/deliveries/_id" */))
const _0325c25d = () => interopDefault(import('..\\pages\\employees\\_id.vue' /* webpackChunkName: "pages/employees/_id" */))
const _4a565092 = () => interopDefault(import('..\\pages\\employer_balance_histories\\_id.vue' /* webpackChunkName: "pages/employer_balance_histories/_id" */))
const _af425fc6 = () => interopDefault(import('..\\pages\\orders\\_id.vue' /* webpackChunkName: "pages/orders/_id" */))
const _66db5e56 = () => interopDefault(import('..\\pages\\payments\\_id.vue' /* webpackChunkName: "pages/payments/_id" */))
const _71909ab7 = () => interopDefault(import('..\\pages\\sends\\_id.vue' /* webpackChunkName: "pages/sends/_id" */))
const _7c6cd80c = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/boxes",
    component: _6e65dbfe,
    name: "boxes"
  }, {
    path: "/deliveries",
    component: _0945d1a8,
    name: "deliveries"
  }, {
    path: "/directions",
    component: _278bab26,
    name: "directions"
  }, {
    path: "/employees",
    component: _00a796b5,
    name: "employees"
  }, {
    path: "/employer_balance_histories",
    component: _ae3284e2,
    name: "employer_balance_histories"
  }, {
    path: "/kanban",
    component: _24c0eebf,
    name: "kanban"
  }, {
    path: "/login",
    component: _2c593851,
    name: "login"
  }, {
    path: "/orders",
    component: _3bd43475,
    name: "orders"
  }, {
    path: "/payments",
    component: _212a672d,
    name: "payments"
  }, {
    path: "/posts",
    component: _a1c0b4b2,
    name: "posts"
  }, {
    path: "/reception",
    component: _0e3655aa,
    name: "reception"
  }, {
    path: "/roles",
    component: _4b857c7d,
    name: "roles"
  }, {
    path: "/sends",
    component: _7fbdc08f,
    name: "sends"
  }, {
    path: "/shippings",
    component: _c8f5e496,
    name: "shippings"
  }, {
    path: "/statuses",
    component: _6d286f4c,
    name: "statuses"
  }, {
    path: "/top_questions",
    component: _d837ded2,
    name: "top_questions"
  }, {
    path: "/users",
    component: _473f9052,
    name: "users"
  }, {
    path: "/boxes/create",
    component: _788978dd,
    name: "boxes-create"
  }, {
    path: "/cashbox/expense",
    component: _1240b65a,
    name: "cashbox-expense"
  }, {
    path: "/cashbox/receipt",
    component: _499fbf0c,
    name: "cashbox-receipt"
  }, {
    path: "/cashbox/residue",
    component: _278d2747,
    name: "cashbox-residue"
  }, {
    path: "/directions/create",
    component: _1cc3f750,
    name: "directions-create"
  }, {
    path: "/employees/create",
    component: _3bff8aa9,
    name: "employees-create"
  }, {
    path: "/employer_balance_histories/create",
    component: _c8b581e2,
    name: "employer_balance_histories-create"
  }, {
    path: "/extras/user-profile",
    component: _563d6852,
    name: "extras-user-profile"
  }, {
    path: "/orders/create",
    component: _6666a4e9,
    name: "orders-create"
  }, {
    path: "/payments/create",
    component: _2bd6c931,
    name: "payments-create"
  }, {
    path: "/posts/create",
    component: _5c8959f7,
    name: "posts-create"
  }, {
    path: "/reception/create",
    component: _4b6a1af3,
    name: "reception-create"
  }, {
    path: "/returns/boxes",
    component: _3bba8124,
    name: "returns-boxes"
  }, {
    path: "/returns/orders",
    component: _2694a9b2,
    name: "returns-orders"
  }, {
    path: "/roles/create",
    component: _4cde5de1,
    name: "roles-create"
  }, {
    path: "/sends/create",
    component: _c0a2c7e2,
    name: "sends-create"
  }, {
    path: "/shippings/create",
    component: _065e18ae,
    name: "shippings-create"
  }, {
    path: "/statuses/create",
    component: _e87ce4b8,
    name: "statuses-create"
  }, {
    path: "/top_questions/create",
    component: _10524d07,
    name: "top_questions-create"
  }, {
    path: "/users/create",
    component: _6f3276a8,
    name: "users-create"
  }, {
    path: "/warehouse/reception",
    component: _267039b4,
    name: "warehouse-reception"
  }, {
    path: "/warehouse/residue",
    component: _1f2ed4a0,
    name: "warehouse-residue"
  }, {
    path: "/warehouse/shipped",
    component: _63d6b510,
    name: "warehouse-shipped"
  }, {
    path: "/returns/boxes/create",
    component: _6349ee1a,
    name: "returns-boxes-create"
  }, {
    path: "/returns/orders/create",
    component: _58965168,
    name: "returns-orders-create"
  }, {
    path: "/cashbox/expense/daily/:id?",
    component: _7f29e82e,
    name: "cashbox-expense-daily-id"
  }, {
    path: "/cashbox/expense/monthly/:id?",
    component: _51e9ef16,
    name: "cashbox-expense-monthly-id"
  }, {
    path: "/cashbox/receipt/daily/:id?",
    component: _4d28f5c9,
    name: "cashbox-receipt-daily-id"
  }, {
    path: "/cashbox/receipt/monthly/:id?",
    component: _2bf5fa55,
    name: "cashbox-receipt-monthly-id"
  }, {
    path: "/boxes/edit/:id?",
    component: _67a3c51f,
    name: "boxes-edit-id"
  }, {
    path: "/cashbox/residue/:id",
    component: _4cfa4f6f,
    name: "cashbox-residue-id"
  }, {
    path: "/directions/edit/:id?",
    component: _b5117878,
    name: "directions-edit-id"
  }, {
    path: "/employees/edit/:id?",
    component: _7084cfd3,
    name: "employees-edit-id"
  }, {
    path: "/orders/edit/:id?",
    component: _36a6e4da,
    name: "orders-edit-id"
  }, {
    path: "/posts/edit/:id?",
    component: _14cfd476,
    name: "posts-edit-id"
  }, {
    path: "/roles/edit/:id?",
    component: _aa2adcca,
    name: "roles-edit-id"
  }, {
    path: "/sends/edit/:id?",
    component: _7b4306a6,
    name: "sends-edit-id"
  }, {
    path: "/shippings/edit/:id?",
    component: _3c62725a,
    name: "shippings-edit-id"
  }, {
    path: "/statuses/edit/:id?",
    component: _1a44b210,
    name: "statuses-edit-id"
  }, {
    path: "/top_questions/edit/:id?",
    component: _8964ee96,
    name: "top_questions-edit-id"
  }, {
    path: "/users/edit/:id?",
    component: _511cb2f0,
    name: "users-edit-id"
  }, {
    path: "/boxes/:id",
    component: _b66cbeae,
    name: "boxes-id"
  }, {
    path: "/deliveries/:id",
    component: _23ec1e10,
    name: "deliveries-id"
  }, {
    path: "/employees/:id",
    component: _0325c25d,
    name: "employees-id"
  }, {
    path: "/employer_balance_histories/:id",
    component: _4a565092,
    name: "employer_balance_histories-id"
  }, {
    path: "/orders/:id",
    component: _af425fc6,
    name: "orders-id"
  }, {
    path: "/payments/:id",
    component: _66db5e56,
    name: "payments-id"
  }, {
    path: "/sends/:id",
    component: _71909ab7,
    name: "sends-id"
  }, {
    path: "/",
    component: _7c6cd80c,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
