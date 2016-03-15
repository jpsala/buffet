import {inject, computedFrom} from 'aurelia-framework';
import {ArticulosService} from './../services/articulos';
import {CarroService} from './../services/carro';
@inject(ArticulosService, CarroService)
export class Menu {
    constructor(articulosService, carroService) {
        this.articulosService = articulosService;
        this.carroService = carroService;
    }

    activate() {
        return this.articulosService.getArticulos().then(r=>this.articulos = r);
    }

}
