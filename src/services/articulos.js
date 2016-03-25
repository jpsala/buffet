import {HttpClient, json} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import {ArticuloModel} from '../models/articulo'
import {MdToastService} from 'aurelia-materialize-bridge';
import {CategoriasService} from '../services/categorias';
@inject(HttpClient, MdToastService, ArticuloModel, CategoriasService)
export class ArticulosService {
    _articulos = [];
    categoria = 'Todos';

    constructor(http, toast, articuloModel, categoriasService) {
        this.http = http;
        this.toast = toast;
        this.articuloModel = articuloModel;
        this.categoriasService = categoriasService;
    }

    async getArticulos() {
        if (this._articulos.length === 0) {
            return await this
                .http
                .fetch('/articulos')
                .then(r=>r.data.map((e)=> {
                    let articulo = this.articuloModel.nuevo(e);
                    console.log(articulo);
                    // Object.assign(articulo, e);
                    return articulo;
                }))
                .then((a)=> this._articulos = a);
        } else {
            return await new Promise((fulfill)=> {
                fulfill(this._articulos);
            });
        }
    }

    async getArticulosFiltrados(categoria_id) {
        if (categoria_id) {
            this.categoria = await this.categoriasService.getCategoriaPorID(categoria_id);
            console.log(this.categoria);
        } else {
            this.categoria = 'Todos';
        }
        if (!categoria_id)
            return this.getArticulos();

        let articulos = this.getArticulos().then(articulos=> {
            return articulos.filter((a) => {
                return a.categoria_id === categoria_id;
            })
        })
        return articulos || [];
    }

    save(articulo) {
        let artParaGrabar = this.articuloModel.limpia(articulo);
        return this
            .http
            .fetch('/graba', {
                body: json(artParaGrabar)
            })
            .then(r => r.id);
    }

    add(articulo) {
        this._articulos.push(articulo);
    }

    del(articulo) {
        let artParaGrabar = this.articuloModel.limpia(articulo);
        return this
            .http
            .fetch('/del', {
                body: json(artParaGrabar)
            })
    }
}