import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Alert } from 'react-native';
import { LatLng } from 'react-native-maps';
import {Region} from 'react-native-maps'

@observer
class Store extends Component{
    @observable inputmode: boolean = false
    @observable curRegion: Region
    @observable curloc: LatLng
    @observable curname: string
    @observable curtime: number
    @observable NameList: string [] = []
    @observable DateList = []
    @observable PlaceList = []

    @action
    AddName = (name:string) =>{
        this.curname = name
        this.NameList.push(name)
    }
    @action
    AddDate = ()=>{
        let d = new Date()
        this.curtime = d.getTime()
        this.DateList.push(d.getTime())
    }
    @action
    AddPlace = () =>{
        this.PlaceList.push({
            loc: this.curloc,
            name: this.curname,
            time: this.curtime
        })
    }
    @action
    Init = () =>{
        this.curRegion = {
            latitude: 36.373761,
            longitude: 127.360667,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        }
    }
}
let x = new Date()

export default new Store();