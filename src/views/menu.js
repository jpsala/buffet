import {inject, computedFrom} from 'aurelia-framework';
import {ArticulosService} from '../services/articulos';
import {CarroService} from '../services/carro';
import {CategoriasService} from '../services/categorias';
@inject(ArticulosService, CarroService, CategoriasService)
export class Menu {
    categoria = undefined;
    constructor(articulosService, carroService, categoriasService) {
        this.articulosService = articulosService;
        this.carroService = carroService;
        this.categoriasService = categoriasService;
    }

    async activate(categoria) {
        categoria.id = categoria.id === 'false' ? false:categoria.id;
        this.articulos = await this.articulosService.getArticulosFiltrados(categoria.id);
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
//     if (w < 450) {
//         $('#col-carro').hide();
//         $('#col-categorias').width(w - 20);
//     } else if(w < 800) {
//         $('#col-carro').show();
//         $('#col-categorias').width(w - c - 45);
//     } else {
//         $('#col-carro').show();
//         $('#col-categorias').width(w - c - 80);
//     }
}
