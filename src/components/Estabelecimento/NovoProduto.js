import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { useParams } from 'react-router-native';
import Central from './Central';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigate } from 'react-router-native';
import { criaProduto, produto, alteraProduto } from '../../services/Produtos';
import * as ImagePicker from 'expo-image-picker';
import { Dropdown } from 'react-native-element-dropdown';

const options = [
    { label: 'Pratos', value: '1' },
    { label: 'Bebidas Alcoólicas', value: '2' },
    { label: 'Outras bebidas', value: '3' },
    { label: 'Sobremesas', value: '4' },
    { label: 'Outros', value: '5' },
];

const NovoProduto = () => {
    const navigate = useNavigate();
    const { id, categoriaId } = useParams();
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
    const [categoria, setCategoria] = useState("");
    const [isFocus, setIsFocus] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [foto, setFoto] = useState('https://img2.freepng.es/20180426/wde/kisspng-computer-icons-photography-deliver-to-home-5ae20efe8d1a86.899608641524764414578.jpg');

    const handleSelectImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
            console.log('Permissão para acessar a galeria de mídia foi negada');
            return;
        }
    
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            base64: true,
        });
    
        if (!result.canceled) {
            const selectedImage = result.assets[0];
            const base64Image = `data:${selectedImage.type};base64,${selectedImage.base64}`;
            setFoto(base64Image);
        }
    };

    const showAndHideMessage = (message) => {
        setShowSuccessMessage(message);
        setTimeout(() => {
          setShowSuccessMessage('');
        }, 3000); // 3000 milissegundos = 3 segundos
    };

    useEffect(() => {
        if (id != null) {
            produto(id).then((response) => {
                setNome(response.data.nome);
                setDescricao(response.data.descricao);
                setPreco(response.data.preco);
                setCategoria(categoriaId);

                if (response.data.foto != null) {
                    setFoto(response.data.foto);
                }
            })
        }
      }, []);

    const formatPriceToSend = (price) => {
        const numericPrice = price.replace(/[^0-9.,]/g, '');

        const formattedPrice = numericPrice.replace(',', '.');

        return formattedPrice;
    };

    const enviarProduto = () => {
        if (id == null) {
            const precoDouble = formatPriceToSend(preco.toString());

            criaProduto(nome, descricao, precoDouble, foto, categoriaId)
            .then((response) => {
                if (response.data) {
                    console.log(response.data);
                    showAndHideMessage('Produto criado com sucesso.');
                    setTimeout(() => {
                        navigate(`/produto/${response.data}`);
                    }, 2000);                        
                } else {
                    console.error('Erro ao listar produto.');  
                }
            })
            .catch((error) => {
                console.error('Erro ao criar produto:', error);
                showAndHideMessage('Erro ao criar produto.');
            });
        } else {
            const precoDouble = formatPriceToSend(preco.toString());

            alteraProduto(id, nome, descricao, precoDouble, foto, categoria)
            .then((response) => {
                if (response.data) {
                    showAndHideMessage('Produto alterado com sucesso.');
                    setTimeout(() => {
                        navigate(`/produto/${id}`);
                    }, 2000);                   
                } else {
                    console.error('Erro ao listar produto.');
                }
            })
            .catch((error) => {
                console.error('Erro ao alterar produto:', error);
                showAndHideMessage('Erro ao alterar produto.');
            });
        }
        
    };

    return (
        <Central>
            <View>
                <View style={styles.container}>
                    <View style={styles.leftColumn}>
                        <Text style={styles.texto}>Nome:</Text>
                        <Text style={styles.texto}>Descrição:</Text>
                        <Text style={styles.texto}>Preço:</Text>
                        <Text style={styles.texto}>Categoria:</Text>
                        <Text style={styles.texto}>Foto:</Text>
                    </View>
                    <View style={styles.rightColumn}>
                        <TextInput
                            style={styles.input}
                            value={nome}
                            onChangeText={setNome}
                        />
                        <TextInput
                            style={styles.input}
                            value={descricao}
                            onChangeText={setDescricao}
                        />
                        <TextInputMask
                            type={'money'}
                            options={{
                                precision: 2,
                                separator: ',',
                                delimiter: '.',
                                unit: 'R$ ',
                            }}
                            style={styles.input}
                            value={preco}
                            onChangeText={(text) => setPreco(text)}
                        />
                         <View>
                            <Dropdown
                                style={[styles.input, isFocus]}
                                data={options}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocus ? 'Select item' : '...'}
                                maxHeight={300}
                                value={categoria}
                                onChange={item => {
                                    setCategoria(item.value);
                                }}
                            />
                        </View>
                        <View style={styles.barraImagem}>
                            {foto && (
                                <Image
                                    source={{ uri: foto }}
                                    style={styles.image}
                                />
                            )}
                            <TouchableOpacity style={styles.botaoImagem}
                                onPress={handleSelectImage}
                            >
                                <Icon name="edit" size={30} color="#3d9467" style={styles.iconeEdit}/>    
                            </TouchableOpacity>
                        </View>
                    </View> 
                </View>
                <View style={styles.containerInferior}>
                        <TouchableOpacity style={styles.botaoSalvar}
                            onPress={() => {
                                enviarProduto()
                            }}
                        >
                            <Text style={styles.textoBotao}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
            </View>
            {showSuccessMessage && (
            <View style={styles.successMessage}>
                <Text style={styles.successText}>{showSuccessMessage}</Text>
            </View>
            )}
        </Central>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
        height: 540,
    },
    leftColumn: {
        flex: 1,
        marginRight: 10,
    },
    rightColumn: {
        flex: 1,
        marginEnd: 200,
        alignItems: 'flex-end',
    },
    texto: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 50,
    },
    input: {
        marginBottom: 35,
        fontSize: 18,
        width: 300,
        height: 42,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 8,
        borderRadius: 5,
        backgroundColor: '#D9D9D9',
        
    },
    listaCategoria: {
        backgroundColor: '#D9D9D9',
        zIndex: 1,
    },
    barraImagem: {
        backgroundColor: '#D9D9D9',
        marginTop: 10,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 5,
        width: 300,
        height: 175,
    },
    image: {
        width: 150,
        height: 150,
        margin: 10,
        borderRadius: 2,        
    },
    iconeEdit: {
        marginTop: 10,
        marginStart: 80,
    },
    containerInferior: {
        flexDirection: 'row',
        marginStart: 20,
    },
    textoDescricao: {
        textAlign: 'right',
        fontSize: 20,
        marginBottom: 25,
    },
    botaoSalvar: {
        backgroundColor: '#3d9467',
        paddingHorizontal: 30,
        paddingVertical: 5,
        borderRadius: 5,
    },
    textoBotao: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },

    // drop
    label: {
        position: 'absolute',
        backgroundColor: '#D9D9D9',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    successMessage: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: 'black',
        padding: 12,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
      successText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },    
});

export default NovoProduto;
