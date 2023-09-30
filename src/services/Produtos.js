import api from "./api";

export const produtos = (id_categoria) => api.get(`cardapio/produtos/categoria/${id_categoria}`)