export const state = () => ({
    create_boxes: [],
    create_sends: [],
    create_sortings: [],
    create_receptions: [],
    return_boxes: [],
    return_orders: [],
    type_delivery: null
})

export const mutations = {
    SET_CREATE_BOXES(state, data) {
        state.create_boxes = data
    },
    SET_CREATE_SENDS(state, data) {
        state.create_sends = data
    },
    SET_CREATE_SORTINGS(state, data) {
        state.create_sortings = data
    },
    SET_CREATE_RECEPTIONS(state, data) {
        state.create_receptions = data
    },
    SET_RETURNS_BOXES(state, data) {
        state.return_boxes = data
    },
    SET_RETURNS_ORDERS(state, data) {
        state.return_orders = data
    },
    SET_TYPE_DELIVERY(state, data) {
        state.type_delivery = data
    },
}

