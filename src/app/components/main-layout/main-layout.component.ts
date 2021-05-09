import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserRepositoryService } from '../../services/user-repository.service';
import { OrderRepositoryService } from '../../services/order-repository.service';
import { ProductRepositoryService } from '../../services/product-repository.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
})
export class MainLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
