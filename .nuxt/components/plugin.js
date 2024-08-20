import Vue from 'vue'
import { wrapFunctional } from './utils'

const components = {
  DButton: () => import('../..\\components\\DButton.vue' /* webpackChunkName: "components/d-button" */).then(c => wrapFunctional(c.default || c)),
  KanbanBadge: () => import('../..\\components\\kanban\\Badge.vue' /* webpackChunkName: "components/kanban-badge" */).then(c => wrapFunctional(c.default || c)),
  KanbanTaskCard: () => import('../..\\components\\kanban\\TaskCard.vue' /* webpackChunkName: "components/kanban-task-card" */).then(c => wrapFunctional(c.default || c)),
  TablesBoxes: () => import('../..\\components\\Tables\\Boxes.vue' /* webpackChunkName: "components/tables-boxes" */).then(c => wrapFunctional(c.default || c)),
  TablesCashbox: () => import('../..\\components\\Tables\\Cashbox.vue' /* webpackChunkName: "components/tables-cashbox" */).then(c => wrapFunctional(c.default || c)),
  TablesOrders: () => import('../..\\components\\Tables\\Orders.vue' /* webpackChunkName: "components/tables-orders" */).then(c => wrapFunctional(c.default || c)),
  TablesPayments: () => import('../..\\components\\Tables\\Payments.vue' /* webpackChunkName: "components/tables-payments" */).then(c => wrapFunctional(c.default || c)),
  TablesReception: () => import('../..\\components\\Tables\\Reception.vue' /* webpackChunkName: "components/tables-reception" */).then(c => wrapFunctional(c.default || c)),
  TablesSends: () => import('../..\\components\\Tables\\Sends.vue' /* webpackChunkName: "components/tables-sends" */).then(c => wrapFunctional(c.default || c)),
  TicketsBoxes: () => import('../..\\components\\Tickets\\Boxes.vue' /* webpackChunkName: "components/tickets-boxes" */).then(c => wrapFunctional(c.default || c)),
  TicketsOrders: () => import('../..\\components\\Tickets\\Orders.vue' /* webpackChunkName: "components/tickets-orders" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
