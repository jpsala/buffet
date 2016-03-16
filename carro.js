//import {HttpClient} from 'aurelia-fetch-client';
import {BindingEngine, inject, computedFrom} from 'aurelia-framework';
import $ from 'jquery';
import {Config} from '../config/config.js';
import AuthService from '../services/auth';
import {Router} from 'aurelia-router';
@inject(BindingEngine, Config, AuthService, Router)
export class CarroService {
    articulos = [];
    total = 0;
    articulosChanged = undefined;
    constructor(bindingEngine, config, auth, router) {
        this.bindingEngine = bindingEngine;
        this.config = config;
        this.url = `${this.config.urlApi}/buffet_cierra`;
        this.auth = auth;
        this.router = router;
        this.subscription = bindingEngine
            .collectionObserver(this.articulos)
            .subscribe((a)=>{
                this.articulosChanged = Date();
            });
    }

    add(articulo) {
        this.articulos.push(articulo);
        // console.log('articulosParaSubir %O', this.articulosParaSubir);
        this.total += Number(articulo.precio_venta);
        //toastr.info(`${articulo.nombre} fuÃ© aÃ±adido`, 'Carrito');
    }

    remove(articulo) {
        var i = this.articulos.indexOf(articulo);
        this.articulos.splice(i, 1);
        this.total -= Number(articulo.precio_venta);
    }

    @computedFrom('articulosChanged')
    get articulosParaSubir(){
        return this.articulos.map((a)=>{
            return {
                'id':a.id,
                'nombre':a.nombre,
                'subNombre':a.subNombre,
                'subId':a.subId,
                'precio_venta':a.precio_venta,
                'aa':'aa'
            }
        })
    }

    cierra() {
        $.ajax({
                url: this.url,
                type: 'POST',
                dataType: 'json',
                crossDomain: true,
                data:{
//                     doc:{socio_id:this.auth.user.socio_id, total:this.total},
//                     items:this.articulos
                },
                beforeSend: (request) =>
                {
                    //request.setRequestHeader("Authorization", this.auth.getToken());
                },
                error: (data) => {
                    console.log('error',data);
                }
            })
            .then(response=> {
                console.log('cierra',response.data,response);
                if (response.status === 'ok') {
                    //toastr.info(`Su pedido fue grabado y estÃ¡ siendo impreso`, 'Cierre');
                    setTimeout(()=>{

                    },2000);
                    this.imprime();
                    return response;
                }
                //throw new Error(response.statusText);
            });
        //$.getJSON(`${this.url}`, {data: JSON.stringify(this.articulos)},data=>{
        //        if(data.status === 'ok'){
        //            alert('Ok');
        //        }
        //    });

        return;
    }

    imprime(){
        this.router.navigate('#/print');
    }

    vaciaCarrito(){
        this.articulos = [];
    }
    
    dispose(){
        alert(1);
        console.log('dispose');
        this.subscription.dispose();
    }
}