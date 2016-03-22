import {inject, computedFrom} from 'aurelia-framework';
import {ArticulosService} from '../../services/articulos';
import {Articulo} from '../../models/articulo';
import $ from 'jquery';
@inject(ArticulosService)
export class Articulos {
    articulos = [];
    selected = false;
    copy = false;
    view = './templates/articulos-view.html';
    edit = './templates/articulos-edit.html';

    constructor(articulosService) {
        this.articulosService = articulosService;
        this.articuloNuevo = new Articulo();
    }

    activate() {
        return this.articulosService.getArticulos().then(r=> {
            this.articulos = r;
            return this.articulos;
        });
    }
    attached(){
        $('table tr').on({
            mouseenter: function (e) {
                $(e.target).parent('tr').find('.borra-articulo').removeClass('hide');
            },
            mouseleave: function (e) {
                $(e.target).parent('tr').find('.borra-articulo').addClass('hide');
            }
        })
    }

    select(articulo) {
        if (this.copy) return;
        this.selected = articulo;
        this.copy = Object.assign({}, articulo);
    }

    cancel() {
        Object.assign(this.selected, this.copy);
        this.selected = false;
        this.copy = false;
    }

    ok() {
        this.articulosService.save(this.selected)
            .then(id => {
                if (this.selected.id === -1) {
                    this.selected.id = id;
                    this.articulosService.add(this.selected);
                    this.articuloNuevo = new Articulo();
                }
                this.selected = false;
                this.copy = false;
            });
    }

    del(articulo) {
        this.articulosService.del(articulo).then(()=> {
            let index = this.articulos.indexOf(articulo);
            this.articulos.splice(index, 1);
        })
    }
}