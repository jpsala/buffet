import {HttpClient, json} from 'aurelia-fetch-client';
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
        if (this._articulos.length === 0) {
            return this
                .http
                .fetch('/buffet_articulos', {
                    method: 'post',
                    crossDomain: true,
                    body: json({grant_type: 'password', username: 'aa', password: 'bb'}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => {
                    if (response.status === 200) {
                        return response;
                    }
                    throw new Error(response.statusText);
                })
                .then(r=>r.data.map((e)=>Object.assign({}, e, {imagenPath: `./images/${e.imagen.trim()}`})))


        } else {
            return new Promise((fulfill)=> {
                console.log('fulfilling! je');
                fulfill(this._articulos);
            });
        }
    }

}