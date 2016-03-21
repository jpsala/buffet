import {Menu} from './menu';
import {inject, noView} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {CarroService} from '../services/carro.js';
import {MdToastService} from 'aurelia-materialize-bridge';
//@noView
@inject(Menu, Router, CarroService, MdToastService)
export class SoloCarrito{
    constructor(menu, router, CarroService, toast){
        this.menu = menu;
        this.router = router;
        this.carroService = CarroService;
        this.toast = toast;
    }
    activate(){
        //console.log(this.menu);
        //this.menu.addArticuloToCarrito(this.menu.articulos[0]);
        //this.menu.addArticuloToCarrito(this.menu.articulos[2]);
        //this.menu.addArticuloToCarrito(this.menu.articulos[0]);
        //this.menu.addArticuloToCarrito(this.menu.articulos[1]);
        //this.menu.addArticuloToCarrito(this.menu.articulos[4]);
    }
    canActivate(){
        if(!this.carroService.visible){
            this.toast.show('Carrito vacio', 1000);
        }
        return this.carroService.visible;
    }
}