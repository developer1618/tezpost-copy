import { wrapFunctional } from './utils'

export { default as DButton } from '../..\\components\\DButton.vue'
export { default as KanbanBadge } from '../..\\components\\kanban\\Badge.vue'
export { default as KanbanTaskCard } from '../..\\components\\kanban\\TaskCard.vue'
export { default as TablesBoxes } from '../..\\components\\Tables\\Boxes.vue'
export { default as TablesCashbox } from '../..\\components\\Tables\\Cashbox.vue'
export { default as TablesOrders } from '../..\\components\\Tables\\Orders.vue'
export { default as TablesPayments } from '../..\\components\\Tables\\Payments.vue'
export { default as TablesReception } from '../..\\components\\Tables\\Reception.vue'
export { default as TablesSends } from '../..\\components\\Tables\\Sends.vue'
export { default as TicketsBoxes } from '../..\\components\\Tickets\\Boxes.vue'
export { default as TicketsOrders } from '../..\\components\\Tickets\\Orders.vue'

export const LazyDButton = import('../..\\components\\DButton.vue' /* webpackChunkName: "components/d-button" */).then(c => wrapFunctional(c.default || c))
export const LazyKanbanBadge = import('../..\\components\\kanban\\Badge.vue' /* webpackChunkName: "components/kanban-badge" */).then(c => wrapFunctional(c.default || c))
export const LazyKanbanTaskCard = import('../..\\components\\kanban\\TaskCard.vue' /* webpackChunkName: "components/kanban-task-card" */).then(c => wrapFunctional(c.default || c))
export const LazyTablesBoxes = import('../..\\components\\Tables\\Boxes.vue' /* webpackChunkName: "components/tables-boxes" */).then(c => wrapFunctional(c.default || c))
export const LazyTablesCashbox = import('../..\\components\\Tables\\Cashbox.vue' /* webpackChunkName: "components/tables-cashbox" */).then(c => wrapFunctional(c.default || c))
export const LazyTablesOrders = import('../..\\components\\Tables\\Orders.vue' /* webpackChunkName: "components/tables-orders" */).then(c => wrapFunctional(c.default || c))
export const LazyTablesPayments = import('../..\\components\\Tables\\Payments.vue' /* webpackChunkName: "components/tables-payments" */).then(c => wrapFunctional(c.default || c))
export const LazyTablesReception = import('../..\\components\\Tables\\Reception.vue' /* webpackChunkName: "components/tables-reception" */).then(c => wrapFunctional(c.default || c))
export const LazyTablesSends = import('../..\\components\\Tables\\Sends.vue' /* webpackChunkName: "components/tables-sends" */).then(c => wrapFunctional(c.default || c))
export const LazyTicketsBoxes = import('../..\\components\\Tickets\\Boxes.vue' /* webpackChunkName: "components/tickets-boxes" */).then(c => wrapFunctional(c.default || c))
export const LazyTicketsOrders = import('../..\\components\\Tickets\\Orders.vue' /* webpackChunkName: "components/tickets-orders" */).then(c => wrapFunctional(c.default || c))
