import {inject, bindable, containerless} from 'aurelia-framework';
import {CarroService} from '../services/carro';
@inject(CarroService)
export class Articulos {
    @bindable articulos = null;
    carroService;

    constructor(carroService) {
        this.carroService = carroService;
    }

    addArticuloToCarrito(articulo, sub) {
        articulo.sub = sub;
        this.carroService.add(articulo);
    }

}