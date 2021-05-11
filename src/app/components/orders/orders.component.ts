import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../models/order';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { OrderRepositoryService } from '../../services/order-repository.service';
import { User } from '../../models/user';
import { Product } from '../../models/product';
import { UserRepositoryService } from '../../services/user-repository.service';
import { ProductRepositoryService } from '../../services/product-repository.service';
import { logger } from 'codelyzer/util/logger';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders$: Observable<Order[]>;
  users$: Observable<User[]>;
  user: User;
  products$: Observable<Product[]>;
  product: Product;
  storeName = 'order';
  userStore = 'user';
  productStore = 'product';
  form: FormGroup;
  showForm: boolean;
  showEditButton: boolean;
  private editingId: string;
  constructor(
    private db: OrderRepositoryService,
    private userDb: UserRepositoryService,
    private productDb: ProductRepositoryService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.orders$ = this.db.getAll(this.storeName);
    this.users$ = this.userDb.getAll(this.userStore);
    this.products$ = this.productDb.getAll(this.productStore);
  }

  showFormSwitcher(isEdit?: boolean): void {
    this.showEditButton = isEdit;
    this.showForm = !this.showForm;
  }

  cancel(): void {
    this.clearUserForm();
    this.showFormSwitcher();
  }

  delete($event: string): void {
    this.orders$ = this.db.deleteByKey(this.storeName, Number($event));
  }

  beginEdit($event: string): void {
    this.editingId = $event;
    this.db
      .get(this.storeName, Number($event))
      .pipe(take(1))
      .subscribe((order) => {
        this.initForm(order);
      });
    this.showFormSwitcher(true);
  }

  acceptEdit(): void {
    this.form.controls.updatedAt.setValue(new Date());
    this.form.addControl('id', new FormControl(this.editingId));
    this.orders$ = this.db.update(this.storeName, this.form.value);
    this.showFormSwitcher(false);
  }

  private clearUserForm(): void {
    this.form.reset();
  }

  private initForm(order?: Order): void {
    this.form = new FormGroup({
      userId: new FormControl(order?.userId, Validators.required),
      productId: new FormControl(order?.productId, Validators.required),
      discount: new FormControl(order?.discount, Validators.required),
      createdAt: new FormControl(order?.createdAt),
      updatedAt: new FormControl(),
    });
  }

  addNewOrder(): void {
    console.log(this.form);
    this.form.removeControl('id');
    this.form.controls.createdAt.setValue(new Date());
    this.form.controls.updatedAt.setValue(new Date());
    this.db.addNew(this.storeName, this.form.value);
    this.reloadData();
    this.clearUserForm();
  }

  private reloadData(): void {
    this.orders$ = this.db.getAll(this.storeName);
  }
}
