import {HttpClient, json} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import {ArticuloModel} from '../models/articulo'
import {MdToastService} from 'aurelia-materialize-bridge';
@inject(HttpClient, MdToastService, ArticuloModel)
export class ArticulosService {
    _articulos = [];

    constructor(http, toast, articuloModel) {
        this.http = http;
        this.toast = toast;
        this.articuloModel = articuloModel;
    }

    getArticulos() {
        if (this._articulos.length === 0) {
            return this
                .http
                .fetch('/articulos')
                .then(r=>r.data.map((e)=> {
                    let articulo = this.articuloModel.nuevo(e);
                    // Object.assign(articulo, e);
                    return articulo;
                }))
                .then((a)=> this._articulos = a);
        } else {
            return new Promise((fulfill)=> {
                fulfill(this._articulos);
            });
        }
    }

    save(articulo) {
        return this
            .http
            .fetch('/graba', {
                body: json(articulo)
            })
            .then((r)=>r.id);
    }

    add(articulo) {
        this._articulos.push(articulo);
    }

    del(articulo) {
        console.log(articulo);
        return this
            .http
            .fetch('/del', {
                body: json(articulo)
            })
    }
}