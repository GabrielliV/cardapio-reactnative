import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';
import { useAppInfo } from './src/hooks/useAppInfo';
import { AppContext } from './src/context/AppContext';
import Login from './src/components/Login/Login';
import LoginFuncionario from './src/components/Login/LoginFuncionario'
import Cardapio from './src/components/Cardapio/Cardapio';
import Pedidos from './src/components/Estabelecimento/Pedidos';
import Mesas from './src/components/Estabelecimento/Mesas';
import Produtos from './src/components/Estabelecimento/Produtos';
import Relatorios from './src/components/Estabelecimento/Relatorios';

export default function App() {
  const appInfo = useAppInfo();

  return (
    <NativeRouter>
      <AppContext.Provider value={{mesaApp: appInfo.mesa, nomeEstabelecimentoApp: appInfo.nomeEstabelecimento, idApp: appInfo.id}}>
    <View style={styles.container}>
      <Routes>
        <Route path='/' element={
          <Login setMesaApp={appInfo.setMesa} setNomeEstabelecimentoApp={appInfo.setNomeEstabelecimento} setIdApp={appInfo.setId} />
          } />
        <Route path='/cardapio' Component={Cardapio} />
        <Route path='/loginFuncionario' Component={LoginFuncionario} />
        <Route path='/pedidos' Component={Pedidos} />
        <Route path='/mesas' Component={Mesas} />
        <Route path='/produtos' Component={Produtos} />
        <Route path='/relatorios' Component={Relatorios} />
      </Routes>
    </View>
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
