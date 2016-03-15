import {bindable} from 'aurelia-framework';
import * as utils from './../utils';

export class debug{
    jsonObj;
    @bindable obj;
    bind() {
        this.updateJson();
        this.interval = setInterval(()=>this.updateJson(), 400);  // "::this.updateJson" === "this.updateJson.bind(this)"   ES7 function bind feature
    }

    unbind() {
        clearInterval(this.interval);
    }

    updateJson() {
        var cache = [];
        this.jsonObj = JSON.stringifyOnce(this.obj, function(key, value) {
            if (typeof value === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {
                    // Circular reference found, discard key
                    return;
                }
                // Store value in our collection
                cache.push(value);
            }
            return value;
        },"  ");
        cache = null
    }
}