import api from "./api";

export const listarPedidos = (estabelecimentoId) => api.get(`cardapio/pedidos/listar/${estabelecimentoId}`)

export const tempoMedio = (estabelecimentoId) => api.get(`cardapio/pedidos/tempomedio/${estabelecimentoId}`)

export const listarPedido = (id) => api.get(`cardapio/pedidos/pedido/${id}`)

export const finalizar = (pedidoId) => api.post(`cardapio/pedidos/finalizar/${pedidoId}`)