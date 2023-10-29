import React, {useState} from 'react';

export const useCarrinhoInfo = () => {
    const [carrinho, setCarrinho] = useState([]);

    return {
        carrinho, setCarrinho
    }
}