import {json, HttpClient} from 'aurelia-fetch-client';
import {BindingEngine, inject, computedFrom} from 'aurelia-framework';
import $ from 'jquery';
import {Config} from '../config/config.js';
import AuthService from '../services/auth';
import {Router} from 'aurelia-router';
@inject(HttpClient, BindingEngine, Config, AuthService, Router)
export class CarroService {
    articulos = [];
    total = 0;
    articulosChanged = undefined;
    articulosCant = 0;
    constructor(http, bindingEngine, config, auth, router) {
        this.http = http;
        this.bindingEngine = bindingEngine;
        this.config = config;
        this.url = `${this.config.urlApi}/buffet_cierra`;
        this.auth = auth;
        this.router = router;
        this.subscription = this.bindingEngine
            .collectionObserver(this.articulos)
            .subscribe(()=>{
                this.articulosChanged = Date();
            });
    }

    add(articulo) {
        this.articulos.push(articulo);
        // console.log('articulosParaSubir %O', this.articulosParaSubir);
        this.total += Number(articulo.precio_venta);
        //toastr.info(`${articulo.nombre} fué añadido`, 'Carrito');
    }

    @computedFrom('articulosChanged')
    get visible(){
        return this.articulos.length > 0;
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
                'precio_venta':a.precio_venta
            }
        })
    }

    cierra() {
        this
            .http
            .fetch('/cierra',{
                body:json({
                    doc:{socio_id:this.auth.user.socio_id, total:this.total},
                    items:this.articulos
                })
            })
            .then((a)=>{
                this.imprime();
            })
        return;
    }

    imprime(){
        this.router.navigate('#/print');
    }

    vaciaCarrito(){
        this.total = 0;
        this.articulos = [];
    }
    
    dispose(){
        alert(1);
        console.log('dispose');
        this.subscription.dispose();
    }
}