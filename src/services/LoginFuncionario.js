import api from "./api";

export const loginFuncionario = (login, identificador) => api.post(`cardapio/estabelecimentos/login`, {
    login,
    identificador
})