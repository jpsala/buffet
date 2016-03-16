import {inject, bindable, containerless} from 'aurelia-framework';
import {CarroService} from '../services/carro';
@inject(CarroService)
export class Articulos {
    @bindable articulos = null;
    carroService;

    constructor(carroService) {
        this.carroService = carroService;
        console.log('const', this.carroService);
    }

    addArticuloToCarrito(articulo, sub) {
        articulo.sub = sub;
        console.log('articulo %O', articulo);
        this.carroService.add(articulo);
    }

}