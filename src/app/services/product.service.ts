import { Injectable, inject, signal } from '@angular/core';
import { IProduct } from '../interfaces';
import { BaseService } from './base-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<IProduct> {
  protected override source: string = 'products';
  private itemListSignal = signal<IProduct[]>([]);
  private snackBar: MatSnackBar = inject(MatSnackBar);

  get items$() {
    return this.itemListSignal;
  }

  public getAll() {
    this.findAll().subscribe({
      next: (response: any) => {
        response.reverse();
        this.itemListSignal.set(response);
      },
      error: (error: any) => {
        console.error('Error in get all products request', error);
        this.snackBar.open(error.error.description, 'Close', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  public save(item: IProduct) {
    this.add(item).subscribe({
      next: (response: any) => {
        this.itemListSignal.update((products: IProduct[]) => [response, ...products]);
        this.snackBar.open('Product saved successfully', 'Close', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
      },
      error: (error: any) => {
        console.error('response', error.description);
        this.snackBar.open(error.error.description, 'Close', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  public update(item: IProduct) {
    this.add(item).subscribe({
      next: (response: any) => {
        const updatedItems = this.itemListSignal().map(product => product.id === item.id ? response : product);
        this.itemListSignal.set(updatedItems);
        this.snackBar.open('Product updated successfully', 'Close', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
      },
      error: (error: any) => {
        console.error('response', error.description);
        this.snackBar.open(error.error.description, 'Close', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  public delete(item: IProduct) {
    this.del(item.id).subscribe({
      next: () => {
        this.itemListSignal.set(this.itemListSignal().filter(product => product.id != item.id));
      },
      error: (error: any) => {
        console.error('response', error.description);
        this.snackBar.open(error.error.description, 'Close', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}
