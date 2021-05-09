import { Injectable } from '@angular/core';
import { extend } from 'webdriver-js-extender';
import { AbstractService } from './abstract.service';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderRepositoryService extends AbstractService<Order> {}
