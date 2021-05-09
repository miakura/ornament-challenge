import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class AbstractService<T> {
  constructor(public db: NgxIndexedDBService) {}

  get(storeName: string, id: number): Observable<T> {
    return this.db.getByID(storeName, id);
  }

  getAll(storeName: string): Observable<T[]> {
    return this.db.getAll(storeName);
  }

  addNew(storeName: string, value: T): Observable<T> {
    return this.db.addItem(storeName, value);
  }

  update(storeName: string, value: T, key?: number): Observable<T[]> {
    return this.db.update(storeName, value);
  }

  deleteByKey(storeName: string, key: number): Observable<T[]> {
    return this.db.delete(storeName, key);
  }
}
