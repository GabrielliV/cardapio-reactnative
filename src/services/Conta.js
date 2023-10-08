import api from "./api";

export const finalizarConta = (mesaId) => api.post(`cardapio/contas/finalizar/mesa/${mesaId}`)

export const finalizarContaCod = (cod) => api.post(`cardapio/contas/finalizar/cod/${cod}`)