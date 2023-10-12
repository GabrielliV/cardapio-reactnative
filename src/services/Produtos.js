import api from "./api";

export const listaProdutos = (id_categoria) => api.get(`cardapio/produtos/categoria/${id_categoria}`)

export const produto = (id) => api.get(`cardapio/produtos/produto/${id}`)

export const ativaInativa = (id, status) => api.post(`cardapio/produtos/status/produto/${id},/${status}`)