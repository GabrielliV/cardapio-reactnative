import React, { useContext, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import Cardapio from './Cardapio';
import { CarrinhoContext } from '../../context/CarrinhoContext';

const Carrinho = () => {
    const { carrinho } = useContext(CarrinhoContext);
    const [inputCod, setInputCod] = useState("");
    const [inputObs, setInputObs] = useState("");

    return (   
        <Cardapio>
            <View style={styles.container}>
                <View style={styles.cabecalho}>
                    <Text style={styles.labelDireita}>PRODUTO</Text>
                    <Text style={styles.label}>VALOR UNITÁRIO</Text>
                    <Text style={styles.label}>QTDE</Text>
                </View>
                <FlatList
                    data={carrinho}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.itemCarrinho}>
                            <Text>{item.nome}</Text>
                            <Text>{item.quantidade}</Text>
                            <Text>R$ {item.preco.toFixed(2).replace('.', ',')}</Text>
                        </View>
                    )}
                />
            </View>
            <View style={styles.containerInferior}>
                <View style={styles.containerInferiorE}>
                    <View style={styles.containerCod}>
                        <Text style={styles.cod}>Cód.</Text>
                        <TextInput
                            style={styles.codInput}
                            value={inputCod}
                            onChangeText={setInputCod}
                        />                
                    </View>
                    <View style={styles.containerObs}>
                        <Text>* Inclua seu código de acesso da comanda</Text>
                        <Text style={styles.obs}>Observação</Text>
                        <TextInput
                            style={styles.obsInput}
                            value={inputObs}
                            onChangeText={setInputObs}
                        />
                    </View>
                </View>
                <View style={styles.containerInferiorD}>
                    <Text style={styles.total}>Total: R$ 0,00</Text>
                    <TouchableOpacity style={styles.botaoPedir}>
                        <Text style={styles.textoBotao}>PEDIR</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Cardapio>
    )
};

const styles = StyleSheet.create({
    container: {   
        backgroundColor: 'black', 
        flexDirection: 'row',
        borderRadius: 5,
        height: 400,
    },
    cabecalho: {
        flexDirection: 'row',
        padding: 23,
        justifyContent: 'space-between',
        marginLeft: 30,
    },
    labelDireita: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginRight: 380,
    },
    label: {    
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginRight: 150,
    },
    containerInferior: {
        flex: 1,
        flexDirection: 'row',
    },
    containerInferiorE: {
        height: 500,
        width: 600,
    },
    containerInferiorD: {
        height: 500,
        width: 400,
        flexDirection: 'column',
    },
    containerCod: {
        flexDirection: 'row',
        marginLeft: 10,
    },
    cod: {
        marginTop: 15,
        fontSize: 18,
        marginRight: 10,
        fontWeight: 'bold',
    },
    codInput: {
        marginTop: 10,
        width: 220,
        height: 38,
        fontSize: 18,
        padding: 8,
        borderRadius: 5,    
        backgroundColor: 'black',
        marginEnd: 8,
        color: 'white',
    },
    containerObs: {
        flexDirection: 'column',
        marginLeft: 10,
    },
    obs: {
        marginTop: 25,
        fontSize: 18,
        marginRight: 10,
        fontWeight: 'bold',
    },
    obsInput: {
        marginTop: 10,
        width: 450,
        height: 100,
        fontSize: 16,
        padding: 8,
        borderRadius: 5,    
        backgroundColor: 'black',
        marginEnd: 8,
        color: 'white',
    },
    total: {
        fontSize: 18,
        marginLeft: 30,
        marginTop: 140,
        fontWeight: 'bold',
    },
    botaoPedir: {
        backgroundColor: '#3d9467',
        marginLeft: 30,
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        width: 240,
        
    },
    textoBotao: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    }
}); 


export default Carrinho;