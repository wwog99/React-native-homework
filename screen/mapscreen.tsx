
import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';
import MapView, {Marker, LatLng} from 'react-native-maps'
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import Store from './stores'

@observer
export default class GMap extends Component{
    @observable coord = []
    
    loclist:LatLng [] = []
    state = {
        markerco:{latitude: 36.373761, longitude: 127.360667,},
        init:0,
    };
    marker = (loc:LatLng) => {
        return loc
    }
    @action
    makeMarker = (e:LatLng) =>{
        Store.curloc = e
        this.state.markerco = e
    }

    render(){
        //init Store`s current region
        if(this.state.init === 0){
            Store.Init()
            this.state.init ++
        }
        if(!Store.inputmode){
            return(
                <MapView
                style = {styles.container}
                region = {{
                    latitude:Store.curRegion.latitude,
                    longitude:Store.curRegion.longitude,
                    latitudeDelta:0.005,
                    longitudeDelta:0.005,
                }
                }
                >
                {Store.PlaceList.map(
                    (place:{loc:LatLng, name:string, time:number}, index:number) =>{
                        if (Store.PlaceList.length != 0){
                            const coord:LatLng = {latitude: place.loc.latitude, longitude: place.loc.longitude}
                            return(   
                                <Marker pinColor = 'red' coordinate = {coord} key = {index} />
                            )
                        }                       
                    }
                )}

                </MapView>
            )
        } 
        else{
            return(
                <MapView
                    style = {styles.container}
                >
                    <Marker draggable
                    pinColor = 'green'
                    coordinate = {this.state.markerco}
                    onDragEnd = {(e) =>this.makeMarker(e.nativeEvent.coordinate)}/>
                </MapView>
            )
        }
    }
}


const styles = StyleSheet.create(
    {
      container:{
        flex:1,
      }
    }
)