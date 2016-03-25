import {inject} from 'aurelia-framework';
import {ArticulosService} from '../../services/articulos';
import {ImagenesService} from '../../services/imagenes';
import {ArticuloModel} from '../../models/articulo';
import {CategoriasService} from '../../services/categorias';
import $ from 'jquery';
@inject(ArticulosService, ArticuloModel, ImagenesService, CategoriasService)
export class Articulos {
    articulos = [];
    selected = false;
    copy = false;
    view = './templates/articulos-view.html';
    edit = './templates/articulos-edit.html';
    images = [];
    categorias = [];
    constructor(articulosService, articuloModel, imagenesService, categoriasService) {
        this.articulosService = articulosService;
        this.articuloModel = articuloModel;
        this.imagenesService = imagenesService;
        this.categoriasService = categoriasService;
        this.articuloNuevo = this.articuloModel.nuevo();
    }

    activate() {
        return Promise.all([
            this.articulosService.getArticulos(),
            this.imagenesService.getImages(),
            this.categorias = this.categoriasService.getCategorias()
        ]).then((values) => {
            this.articulos = values[0];
            this.images = values[1];
            this.categorias = values[2];
        });
    }

    attached() {
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

    async ok() {
        let id = await this.articulosService.save(this.selected)
        if (this.selected.id === -1) {
            this.selected.id = id;
            this.articulosService.add(this.selected);
            this.articuloNuevo = this.articuloModel.nuevo();
        }
        this.selected = false;
        this.copy = false;
    }

    del(articulo) {
        this.articulosService.del(articulo).then(()=> {
            let index = this.articulos.indexOf(articulo);
            this.articulos.splice(index, 1);
        })
    }
}