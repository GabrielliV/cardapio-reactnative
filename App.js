import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';
import Login from './src/components/Login/Login';
import Cardapio from './src/components/Cardapio/Cardapio';
import { useAppInfo } from './src/hooks/useAppInfo';
import { AppContext } from './src/context/AppContext';

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
