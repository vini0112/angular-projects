import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { productModule } from '../modules/products.module';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.api
  

  getProducts(): Observable<productModule[]>{
    return this.http.get<productModule[]>(`${this.apiUrl}`)
  }

}
