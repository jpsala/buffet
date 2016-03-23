import {HttpClient, json} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
@inject(HttpClient)
export class ImagenesService {
    constructor(http){
        this.http = http;
    }
    _images = [];

    getImages() {
        if (this._images.length === 0) {
            return this
                .http
                .fetch('/imagenes')
                .then((response)=> this._images = response.data);
        } else {
            return new Promise((fulfill)=> {
                fulfill(this._images);
            });
        }
    }

}