import {inject, bindable, noView} from 'aurelia-framework';
import * as utils from './../utils';
@noView
export class Log{
    jsonObj = undefined;
    @bindable obj;


    bind() {
        if(!this.obj)
            return;
        this.updateJson();
        this.interval = setInterval(()=>this.updateJson(), 5000);  // "::this.updateJson" === "this.updateJson.bind(this)"   ES7 function bind feature
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
        });
        cache = null
        console.log(this.jsonObj);
    }
}
