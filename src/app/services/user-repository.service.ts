import { Injectable } from '@angular/core';
import { AbstractService } from './abstract.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserRepositoryService extends AbstractService<User> {}
