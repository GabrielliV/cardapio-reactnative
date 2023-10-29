import React, { useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import { pratosSolicitados } from '../../services/Relatorios';
import Central from './Central';

const Relatorio = () => {
    const { order } = useParams();
    const [listRelatorio, setListRelatorio] = useState([]);

  useEffect(() => {
    pratosSolicitados(order)
      .then((response) => {
        if (response.data) {
            console.log(response.data.content);
            setListRelatorio(response.data.content);
        } else {
            console.error('Nenhuma informação encontrada para o relatório.');
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar relatório:', error);
      });
  }, []);

  return (   
    <Central>
        <View style={styles.container}>
          <Text style={styles.text}>PRATOS {order} SOLICITADOS</Text>
          <Text style={styles.text}>QTDE DE PEDIDOS</Text>
        </View>

        <View>
            <FlatList
                data={listRelatorio}
                keyExtractor={(item) => item.nome}
                renderItem={({ item }) => (
                <View style={styles.listagem}>
                    <Text style={styles.textNome}>{item.nome}</Text>
                    <Text style={styles.textQtde}>{item.qtde}</Text>
                </View>
                )}
            />
        </View>
    </Central> 
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingTop: 40,
    marginBottom: 40,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginEnd: 530,
  },
  listagem: {
    flexDirection: 'row',
    flex: 1,    
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  textNome: {
    fontSize: 20,
    marginEnd: 580,
  },
  textQtde: {
    fontSize: 20,
    textAlign: 'right',
    flex: 1,
  }
});

export default Relatorio;
