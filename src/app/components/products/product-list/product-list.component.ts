import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IProduct } from '../../../interfaces';
import { ProductService } from '../../../services/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../services/auth.service'; 
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../modal/modal.component';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    ProductFormComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnChanges {
  @Input() itemList: IProduct[] = [];
  public selectedItem: IProduct = {};

  constructor(
    private productService: ProductService,
    private authService: AuthService 
  ) {}

  ngOnChanges(changes: SimpleChanges): void {}

  showDetailModal(item: IProduct, modal: any) {
    this.selectedItem = {...item};
    modal.show();
  }

  handleFormAction(item: IProduct) {
    this.productService.update(item);
  }

  deleteProduct(item: IProduct) {
    this.productService.delete(item);
  }

  public get isSuperAdmin(): boolean {
    return this.authService.hasRole('ROLE_SUPER_ADMIN');
  }
}
