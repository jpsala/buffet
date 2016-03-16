import {inject, noView} from 'aurelia-framework';
import {CarroService} from './../services/carro.js';
//import toastr from 'toastr';
import $ from 'jquery';
import {Router} from 'aurelia-router';
import AuthService from './../services/auth';
@inject(CarroService, Router, AuthService)
export class Print {
    constructor( carroService, router, auth) {
        this.carroService = carroService;
        this.router = router;
        this.auth = auth;
        this.articulos = carroService.articulos;

        this.total = this.carroService.total;
        //this.toastr = toastr;
        this.fecha = new Date();
    }

    activate() {
        //toastr.remove();
    }

    attached() {
        this.imprime();
        setTimeout(()=>{
             this.auth.logout()
        }, 4000);
    }

    imprime(){
        if(!(typeof process === 'undefined') && process.versions.electron) {
            let BrowserWindow = require('electron').remote.BrowserWindow;
            this.win = BrowserWindow.getFocusedWindow();
            this.win.print({silent:true,printBackground:false});
            setTimeout(()=>{
                this.carroService.vaciaCarrito();
            })
            //toastr.info('Su pedido está siendo impreso...')
        }else{
            //toastr.error('No estoy dentro de electron');

        }
    }
}