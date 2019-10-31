import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';

import { observable, action } from 'mobx';
import { observer} from 'mobx-react';
import Store from './stores'
@observer
export default class Addscreen extends Component{
    @observable text: string = ''
    @action
    _getText = (txt:string) => {
        this.text = txt;
    }
    @action
    _getConfirm = ()=> {
        Store.inputmode = false
        Store.AddName(this.text)
        Store.AddDate()
        Store.AddPlace()
        this.forceUpdate()
        this.props.navigation.navigate('Home')
    }
    render(){
        return(
            <View style={styles.container}>
                <View style = {styles.placeholder}>
                    <TextInput
                    style={{height: 40}}
                    placeholder="place name"
                    onChangeText={this._getText}
                    value={this.text}
                    />
                </View>
                <View style = {styles.Endline}>
                    <TouchableOpacity onPress = {() => this._getConfirm()}>
                        <Text style ={{color:'white'}}>Add Place</Text>
                    </TouchableOpacity>
                    
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
      container:{
        flex:1,
        flexDirection: 'column'
      },
      bar:{
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      },
      backimg:{
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 50
      },
      upline:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'flex-start',
      },
      placeholder:{
        height:50,
        flex:1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 5,
        marginLeft: 10,
      },
      Endline:{
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
      }
    }
  )

