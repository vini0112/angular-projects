import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { productModule } from '../modules/products.module';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.api

  private allProducts = new BehaviorSubject<productModule[]>([])
  allProducts$: Observable<productModule[]> = this.allProducts.asObservable()


  getProducts(){
    return this.http.get<productModule[]>(`${this.apiUrl}/clothes`).pipe(
      tap(dados => this.allProducts.next(dados))
    ).subscribe()

  }


  updateFavorite(id: number, isFavorite: boolean){
    return this.http.patch(`${this.apiUrl}/clothesFavorite/${id}`, {isFavorite}) 
  }

  
}
