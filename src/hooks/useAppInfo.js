import React, {useState} from 'react';

export const useAppInfo = () => {
    const [mesa, setMesa] = useState();
    const [nomeEstabelecimento, setNomeEstabelecimento] = useState();
    const [id, setId] = useState();

    return {
        mesa, setMesa,
        nomeEstabelecimento, setNomeEstabelecimento,
        id, setId
    }
}
