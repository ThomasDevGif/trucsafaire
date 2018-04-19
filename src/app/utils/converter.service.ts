import { Injectable } from '@angular/core';

import { Item } from '../models/item';

@Injectable()
export class ConverterService {

  constructor() { }

  convertBoolean(resItems: any) : Item[] {
    var items : Item[] = new Array<Item>();
    for (let i = 0; i < resItems.length; i++) {
        resItems[i].done = (resItems[i].done == 1);
        items.push(resItems[i]);
    }
    return items;
  }

}
