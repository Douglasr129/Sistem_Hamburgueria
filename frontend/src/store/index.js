import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hamburgers: [],
    juices: [],
    Additionals: [],
    Cesta: [],
    Pedidos: [],
    Pedido: []
  },
  getters: {
    valorTotal(state) {
      return state.Cesta.map(p => p.quantity * p.cust)
        .reduce((total, atual) => total + atual, 0)
    },
    listaCesta(state){
      return state.Cesta
    },
    getPedido(state){
      return state.Pedido
    },
    getPedidos(state){
      return state.Pedidos
    }

  },
  mutations: {
    addCesta(state, payload) {
      let newArray = state.Cesta.filter((item) => item.name == payload.name)
      if (newArray.length == 0) {
        state.Cesta.push(payload)
      } else {
        newArray = state.Cesta.filter((item) => item.name !== payload.name)
        state.Cesta = newArray
        state.Cesta.push(payload)
      }
    },
    limpaCesta(state){
        state.Cesta = []
    },
    limpaPedido(state){
      state.Pedido = []
    },
    carregaPedidos(state, payload) {
      state.Pedidos = payload
    },
    carregaPedido(state, payload) {
      state.Pedido = payload
    },
    carregaCesta(state, payload) {
      state.Cesta = payload
    },
    carregaHamburger(state, payload) {
      state.hamburgers = payload
    },
    carregaJuices(state, payload) {
      state.juices = payload
    },
    carregaAdditionals(state, payload) {
      state.Additionals = payload
    },
    removeCesta(state, payload) {
      let newArray = state.Cesta.filter((item) => item.name !== payload.name)
      state.Cesta = newArray
    }
  }
})
