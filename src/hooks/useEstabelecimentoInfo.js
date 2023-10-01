import React, {useState} from 'react';

export const useEstabelecimentoInfo = () => {
    const [nome, setNome] = useState();
    const [id, setId] = useState();

    return {
        nome, setNome,
        id, setId
    }
}