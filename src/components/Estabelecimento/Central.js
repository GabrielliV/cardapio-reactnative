import React, {useContext, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useNavigate } from 'react-router-native';
import { EstabelecimentoContext } from '../../context/EstabelecimentoContext';
import { Button } from 'react-native-elements';

const Central = ({ children }) => {
  const navigate = useNavigate();
  const estabelecimentoInfo = useContext(EstabelecimentoContext);
  const [modalVisible, setModalVisible] = useState(false);

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
                buttonStyle={styles.modalButton}
              />
              <Button
                title="Não"
                onPress={() => setModalVisible(false)}
                buttonStyle={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.itens}>
        <View style={styles.menu}>
          <TouchableOpacity>
            <Text style={styles.categoria} onPress={() => {
                navigate("/pedidos")
            }}>Pedidos</Text>
          </TouchableOpacity>

          <TouchableOpacity>
          <Text style={styles.categoria} onPress={() => {
                navigate("/mesas")
            }}>Mesas</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.categoria} onPress={() => {
                navigate("/categorias")
            }}>Produtos</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.categoria} onPress={() => {
                navigate("/relatorios")
            }}>Relatórios</Text>
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
    width: 223, // Largura do menu lateral
    backgroundColor: 'black', // Cor de fundo preta do menu lateral
    padding: 30,
  },
  categoria: {
    color: 'white', // Cor do texto das categorias
    fontSize: 22,
    marginTop: 70,
    marginBottom: 50,
    textAlign: 'center',
  },
  conteudo: {
    flex: 1, // Para ocupar o restante do espaço disponível
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
  modalButton: {
    marginTop: 10,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    backgroundColor: '#3d9467',
  },
});

export default Central;