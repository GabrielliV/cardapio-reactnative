import api from "./api";

export const loginCliente = (mesa, login, identificador) => api.post(`cardapio/mesas/login/${mesa}`, {
    login,
    identificador
})
