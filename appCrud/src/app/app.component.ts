import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CrudService } from './core/services/crud.service';
import { FormsModule } from '@angular/forms';
import {
  CommonModule,
  CurrencyPipe,
  JsonPipe,
  TitleCasePipe,
  UpperCasePipe,
} from '@angular/common';
import { IProducts } from './core/models/products';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CurrencyPipe, TitleCasePipe, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public readonly crudService: CrudService = inject(CrudService);

  datos: IProducts[] = [];
  productName: string = '';
  showModal = false;
  editar = false;

  form: IProducts = { id: 0, name: '', price: 0 };

  ngOnInit(): void {
    this.obtenerProducto();
  }

  obtenerProducto() {
    this.crudService.getProduct().subscribe((data) => {
      this.datos = data;
    });
  }

  addProduct() {
    const productNew: IProducts = { id: 0, name: this.productName, price: 0 };
    this.crudService.addProduct(productNew).subscribe((product) => {
      this.datos.push(product);
      this.productName = '';
    });
  }

  updateSaveProduct() {
    if (this.editar) {
      this.crudService.updateProduct(this.form).subscribe(() => {
        this.obtenerProducto();
        this.cancel();
      });
    } else {
      this.crudService.addProduct(this.form).subscribe(() => {
        this.obtenerProducto();
        this.cancel();
      });
    }
  }

  deleteProduct(id: number) {
    this.crudService.deleteProduct(id).subscribe(() => {
      this.obtenerProducto();
    });
  }

  editProduct(product: IProducts) {
    this.form = { ...product };
    this.editar = true;
    this.showModal = true;
  }

  cancel() {
    this.form = { id: 0, name: '', price: 0 };
    this.showModal = false;
    this.editar = false;
  }
}
