import React, {useContext, useEffect, useState} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useNavigate } from 'react-router-native';
import { EstabelecimentoContext } from '../../context/EstabelecimentoContext';
import { listarMesas, ativaInativaMesa, criaMesa } from '../../services/Mesas';
import Icon from 'react-native-vector-icons/FontAwesome';
import Central from './Central';

const Mesas = () => {
  const navigate = useNavigate();
  const estabelecimentoInfo = useContext(EstabelecimentoContext);
  const [listMesas, setListMesas] = useState([]);
  const [reloadPage, setReloadPage] = useState(false);
  const [cod, setCod] = useState("");
  const [inputMesa, setInputMesa] = useState("");

  const listaMesas = () => {
    listarMesas(estabelecimentoInfo.id)
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          setListMesas(response.data);
        } else {
          console.error('Nenhuma mesa cadastrada.');
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar mesas:', error);
      });
  };

  useEffect(() => {
    listaMesas();
    const intervalId = setInterval(() => {
      listaMesas();
    }, 10000);
    return () => clearInterval(intervalId);
  }, [reloadPage]);

  useEffect(() => {
    if (reloadPage) {
      setReloadPage(false);
    }
  }, [reloadPage]);

  return (   
    <Central>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.textCod}>Cód.:</Text>
          <TextInput
            style={styles.codInput}
            value={cod}
            onChangeText={setCod}
          />
        
          <TouchableOpacity style={styles.buttonContainer}
            onPress={() => {
              navigate(`/contaCod/${cod}`); 
            }}
          >
            <Icon name="search" style={styles.iconBotao} size={25}/>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.scrollContainer}>
        <FlatList
            data={listMesas}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.itens}>
                <Text style={styles.texto}>Mesa {item.mesa}</Text>
                <Text style={styles.texto}>{item.status}</Text>
                <TouchableOpacity style={styles.botaoVerde}
                  onPress={() => {
                    navigate(`/contaMesa/${item.id}/${item.mesa}`); 
                  }}
                >
                  <Text style={styles.textoBotao}>Ver conta</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botaoAtivo}
                  onPress={() => {
                    ativaInativaMesa(item.id, item.ativo).then(() => {
                      setReloadPage(true);
                    })
                  }}
                  >
                  <Text style={styles.textoBotao}>{item.ativo}</Text>
                </TouchableOpacity>
              </View>
            )}
            extraData={reloadPage}
          />
      </View>
      <View style={styles.barraAdicionar}>
        <View style={styles.inputContainer}>
          <Text style={styles.textMesa}>Mesa</Text>
          <TextInput
            style={styles.mesaInput}
            value={inputMesa}
            onChangeText={setInputMesa}
          />
        
        <TouchableOpacity style={styles.botaoVerde}
          onPress={() => {
            criaMesa(estabelecimentoInfo.id, inputMesa).then(() => {
              setReloadPage(true);
              setInputMesa('');
              })
            }}
          >
          <Text style={styles.textoBotao}>Criar</Text>
        </TouchableOpacity>
        </View>
      </View>
    </Central> 
  );
};

const styles = StyleSheet.create({
  itens: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 23,
    borderColor: '#ccc',
  },
  scrollContainer: {
    maxHeight: 495,
    flex: 0,
  },
  texto: {
    fontSize: 18,
  },
  botaoAtivo: {
    backgroundColor: '#616161',
    paddingVertical: 4,
    borderRadius: 5,
    marginEnd: 10,
    alignSelf: 'flex-end',
    width: 100,
  },
  botaoVerde: {
    backgroundColor: '#3d9467',
    width: 100,
    paddingVertical: 4,
    borderRadius: 5,
  },
  textoBotao: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    marginStart: 23,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textCod: {
    fontSize: 18,
    marginEnd: 10,
  },
  codInput: {
    fontSize: 18,
    width: 220,
    height: 42,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    borderRadius: 5,    
    backgroundColor: '#D9D9D9',
    marginEnd: 8,
  },
  buttonContainer: {
    padding: 10,
    borderRadius: 5,
  },
  iconBotao: {
    color: 'black',
    textAlign: 'center',
  },
  barraAdicionar: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 23,
  },
  textMesa: {
    fontSize: 18,
    marginEnd: 10,
  },
  mesaInput: {
    width: 220,
    height: 42,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    borderRadius: 5,    
    backgroundColor: '#D9D9D9',
    marginEnd: 8,
  },
});

export default Mesas;
