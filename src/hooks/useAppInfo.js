import React, {useState} from 'react';

export const useAppInfo = () => {
    const [mesa, setMesa] = useState();
    const [mesaId, setMesaId] = useState();
    const [nomeEstabelecimento, setNomeEstabelecimento] = useState();
    const [id, setId] = useState();

    return {
        mesa, setMesa,
        mesaId, setMesaId,
        nomeEstabelecimento, setNomeEstabelecimento,
        id, setId
    }
}
