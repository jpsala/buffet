import {inject, computedFrom} from 'aurelia-framework';
import {ArticulosService} from './../services/articulos';
@inject(ArticulosService)
export class Menu {
    constructor(articulosService) {
        this.articulosService = articulosService;
    }

    activate() {
        return this.articulosService.getArticulos().then(r=>this.articulos = r);
    }

}
