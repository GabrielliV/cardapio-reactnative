import api from "./api";

export const listarMesas = (estabelecimentoId) => api.get(`cardapio/mesas/listar/${estabelecimentoId}`)

export const ativaInativaMesa = (mesaId, status) => api.post(`cardapio/mesas/status/mesa/${mesaId}/${status}`)