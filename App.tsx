
import React, { Component} from 'react'
import { createAppContainer } from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import Homescreen from "./screen/Homescreen"
import Addscreen from "./screen/Addscreen"


const RootStack = createStackNavigator(
  {
    Home: Homescreen,
    Add: Addscreen,
  },
  {
    initialRouteName: 'Home',
  }
);


const AppContainer = createAppContainer(RootStack);


export default class App extends Component{
  componentDidMount(){
    setInterval(
      () => 'home'
      ,1000
    )
  }

  render(){
    return (
        <AppContainer/>
    )
  }
}

