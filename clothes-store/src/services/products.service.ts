import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { EditingProduct, productModule, productSize } from '../modules/products.module';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {}

  private apiUrl = environment.api

  private allProductsSubject = new BehaviorSubject<productModule[]>([])
  allProducts$ = this.allProductsSubject.asObservable()
  

  getProducts(): void{
    
    this.http.get<productModule[]>(`${this.apiUrl}/clothes`).subscribe({
      next: (res) =>{
        this.allProductsSubject.next(res)
        console.log('Products received!')
      },
      error: (err) =>{
        console.log('ERROR getting the products! ', err.message)
      }
    })
  }


  updateFavorite(id: number, isFavorite: boolean){
    return this.http.patch(`${this.apiUrl}/clothesFavorite/${id}`, {isFavorite})
  }



  // CRUD

  createProduct(dados: FormData){
    return this.http.post(`${this.apiUrl}/create-clothes`, dados).pipe(
      tap(() => this.getProducts()) 
    )
  }


  getProductById(id: number): Observable<productModule> {
    return this.http.get<productModule>(`${this.apiUrl}/product/${id}`);
  }

  
  getProductSize(id: number): Observable<productSize[]>{
    return this.http.get<productSize[]>(`${this.apiUrl}/product-size/${id}`)
  }


  updateProduct(dados: EditingProduct): Observable<EditingProduct>{
    return this.http.put<EditingProduct>(`${this.apiUrl}/clothes/${dados.id}`, dados)
  }



  deleteProduct(id: number){
    this.http.delete(`${this.apiUrl}/clothes/${id}`).subscribe({

      next: () =>{
        const NewArray = this.allProductsSubject.value.filter(item => item.id !== id)
        this.allProductsSubject.next(NewArray)
        console.log('Product Deleted')
      },
      error: (err) => {
        console.log('Product Not deleted!', err)
      }
      
    })
  }


  
}
