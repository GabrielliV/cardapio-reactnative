import React from 'react';
import { View, Text } from 'react-native';
import { useNavigate } from 'react-router-native';
import Central from './Central';

const Produtos = () => {
  const navigate = useNavigate();

  return (   
    <Central>
      <View>
        <Text>Produtos</Text>
        <Text>Produtos</Text>
        <Text>Produtos</Text>
      </View>
    </Central> 
  );
};

export default Produtos;
