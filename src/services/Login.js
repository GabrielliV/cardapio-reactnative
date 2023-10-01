import api from "./api";

export const loginCliente = (mesa, login, identificador) => api.post(`cardapio/mesas/login/${mesa}`, {
    login,
    identificador
})

export const loginFuncionario = (login, identificador) => api.post(`cardapio/estabelecimentos/login`, {
    login,
    identificador
})