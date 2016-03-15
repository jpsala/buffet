import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';
import {Config} from '../config/config.js';
@inject(HttpClient, Config)
export class ArticulosService {
    //url = "http://localhost/iae/?r=api/buffet_articulos";
    _articulos = [];

    constructor(http, config) {
        this.url = `${config.urlApi}/buffet_articulos`;
        this.config = config;
        this.http = http;
        this._articulos = [];
    }

    getArticulos() {
        if(this._articulos.length === 0){
            return this.http.jsonp(`${this.url}`, "callback")
                .then(r=>r.response.map((e)=>Object.assign({},e,{imagenPath:`./images/${e.imagen.trim()}`})))
                .then(r=>this._articulos = r)
        }else{
            return new Promise((fulfill)=>{
                fulfill(this._articulos);
            });
        }
    }

}