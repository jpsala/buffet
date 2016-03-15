import {inject, bindable, containerless} from 'aurelia-framework';
export class Carro {
    @bindable articulos = null;
    constructor(carroService){
    }

}