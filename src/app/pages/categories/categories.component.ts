import { Component, OnInit, inject } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ICategory } from '../../interfaces';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../components/modal/modal.component';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CategoryListComponent } from '../../components/category/category-list/category-list.component';
import { CategoryFormComponent } from '../../components/category/category-form/category-form.component';


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CategoryListComponent,
    LoaderComponent,
    CommonModule,
    ModalComponent,
    CategoryFormComponent
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{
  public categoryService: CategoryService = inject(CategoryService);
  public route: ActivatedRoute = inject(ActivatedRoute);
  public areActionsAvailable: boolean = false;
  public authService: AuthService =  inject(AuthService);
  public routeAuthorities: string[] =  [];

  ngOnInit(): void {
    this.categoryService.getAll();
    this.route.data.subscribe( data => {
      const authorities: string[] = data['authorities'] || [];
      this.areActionsAvailable = this.authService.areActionsAvailable(authorities);
    });
  }


  handleFormAction(item: ICategory) {
    this.categoryService.save(item);
  }


}

