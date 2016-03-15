import {inject, bindable, containerless} from 'aurelia-framework';
import {CarroService} from '../services/carro';
@inject(CarroService)
export class Articulos {
    @bindable articulos = null;
    constructor(carroService){
        this.carroService=carroService;
    }
    addArticuloToCarrito(articulo) {
        this.carroService.add(articulo);
    }

}