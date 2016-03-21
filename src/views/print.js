import {inject, noView} from 'aurelia-framework';
import {CarroService} from './../services/carro.js';
//import toastr from 'toastr';
import $ from 'jquery';
import {Router} from 'aurelia-router';
import AuthService from './../services/auth';
import {MdToastService} from 'aurelia-materialize-bridge';
@inject(CarroService, Router, AuthService, MdToastService)
export class Print {
    constructor( carroService, router, auth, toast) {
        this.carroService = carroService;
        this.router = router;
        this.auth = auth;
        this.toast = toast;
        this.articulos = carroService.articulos;
        this.total = this.carroService.total;
        //this.toastr = toastr;
        this.fecha = new Date();
    }

    activate() {
    }

    deactivate(){
        //this.toast.show('<i class="fa fa-info fa-x3">Cerrando sesión</i>', 3000);
    }

    attached() {
        this.imprime();
        setTimeout(()=>{
            this.carroService.vaciaCarrito();
            this.auth.logout();
        }, 4000);
    }

    imprime(){
        if(!(typeof process === 'undefined') && process.versions.electron) {
            let BrowserWindow = require('electron').remote.BrowserWindow;
            this.win = BrowserWindow.getFocusedWindow();
            this.win.print({silent:false,printBackground:false});
            //toastr.info('Su pedido está siendo impreso...')
        }else{
            //toastr.error('No estoy dentro de electron');

        }
    }
}