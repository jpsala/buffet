import {inject, bindable, containerless} from 'aurelia-framework';
import {CarroService} from '../services/carro';
@inject(CarroService)
export class Carro {
    @bindable articulos = null;
    constructor(carroService){
        this.carroService = carroService;
    }

    remove(articulo){
        this.carroService.remove(articulo);
    }

}