import {customAttribute, inject, bindingMode} from 'aurelia-framework';

@customAttribute('focus', bindingMode.twoWay)
@inject(Element)
export class Focus {
    constructor(element) {
        this.element = element;
    }

    valueChanged(newValue) {
    }
}