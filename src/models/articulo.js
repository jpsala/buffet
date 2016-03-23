import {inject, computedFrom} from 'aurelia-framework';
import {ImagenesService} from './../services/imagenes';
import {Config} from './../config/config'
@inject(ImagenesService)
export class ArticuloModel {
    images = [];

    constructor(imagenesService) {
        this.imagenesService = imagenesService;
        this.init();
    }

    init() {
        return this.imagenesService.getImages().then((images)=> {
            return this.images = images;
        });
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
        return new Articulo(articulo, this.images);
    }

}

class Articulo {
    static images = undefined;

    get nombreConSub() {
        return ((typeof this.sub === 'undefined') ? this.nombre : `${this.nombre} ${this.sub.nombre}`);
    }

    get precioConSub() {
        return (typeof this.sub === 'undefined') ? this.precio_venta : this.sub.precio_venta;
    }

    get imagenPath() {
        return this.imagen.trim() ? `${Config.getUrlImages()}/${this.imagen.trim()}` : null;
    }

    constructor(articulo, images) {
        Object.assign(this, articulo);
        Articulo.images = images;
    }

}