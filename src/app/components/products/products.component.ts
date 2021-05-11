import { Component, OnInit } from '@angular/core';
import { ProductRepositoryService } from '../../services/product-repository.service';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;
  storeName = 'product';
  form: FormGroup;
  showForm: boolean;
  showEditButton: boolean;
  private editingId: string;
  constructor(private db: ProductRepositoryService) {
    this.initForm();
  }

  ngOnInit(): void {
    this.products$ = this.db.getAll(this.storeName);
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
    this.products$ = this.db.deleteByKey(this.storeName, Number($event));
  }

  beginEdit($event: string): void {
    this.editingId = $event;
    this.db
      .get(this.storeName, Number($event))
      .pipe(take(1))
      .subscribe((product) => {
        this.initForm(product);
      });
    this.showFormSwitcher(true);
  }

  acceptEdit(): void {
    this.form.controls.updatedAt.setValue(new Date());
    this.form.addControl('id', new FormControl(this.editingId));
    this.products$ = this.db.update(this.storeName, this.form.value);
    this.showFormSwitcher(false);
  }

  private clearUserForm(): void {
    this.form.reset();
  }

  private initForm(product?: Product): void {
    this.form = new FormGroup({
      name: new FormControl(product?.name, Validators.required),
      price: new FormControl(product?.price, Validators.required),
      createdAt: new FormControl(product?.createdAt),
      updatedAt: new FormControl(),
    });
  }

  addNewProduct(): void {
    this.form.removeControl('id');
    this.form.controls.createdAt.setValue(new Date());
    this.form.controls.updatedAt.setValue(new Date());
    this.db.addNew(this.storeName, this.form.value);
    this.reloadData();
    this.clearUserForm();
  }

  private reloadData(): void {
    this.products$ = this.db.getAll(this.storeName);
  }
}
