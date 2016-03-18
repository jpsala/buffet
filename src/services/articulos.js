import {HttpClient, json} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import {Config} from '../config/config.js';
import {Articulo} from '../models/articulo'
@inject(HttpClient, Config)
export class ArticulosService {
    _articulos = [];

    constructor(http, config) {
        this.url = `${config.urlApi}/buffet_articulos`;
        this.config = config;
        this.http = http;
        this._articulos = [];
    }

    getArticulos() {
        if (this._articulos.length === 0) {
            return this
                .http
                .fetch('/articulos')
                //.then((response) => {
                //    if (response.status === 200) {
                //        return response;
                //    }
                //    return {data:[]};
                //
                //})
                .then(r=>r.data.map((e)=>{
                    let articulo = new Articulo;
                    Object.assign(articulo, e, {imagenPath: `./images/${e.imagen.trim()}`});
                    return articulo;
                }))


        } else {
            return new Promise((fulfill)=> {
                fulfill(this._articulos);
            });
        }
    }

}