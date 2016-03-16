import {inject, computedFrom} from 'aurelia-framework';
import {ArticulosService} from '../services/articulos';
import {CarroService} from '../services/carro';
@inject(ArticulosService, CarroService)
export class Menu {
    constructor(articulosService, carroService) {
        this.articulosService = articulosService;
        this.carroService = carroService;
    }

    activate() {
        return this.articulosService.getArticulos().then(r=>this.articulos = r);
    }

    attached() {
        $(window).resize(()=> {
            resize();
        });
        resize()
    }

}
function resize() {
    let w = $(window).width();
    let c = $('#col-carro .card-panel').width();
    if (w < 450) {
        $('#col-carro').hide();
        $('#col-articulos').width(w - 20);
    } else {
        $('#col-carro').show();
        $('#col-articulos').width(w - c - 100);
    }
}
