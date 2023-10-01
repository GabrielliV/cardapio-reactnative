import React from 'react';
import { View, Text } from 'react-native';
import { useNavigate } from 'react-router-native';
import Central from './Central';

const Pedidos = () => {
  const navigate = useNavigate();

  return (   
    <Central>
      <View>
        <Text>Pedidos</Text>
        <Text>Pedidos</Text>
        <Text>Pedidos</Text>
      </View>
    </Central> 
  );
};

export default Pedidos;
