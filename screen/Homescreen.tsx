
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {LatLng} from 'react-native-maps'
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import GMap from './mapscreen'
import Store from './stores'
@observer
export default class Homescreen extends Component{
  @observable open: boolean = false
  @observable input: boolean = false
  state = {Now: new Date().getTime()}
  @action
  _updateOpen = (st:boolean) => {
    this.open = st;
    this.forceUpdate()
  }
  @action
  _updateInput = (st:boolean) =>{
    Store.inputmode = st;
    this.forceUpdate()
  }
  @action
  _IntoAdd = () =>{
    this.props.navigation.navigate('Add')
  }
  @action
  updatecurreg = (loc:LatLng) => {
    Store.curRegion.latitude = loc.latitude
    Store.curRegion.longitude = loc.longitude
    Store.curRegion.latitudeDelta = 0.005
    Store.curRegion.longitudeDelta = 0.005 
  }
  //update by 1 sec
  componentDidMount(){
    setInterval(() =>{
      this.setState({
        Now: new Date().getTime()
      }
      )
    }, 1000 
    )
  }


  render(){
    //Three screen Types in Homescreen
    //1. Home map & list closed
    //2. Input map & list closed
    //3. Home map & list opened
    if (!this.open){ 
      if(!Store.inputmode){
        //list closed && View mode
        return(
          <View style={styles.container}>
            <View style = {styles.googlemap}>
              <GMap/>
              
            </View>
            
            <TouchableOpacity
              style = {
                {backgroundColor: 'red', position:'absolute',
                bottom: 60, right: 10, width: 100, height: 40,
                alignItems: 'center',justifyContent: 'center'
              }}
              onPress = {() => this._updateInput(true)}>
              <Text style = {{color:'white'}}>Add Place</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style = {styles.bar}
              onPress = {() => this._updateOpen(true)}>
              <Text>Open</Text>
            </TouchableOpacity>
          </View> 
          );
        }
      
      //list closed && Input mode
      else{
        return(
          <View style={styles.container}>
            <View style = {styles.googlemap}>
              <GMap/>
            </View>
            <TouchableOpacity
              style = {
                {backgroundColor: 'red', position:'absolute',
                bottom: 60, left: 20, width: 150, height: 40,
                alignItems: 'center',justifyContent: 'center'
              }}
              onPress = {() =>this._IntoAdd()}>
              <Text style = {{color:'white'}}>Add Place</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style = {
                {backgroundColor: "#A9A9A9", position:'absolute',
                bottom: 60, right: 20, width: 150, height: 40,
                alignItems: 'center',justifyContent: 'center'
              }}
              onPress = {() => this._updateInput(false)}>
              <Text style = {{color:'black'}}>Cancel</Text>
            </TouchableOpacity>

            
            <TouchableOpacity style = {styles.bar} onPress = {() => this._updateOpen(true)}>
              <Text>Open</Text>
            </TouchableOpacity>
          </View> 
          );
        }
      }
    else{
      //List Opened(list screen)
      return(
        <View style={styles.container}>
          <View style = {styles.googlemap}>
            <GMap/>
          </View>
          <TouchableOpacity style = {styles.bar} onPress = {() =>this._updateOpen(false)}>
            <Text>Close</Text>
          </TouchableOpacity>
          <View style = {styles.list}>
            
            <ScrollView style = {styles.list}>
                {
                  Store.PlaceList.map(
                  (place:{loc:LatLng, name:string, time:number}) =>{
                    return(
                    <View style = {styles.placelist}>
                      <TouchableOpacity style = {styles.nameText}
                      onPress = {()=> this.updatecurreg(place.loc)}>
                        <Text style = {styles.nameText}>{place.name}</Text>
                      </TouchableOpacity>
                      <View style = {styles.dateText}>
                        <Text style = {styles.dateText}>{
                          parseInt((this.state.Now - place.time)/1000) < 60?
                          parseInt((this.state.Now - place.time)/1000).toString() + " seconds ago":
                          parseInt(parseInt((this.state.Now - place.time)/1000)/60).toString() + " minutes ago"                 
                        }</Text>
                      </View>
                    </View>
                    )
                  }
                )
              }
            </ScrollView>


          </View>
        </View> 
      );
    }
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
      borderBottomWidth:0.2
    },

    googlemap:{
      flex:1,
    },
    list:{
      flex:1,
      backgroundColor: 'white',
    },
    placelist:{
      flex:1,
      height: 30,
      borderBottomWidth:0.2,
      backgroundColor: 'white',
      flexDirection: 'row',
    },
    nameText:{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center',
    },
    dateText:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      fontSize:20
    }

  }
)