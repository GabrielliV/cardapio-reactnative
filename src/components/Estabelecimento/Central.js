import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useNavigate } from 'react-router-native';


const Central = ({ children }) => {
  const navigate = useNavigate();
  //const appInfo = useContext(AppContext);

  return (    
    <View style={styles.container}>
      <View style={styles.barraSuperior}>
      <View style={styles.barraEsquerda}>
        </View>
        <View style={styles.barraEstabelecimento}>
            {/* <Text style={styles.nomeEstabelecimento}>{appInfo.nomeEstabelecimentoApp}</Text> */}
            <Text style={styles.nomeEstabelecimento}>Nome Estabelecimento</Text>
        </View>
        <View style={styles.barraSair}>
          <TouchableOpacity
            onPress={() => {
                navigate("/")
            }}
          >
            <Text style={styles.botaoSair}>SAIR</Text>
          </TouchableOpacity>
        </View>
      </View>

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
                navigate("/produtos")
            }}>Produtos</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.categoria} onPress={() => {
                navigate("/relatorios")
            }}>Relatórios</Text>
          </TouchableOpacity>
          
        </View>

        <View style={styles.conteudo}>
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
    backgroundColor: '#D9D9D9', // Cor de fundo da barra superior
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
//   conteudo: {
//     flex: 1, // Para ocupar o restante do espaço disponível
//     backgroundColor: 'white', // Cor de fundo branca do conteúdo
//     padding: 20,
//   },
});

export default Central;