import React, {useState} from 'react';

export const useCarrinhoInfo = () => {
    const [carrinho, setCarrinho] = useState([]);

    const adicionarAoCarrinho = (id, nome, preco) => {
        let novoCarrinho = [...carrinho];
        const index = carrinho.findIndex((item) => item.id === id);
      
        if (index > -1) {
            novoCarrinho[index].quantidade += 1;
            setCarrinho(novoCarrinho);
        } else {     
            const novoItem = { id, nome, preco, quantidade: 1 };
            setCarrinho([...carrinho, novoItem]);
        }
      };

      incrementarItem = (id) => {
        let novoCarrinho = [...carrinho];
        const index = carrinho.findIndex((item) => item.id === id);
      
        if (index > -1) {
            novoCarrinho[index].quantidade += 1;
            setCarrinho(novoCarrinho);
        } 
      };

      decrementarItem = (id) => {
        let novoCarrinho = [...carrinho];
        const index = carrinho.findIndex((item) => item.id === id);

        if (index > -1) {
            if (novoCarrinho[index].quantidade == 1) {
                novoCarrinho.splice(index, 1);
            } else {
                novoCarrinho[index].quantidade -= 1;
            }
            
            setCarrinho(novoCarrinho);
        }
      };

    return {
        carrinho, adicionarAoCarrinho, incrementarItem, decrementarItem
    }
}