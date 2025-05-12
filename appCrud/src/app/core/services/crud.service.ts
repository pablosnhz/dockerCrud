import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IProducts } from '../models/products';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(private http: HttpClient) {}

  getProduct(): Observable<IProducts[]> {
    return this.http.get<IProducts[]>(`${environment.apiEndpoints.url}/List`);
  }

  addProduct(product: IProducts): Observable<IProducts> {
    return this.http.post<IProducts>(
      `${environment.apiEndpoints.url}/AddProduct`,
      product
    );
  }

  updateProduct(product: IProducts): Observable<void> {
    return this.http.put<void>(
      `${environment.apiEndpoints.url}/modProduct/${product.id}`,
      product
    );
  }

  deleteProduct(id: number): Observable<IProducts> {
    return this.http.delete<IProducts>(
      `${environment.apiEndpoints.url}/DeleteProduct/${id}`
    );
  }
}
