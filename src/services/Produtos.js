import api from "./api";

export const listaProdutos = (id_categoria) => api.get(`cardapio/produtos/categoria/${id_categoria}`)