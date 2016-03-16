import {bindable, inject} from 'aurelia-framework'
import {CarroService} from '../services/carro';
@inject(CarroService)
export class articuloDlg{
    @bindable articulo
    @bindable callback
    constructor(carroService){
        this.carroService = carroService;
    }
}