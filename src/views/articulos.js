import {inject, bindable, containerless} from 'aurelia-framework';
import {CarroService} from '../services/carro';
import {ArticulosService} from '../services/articulos';
@inject(CarroService, ArticulosService)
export class Articulos {
    @bindable articulos = null;
    carroService;

    constructor(carroService, articulosService) {
        this.carroService = carroService;
        this.articulosService = articulosService;
    }

    addArticuloToCarrito(articulo, sub) {
        articulo.sub = sub;
        this.carroService.add(articulo);
    }

}