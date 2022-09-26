import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Account from '../Account/Account';
import Match from '../Match/Match'
import { StackActions } from '@react-navigation/native';
import React, { useState } from 'react'
import { CommonActions } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export function MainTab({ navigation, route }) {
    console.log("aaaaaaaaaaa", route);
    return (
        <Tab.Navigator backBehaviour="initialRoute" screenOptions={{
            headerShown: false
        }}>
            <Tab.Screen name="Account" component={Account} initialParams={route.params.user} />
            <Tab.Screen name="Match" component={Match} initialParams={route.params.user} />
        </Tab.Navigator>
    );
}