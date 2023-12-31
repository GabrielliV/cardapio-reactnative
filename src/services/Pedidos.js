import api from "./api";

export const listarPedidos = (estabelecimentoId) => api.get(`cardapio/pedidos/listar/${estabelecimentoId}`)

export const tempoMedio = (estabelecimentoId) => api.get(`cardapio/pedidos/tempomedio/${estabelecimentoId}`)

export const listarPedido = (id) => api.get(`cardapio/pedidos/pedido/${id}`)

export const listarPedidoMesa = (mesaId) => api.get(`cardapio/pedidos/mesa/${mesaId}`)

export const listarPedidoCod = (cod) => api.get(`cardapio/pedidos/cod/${cod}`)

export const finalizar = (pedidoId) => api.post(`cardapio/pedidos/finalizar/${pedidoId}`)

export const solicitarPedido = (mesaId, cod, observacao, listaPedidos) => api.post(`cardapio/pedidos/solicitar`, {
    mesaId,
    cod,
    observacao,
    pedidoItem: listaPedidos.map(item => ({
        produtoId: item.produtoId,
        qtde: item.qtde
    }))
})