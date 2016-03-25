import {inject, bindable} from 'aurelia-framework';
import {CategoriasService} from '../services/categorias';
@inject(CategoriasService)
export class Categorias {
    categoriasService;
    categorias = [];

    constructor(categoriasService) {
        this.categoriasService = categoriasService;
    }

    async activate() {
        this.categorias = await this.categoriasService.getCategorias();
    }
}