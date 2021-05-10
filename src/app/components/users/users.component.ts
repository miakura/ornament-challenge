import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { UserRepositoryService } from '../../services/user-repository.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  storeName = 'user';
  users$: Observable<User[]>;
  showForm: boolean;
  user: User;
  showEditButton: boolean;
  form: FormGroup;
  private editingId: string;

  constructor(private db: UserRepositoryService) {
    this.initForm();
  }

  ngOnInit(): void {
    this.users$ = this.db.getAll(this.storeName);
    this.clearUserForm();
    this.showEditButton = false;
  }

  reloadData(): void {
    this.users$ = this.db.getAll(this.storeName);
  }

  showFormSwitcher(isEdit?: boolean): void {
    this.showEditButton = isEdit;
    this.showForm = !this.showForm;
  }

  addNewUser(): void {
    this.form.removeControl('id');
    this.form.controls.createdAt.setValue(new Date());
    this.form.controls.updatedAt.setValue(new Date());
    console.log(this.form);
    this.db.addNew(this.storeName, this.form.value);
    this.reloadData();
    this.clearUserForm();
  }

  cancel(): void {
    this.clearUserForm();
    this.showFormSwitcher();
  }

  private clearUserForm(): void {
    this.form.reset();
  }

  delete($event: string): void {
    this.users$ = this.db.deleteByKey(this.storeName, Number($event));
  }

  beginEdit($event: string): void {
    this.editingId = $event;
    this.db.get(this.storeName, Number($event)).subscribe((user) => {
      this.initForm(user);
    });
    this.showFormSwitcher(true);
  }

  acceptEdit(): void {
    this.form.controls.updatedAt.setValue(new Date());
    this.form.addControl('id', new FormControl(this.editingId));
    this.users$ = this.db.update(this.storeName, this.form.value);
    this.showFormSwitcher(false);
  }

  private initForm(user?): void {
    this.form = new FormGroup({
      name: new FormControl(`${user?.name}`, Validators.required),
      password: new FormControl(`${user?.password}`, Validators.required),
      phone: new FormControl(`${user?.phone}`, Validators.required),
      email: new FormControl(`${user?.email}`, Validators.required),
      address: new FormControl(`${user?.address}`, Validators.required),
      createdAt: new FormControl(`${user?.createdAt}`),
      updatedAt: new FormControl(''),
    });
  }
}
