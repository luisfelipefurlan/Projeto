import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import MenuScreen from '../screens/MenuScreen';
import CustomScreen from '../screens/CustomScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Começo!',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-happy${focused ? '' : '-outline'}`
          : 'md-happy'
      }
    />
  ),
};

const MenuStack = createStackNavigator({
  Menu: MenuScreen,
});

MenuStack.navigationOptions = {
  tabBarLabel: 'Cardápio',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-book' : 'md-book'}
    />
  ),
};

const CustomStack = createStackNavigator({
  Custom: CustomScreen,
});

CustomStack.navigationOptions = {
  tabBarLabel: 'Do seu jeito',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-thumbs-up' : 'md-thumbs-up'}
    />
  ),
};


export default createBottomTabNavigator({
  HomeStack,
  MenuStack,
  CustomStack,
});
