import React from 'react';
import { View, Text } from 'react-native';
import { useNavigate } from 'react-router-native';
import Central from './Central';

const Relatorios = () => {
  const navigate = useNavigate();

  return (   
    <Central>
      <View>
        <Text>Relatorios</Text>
        <Text>Relatorios</Text>
        <Text>Relatorios</Text>
      </View>
    </Central> 
  );
};

export default Relatorios;
