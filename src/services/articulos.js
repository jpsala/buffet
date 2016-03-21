import {HttpClient, json} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import {Config} from '../config/config.js';
import {Articulo} from '../models/articulo'
import {MdToastService} from 'aurelia-materialize-bridge';
@inject(HttpClient, Config, MdToastService)
export class ArticulosService {
    _articulos = [];

    constructor(http, config, toast) {
        //console.log((new materialize.MdToastService).show('hola'));
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
                .then(r=>r.data.map((e)=>{
                    let articulo = new Articulo;
                    Object.assign(articulo, e);
                    return articulo;
                }))


        } else {
            return new Promise((fulfill)=> {
                fulfill(this._articulos);
            });
        }
    }

}