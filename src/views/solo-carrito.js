import {Menu} from './menu';
import {inject, noView} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {CarroService} from '../services/carro.js';
//@noView
@inject(Menu, Router, CarroService)
export class SoloCarrito{
    constructor(menu, router, CarroService){
        this.menu = menu;
        this.router = router;
        this.carroService = CarroService;
    }
    activate(){
        //console.log(this.menu);
        //this.menu.addArticuloToCarrito(this.menu.articulos[0]);
        //this.menu.addArticuloToCarrito(this.menu.articulos[2]);
        //this.menu.addArticuloToCarrito(this.menu.articulos[0]);
        //this.menu.addArticuloToCarrito(this.menu.articulos[1]);
        //this.menu.addArticuloToCarrito(this.menu.articulos[4]);
    }

}