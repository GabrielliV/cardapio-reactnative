import React, {useState} from 'react';

export const useProdutos = () => {
    const [idCategoria, setIdCategoria] = useState();

    return {
        idCategoria, setIdCategoria
    }
}