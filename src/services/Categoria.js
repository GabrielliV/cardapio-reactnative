import api from "./api";

export const listaCategorias = () => api.get(`cardapio/categorias/listar`)