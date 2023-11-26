import React, {useContext, useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useNavigate,useLocation } from 'react-router-native';
import { EstabelecimentoContext } from '../../context/EstabelecimentoContext';
import { Button } from 'react-native-elements';

const Central = ({ children }) => {
  const navigate = useNavigate();
  const estabelecimentoInfo = useContext(EstabelecimentoContext);
  const [modalVisible, setModalVisible] = useState(false);  
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

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

  const handleEstabelecimentoPress = () => {
    setModalVisible(true);
  };

  const handleCategoriaPress = (rota) => {
    navigate("/" + rota, { state: { categoriaSelecionada: rota } });
  };

  return (    
    <View style={styles.container}>
      <View style={styles.barraSuperior}>
      <View style={styles.barraEsquerda}>
        </View>
        <View style={styles.barraEstabelecimento}>
            <Text style={styles.nomeEstabelecimento}>{estabelecimentoInfo.nome}</Text>
        </View>
        <View style={styles.barraSair}>
          <TouchableOpacity onPress={handleEstabelecimentoPress}>
            <Text style={styles.botaoSair}>SAIR</Text>
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
                buttonStyle={styles.modalButtonSim}
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

      <View style={styles.itens}>
        <View style={styles.menu}>
        <TouchableOpacity onPress={() => handleCategoriaPress("pedidos")}>
            <Text style={[styles.categoriaMenu, categoriaSelecionada === "pedidos" && styles.categoriaSelecionada]}>
              Pedidos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleCategoriaPress("mesas")}>
            <Text style={[styles.categoriaMenu, categoriaSelecionada === "mesas" && styles.categoriaSelecionada]}>
              Mesas
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleCategoriaPress("categorias")}>
            <Text style={[styles.categoriaMenu, categoriaSelecionada === "categorias" && styles.categoriaSelecionada]}>
              Produtos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleCategoriaPress("relatorios")}>
            <Text style={[styles.categoriaMenu, categoriaSelecionada === "relatorios" && styles.categoriaSelecionada]}>
              Relatórios
            </Text>
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
    height: 80,
    justifyContent: 'space-between',
  },
  barraEsquerda: {
    backgroundColor: '#CD0707',
    width: 223,
    height: 80,
  },
  barraEstabelecimento: {
    justifyContent: 'center',
  },
  nomeEstabelecimento: {
    paddingLeft: 10,
    fontSize: 18,
    color: 'white',
  },
  barraSair: {
    backgroundColor: '#CD0707',
    width: 223,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoSair: {
    textAlign: 'center',
    paddingLeft: 30,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  menu: {
    width: 223,
    backgroundColor: 'black',
    padding: 30,
  },
  categoriaMenu: {
    color: 'white',
    fontSize: 22,
    marginTop: 70,
    marginBottom: 50,
    textAlign: 'center',
  },
  categoriaSelecionada: {
    color: '#3d9467',
  },
  conteudo: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
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
  modalButtonSim: {
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

export default Central;