import api from "./api";

export const listaProdutos = (id_categoria) => api.get(`cardapio/produtos/categoria/${id_categoria}`)

export const listaTodosProdutos = (id_categoria) => api.get(`cardapio/produtos/lista/categoria/${id_categoria}`)

export const produto = (id) => api.get(`cardapio/produtos/produto/${id}`)

export const ativaInativa = (id, status) => api.post(`cardapio/produtos/status/produto/${id}/${status}`)

export const criaProduto = (nome, descricao, preco, foto, categoriaId) => api.post(`cardapio/produtos/cria/produto`, {
    nome,
    descricao,
    preco,
    foto,
    categoriaId
})

export const alteraProduto = (id, nome, descricao, preco, foto, categoriaId) => api.post(`cardapio/produtos/altera/produto/${id}`, {
    nome,
    descricao,
    preco,
    foto,
    categoriaId
})