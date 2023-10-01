import React from 'react';
import { View, Text } from 'react-native';
import { useNavigate } from 'react-router-native';
import Central from './Central';

const Mesas = () => {
  const navigate = useNavigate();

  return (   
    <Central>
      <View>
        <Text>Mesas</Text>
        <Text>Mesas</Text>
        <Text>Mesas</Text>
      </View>
    </Central> 
  );
};

export default Mesas;
