import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { EditingProduct, productModule } from '../modules/products.module';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.api

  private allProducts = new BehaviorSubject<productModule[]>([])
  allProducts$: Observable<productModule[]> = this.allProducts.asObservable()


  getProducts(): Observable<productModule[]>{
    return this.http.get<productModule[]>(`${this.apiUrl}/clothes`)
  }


  updateFavorite(id: number, isFavorite: boolean){
    return this.http.patch(`${this.apiUrl}/clothesFavorite/${id}`, {isFavorite}) 
  }


  // CRUD

  createProduct(dados: any){
    return this.http.post(`${this.apiUrl}/clothes`, dados).pipe(
      tap(() => this.getProducts()) // creating in the reactive way
    )
  }


  updateProduct(dados: EditingProduct){
    return this.http.put(`${this.apiUrl}/clothes/${dados.id}`, dados)
  }



  deleteProduct(id: number){
    this.http.delete(`${this.apiUrl}/clothes/${id}`).subscribe({

      next: () =>{
        const NewArray = this.allProducts.value.filter(item => item.id !== id)
        this.allProducts.next(NewArray)
        console.log('Product Deleted')
      },
      error: (err) => {
        console.log('Product Not deleted!', err)
      }
      
    })
  }


  
}
