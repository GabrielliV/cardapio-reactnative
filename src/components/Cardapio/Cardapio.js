import React, { useContext, useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigate, useLocation } from 'react-router-native';
import { AppContext } from '../../context/AppContext';
import { Button } from 'react-native-elements';

const Cardapio = ({ children }) => {
  const navigate = useNavigate();
  const appInfo = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [busca, setBusca] = useState("");
  let [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

  const location = useLocation();

  useEffect(() => {
    if (location && location.state && location.state.categoriaSelecionada) {
      setCategoriaSelecionada(location.state.categoriaSelecionada);
    }

  }, [location]);

  const handleNavigate = () => {
    if (modalVisible) {
      setModalVisible(false);
      navigate("/");
    } else {
      setModalVisible(true);
    }
  };

  const handleMesaPress = () => {
    setModalVisible(true);
  };

  const handleBuscaPress = (busca) => {
    if (busca.trim() === "") {      
      return;
    }

    setCategoriaSelecionada("");
    navigate(`/listaProdutos/null/${busca ? encodeURIComponent(busca) : ''}`);
    setBusca("");
  };

  const handleCategoriaPress = (categoriaId) => {
    setCategoriaSelecionada(categoriaId);
    navigate(`/listaProdutos/${categoriaId}`, { state: { categoriaSelecionada: categoriaId } });
  };

  return (
    <View style={styles.container}>
      <View style={styles.barraSuperior}>
        <View style={styles.barraMesa}>
          <TouchableOpacity onPress={handleMesaPress}>
              <Text style={styles.mesa}>Mesa {appInfo.mesaApp}</Text>
          </TouchableOpacity> 
        </View>
        <View style={styles.barraEstabelecimento}>
          <Text style={styles.nomeEstabelecimento}>{appInfo.nomeEstabelecimentoApp}</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.lupaInput}
            value={busca}
            onChangeText={setBusca}
          />
        
          <TouchableOpacity style={styles.buttonLupa} onPress={() => handleBuscaPress(busca)}>
            <Icon name="search" style={styles.iconLupa} size={22}/>
          </TouchableOpacity>
        </View>
        <View style={styles.divisor}></View>
        <View>               
          <TouchableOpacity style={styles.botaoCarrinho}
            onPress={() => {
              navigate("/carrinho")
          }}
          > 
            <View style={styles.barraCarrinho}>
              <Text style={styles.textCarrinho}>Carrinho</Text>  
              <Icon name="shopping-cart" size={36} color="#3d9467"/> 
            </View>          
          </TouchableOpacity>
        </View>        
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Deseja sair do cardápio?</Text>
            <View style={styles.modalContainerButton}>
              <Button
                title="Sim"
                onPress={handleNavigate}
                buttonStyle={styles.modalButton}
              />
              <Button
                title="Não"
                onPress={() => setModalVisible(false)}
                buttonStyle={styles.modalButtonNao}
              />
            </View>
          </View>
        </View>
      </Modal>

      <View style={[styles.itens, modalVisible && { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => handleCategoriaPress(1)}>
            <Text style={[styles.categoria, categoriaSelecionada === 1 && styles.categoriaSelecionada]}>Pratos</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleCategoriaPress(2)}>
            <Text style={[styles.categoria, categoriaSelecionada === 2 && styles.categoriaSelecionada]}>Bebidas Alcoólicas</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleCategoriaPress(3)}>
            <Text style={[styles.categoria, categoriaSelecionada === 3 && styles.categoriaSelecionada]}>Outras Bebidas</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleCategoriaPress(4)}>
            <Text style={[styles.categoria, categoriaSelecionada === 4 && styles.categoriaSelecionada]}>Sobremesas</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleCategoriaPress(5)}>
            <Text style={[styles.categoria, categoriaSelecionada === 5 && styles.categoriaSelecionada]}>Outros</Text>
          </TouchableOpacity>    
        </View>

        <View style={[styles.conteudo, modalVisible && { backgroundColor: 'rgba(0, 0, 0, 0.3)'}]}>
          {children}
        </View>
      
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {    
    flex: 1,
    flexDirection: 'column',
    width: 1280,
    height: 800,
  },
  itens: {
    flex: 1, 
    flexDirection: 'row',
  },
  barraSuperior: {
    flexDirection: 'row',
    backgroundColor: 'black',
    alignItems: 'center',
    height: 80,
  },
  barraMesa: {
    backgroundColor: '#CD0707',
    width: 223,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mesa: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
  },
  barraEstabelecimento: {
    flex: 1,
  },
  nomeEstabelecimento: {
    paddingLeft: 14,
    fontSize: 22,
    color: 'white',    
    width: 400,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
  },
  lupaInput: {
    fontSize: 18,
    width: 250,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    borderRadius: 5,    
    backgroundColor: 'white',
    marginEnd: 8,
  },
  buttonLupa: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  iconLupa: {
    color: 'white',
    textAlign: 'center',
  },
  divisor: {
    height: 40,
    width: 1,
    backgroundColor: 'white',
    marginEnd: 20,
    marginStart: 15,
  },
  barraCarrinho: {
    flexDirection: 'row',
  },
  textCarrinho: {
    textAlign: 'center',
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    marginEnd: 14,
  },
  botaoCarrinho: {
    justifyContent: 'flex-end',
    marginEnd: 80,
  },
  menu: {
    width: 223,
    backgroundColor: 'black',
    paddingHorizontal: 22,
  },
  categoria: {
    fontSize: 22,
    marginTop: 50,
    marginBottom: 50,
    textAlign: 'center',
    color: 'white',
  },
  categoriaSelecionada: {
    color: '#3d9467',
  },
  conteudo: {
    flex: 1,
    padding: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContainerButton: {
    flexDirection: 'row',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
  modalButton: {
    marginTop: 10,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    backgroundColor: '#CD0707',
  },
  modalButtonNao: {
    marginTop: 10,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    backgroundColor: '#3d9467',
  },
});

export default Cardapio;