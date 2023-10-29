import api from "./api";

export const pratosSolicitados = (order) => api.get(`cardapio/itens/relatorio/${order}`)