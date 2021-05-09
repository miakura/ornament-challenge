import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { UserRepositoryService } from '../../services/user-repository.service';

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
  currentDate: Date;

  constructor(private db: UserRepositoryService) {}

  ngOnInit(): void {
    this.users$ = this.db.getAll(this.storeName);
    this.clearUserForm();
    this.showEditButton = false;
    this.currentDate = new Date();
  }

  reloadData(): void {
    this.users$ = this.db.getAll(this.storeName);
  }

  showFormSwitcher(isEdit?: boolean): void {
    this.showEditButton = isEdit;
    this.showForm = !this.showForm;
  }

  addNewUser(): void {
    this.user.createdAt = new Date();
    this.user.updatedAt = new Date();
    this.db.addNew(this.storeName, this.user);
    this.reloadData();
    this.clearUserForm();
  }

  cancel(): void {
    this.clearUserForm();
    this.showFormSwitcher();
  }

  private clearUserForm(): void {
    this.user = { address: '', email: '', name: '', password: '', phone: '' };
  }

  delete($event: string): void {
    this.users$ = this.db.deleteByKey(this.storeName, Number($event));
  }

  beginEdit($event: string): void {
    this.db.get(this.storeName, Number($event)).subscribe((user) => {
      this.user = user;
    });
    this.showFormSwitcher(true);
  }

  acceptEdit(): void {
    this.user.updatedAt = new Date();
    this.users$ = this.db.update(this.storeName, this.user);
    this.showFormSwitcher(false);
  }
}
