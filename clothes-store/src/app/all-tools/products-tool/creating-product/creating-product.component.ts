import { Component, Input, signal, Signal, EventEmitter, Output, output} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-creating-product',
  imports: [],
  templateUrl: './creating-product.component.html',
  styleUrl: './creating-product.component.css'
})
export class CreatingProductComponent {

  // @Input() NewProductPage!: Signal<boolean>

  @Output() statusCreationPage = new EventEmitter<boolean>()


  goBackToProductTools(){  
    this.statusCreationPage.emit(true)
  }

}
