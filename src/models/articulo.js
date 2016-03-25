import {inject, BindingEngine} from 'aurelia-framework';
import {ImagenesService} from './../services/imagenes';
import {Config} from './../config/config'
import {CategoriasService} from './../services/categorias';
@inject(BindingEngine, ImagenesService, CategoriasService)
export class ArticuloModel {
    constructor(bindingEngine, imagenesService, categoriasService) {
        this.bindingEngine = bindingEngine;
        this.imagenesService = imagenesService;
        this.categoriasService = categoriasService;
        this.categoriasService = categoriasService;
    }

    nuevo(articulo = undefined) {
        if (typeof articulo === 'undefined') {
            articulo = {
                id: -1,
                nombre: '',
                precio_venta: null,
                imagen: ''
            }
        }
        return new Articulo(articulo, this.imagenesService.getImages(), this.categoriasService, this.bindingEngine);
    }

    limpia(articulo){
        let articuloListo = {
            id:articulo.id,
            nombre:articulo.nombre,
            precio_venta: articulo.precio_venta,
            categoria_id: articulo.categoria_id,
            imagen: articulo.imagen
        }
        console.log(articuloListo);
        return articuloListo;
    }
}

class Articulo {
    static images = [];
    static categorias = [];

    constructor(articulo, images, categoriasService, bindingEngine) {
        this.categoriasService = categoriasService;
        this.bindingEngine = bindingEngine;
        this.getCategorias();
        Object.assign(this, articulo);
        if (Articulo.images.length === 0) {
            Articulo.images = images;
        }
        this.subscription = this.bindingEngine
            .propertyObserver(this, 'categoria_id')
            .subscribe(val=> this.categoria_id_changed(val));

    }

    categoria_id_changed(val) {
        this.categoria_nombre = Articulo.categorias.find(c=>c.id === val).nombre;
    }

    async getCategorias() {
        if (Articulo.categorias.length === 0) {
            Articulo.categorias = await this.categoriasService.getCategorias();
        }
    }


    get nombreConSub() {
        return ((typeof this.sub === 'undefined') ? this.nombre : `${this.nombre} ${this.sub.nombre}`);
    }

    get precioConSub() {
        return (typeof this.sub === 'undefined') ? this.precio_venta : this.sub.precio_venta;
    }

    get imagenPath() {
        return this.imagen ? `${Config.getUrlImages()}/${this.imagen.trim()}` : null;
    }

    dispose(){
        alert('dispose');
    }
}