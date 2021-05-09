import { Injectable } from '@angular/core';
import { AbstractService } from './abstract.service';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductRepositoryService extends AbstractService<Product> {}
