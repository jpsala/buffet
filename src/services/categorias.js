import {HttpClient, json} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import {MdToastService} from 'aurelia-materialize-bridge';
import {Config} from './../config/config'
@inject(HttpClient, MdToastService)
export class CategoriasService {
    _categorias = [];

    constructor(http, toast) {
        this.http = http;
        this.toast = toast;
    }

    getCategorias() {
        if (this._categorias.length === 0) {
            return this
                .http
                .fetch('/categorias')
                .then(r=>r.data.map((e)=> {
                    e.imagenPath = e.imagen.trim() ? `${Config.getUrlImages()}/${e.imagen.trim()}` : null;
                    return e;
                }))
                .then(a => this._categorias = a);
        } else {
            return new Promise((fulfill) => {
                fulfill(this._categorias);
            });
        }
    }

    async getCategoriaPorID(categoria_id) {
        console.log('getCategoriaPorID %O', categoria_id);
        let categoria = categoria_id ?
            (await this.getCategorias()).find(categoria=>categoria.id === categoria_id) :
            {id:-1,nombre:'Todos', imagen:false};

        return categoria;
    }

    save(categoria) {
        return this
            .http
            .fetch('/grabaCategoria', {
                body: json(categoria)
            })
            .then((r)=>r.id);
    }

    add(categoria) {
        this._categorias.push(categoria);
    }

    del(categoria) {
        return this
            .http
            .fetch('/delCategoria', {
                body: json(categoria)
            })
    }
}