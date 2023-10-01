import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';
import { useAppInfo } from './src/hooks/useAppInfo';
import { useEstabelecimentoInfo } from './src/hooks/useEstabelecimentoInfo';
import { AppContext } from './src/context/AppContext';
import { EstabelecimentoContext } from './src/context/EstabelecimentoContext';
import Login from './src/components/Login/Login';
import LoginFuncionario from './src/components/Login/LoginFuncionario'
import Cardapio from './src/components/Cardapio/Cardapio';
import Pedidos from './src/components/Estabelecimento/Pedidos';
import Mesas from './src/components/Estabelecimento/Mesas';
import Produtos from './src/components/Estabelecimento/Produtos';
import Relatorios from './src/components/Estabelecimento/Relatorios';
import Pedido from './src/components/Estabelecimento/Pedido';

export default function App() {
  const appInfo = useAppInfo();
  const estabelecimentoInfo = useEstabelecimentoInfo();

  return (
    <NativeRouter>
      <AppContext.Provider value={{ mesaApp: appInfo.mesa, nomeEstabelecimentoApp: appInfo.nomeEstabelecimento, idApp: appInfo.id }}>
        <EstabelecimentoContext.Provider value={{ nome: estabelecimentoInfo.nome, id: estabelecimentoInfo.id }}>
          <View style={styles.container}>
            <Routes>
              <Route path='/' element={<Login setMesaApp={appInfo.setMesa} setNomeEstabelecimentoApp={appInfo.setNomeEstabelecimento} setIdApp={appInfo.setId} />} />
              <Route path='/cardapio' element={<Cardapio />} />
              <Route path='/loginFuncionario' element={<LoginFuncionario setNome={estabelecimentoInfo.setNome} setId={estabelecimentoInfo.setId} />} />
              <Route path='/pedidos' element={<Pedidos />} />
              <Route path='/mesas' element={<Mesas />} />
              <Route path='/produtos' element={<Produtos />} />
              <Route path='/relatorios' element={<Relatorios />} />
              <Route path='/pedido/:id' element={<Pedido />} />
            </Routes>
          </View>
        </EstabelecimentoContext.Provider>
      </AppContext.Provider>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
