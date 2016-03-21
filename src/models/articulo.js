import {computedFrom} from 'aurelia-framework'
export class Articulo{
    constructor(articulo){
        Object.assign(this, articulo);
    }

    //@computedFrom('sub')
    get nombreConSub(){
        return ((typeof this.sub === 'undefined') ? this.nombre :`${this.nombre} ${this.sub.nombre}`);

    }

    //@computedFrom('sub')
    get precioConSub(){
        //console.log('nc',this.nombre + (typeof this.sub === 'undefined') ? "si":"Undef");
        return (typeof this.sub === 'undefined') ? this.precio_venta:this.sub.precio_venta;
    }

    get imagenPath(){
        return `./images/${this.imagen.trim()}`;
    }
}