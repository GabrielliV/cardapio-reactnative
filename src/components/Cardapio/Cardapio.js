import React, { useContext} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigate } from 'react-router-native';
import { AppContext } from '../../context/AppContext';


const Cardapio = ({ children }) => {
  const navigate = useNavigate();
  const appInfo = useContext(AppContext);

  return (
    <View style={styles.container}>
      <View style={styles.barraSuperior}>
        <View style={styles.barraMesa}>
            <Text style={styles.mesa}>Mesa {appInfo.mesaApp}</Text>
        </View>
        <View >
            <Text style={styles.nomeEstabelecimento}>{appInfo.nomeEstabelecimentoApp}</Text>
        </View>
        <View style={styles.barraBusca}>            
          <TouchableOpacity style={styles.botaoBusca}>   
            <Icon name="search" size={25} color="white"/>         
          </TouchableOpacity>
        </View>
        <View style={styles.barraCarrinho}>                      
          <TouchableOpacity style={styles.botaoCarrinho}
            onPress={() => {
              navigate("/carrinho")
          }}
          > 
            <Icon name="shopping-cart" size={30} color="white"/>           
          </TouchableOpacity>
        </View>
        <View style={styles.barraSair}>
          <TouchableOpacity
            onPress={() => {
                navigate("/")
            }}
          >
            <Icon name="close" size={25} color="black"/>    
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.itens}>
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => navigate("/listaProdutos/1")}>
            <Text style={styles.categoria}>Pratos</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigate("/listaProdutos/2")}>
          <Text style={styles.categoria}>Bebidas Alcoólicas</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigate("/listaProdutos/3")}>
            <Text style={styles.categoria}>Bebidas Não Alcoólicas</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigate("/listaProdutos/4")}>
            <Text style={styles.categoria}>Sobremesas</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigate("/listaProdutos/5")}>
            <Text style={styles.categoria}>Outros</Text>
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
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    height: 80,
  },
  barraMesa: {
    backgroundColor: '#CD0707',
    width: 223,
    height: 80,
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
  },
  mesa: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
  },
  barraEstabelecimento: {
    width: 200,
  },
  nomeEstabelecimento: {
    paddingLeft: 14,
    paddingRight:300,
    fontSize: 18,
  },
  buscar: {
    fontSize: 18,
    color: 'white',
  },
  barraBusca: {
    backgroundColor: 'black',
    width: 280,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carrinho: {
    fontSize: 18,
    color: 'white',
  },
  barraCarrinho: {
    backgroundColor: '#CD0707',
    width: 280,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  barraSair: {
    alignSelf: 'flex',
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    width: 223,
    backgroundColor: 'black',
    padding: 20,
  },
  categoria: {
    color: 'white',
    fontSize: 22,
    marginTop: 50,
    marginBottom: 50,
    textAlign: 'center',
  },
  conteudo: {
    flex: 1,
    padding: 20,
  },
});

export default Cardapio;