import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-masculino',
  imports: [RouterOutlet, RouterLink, RouterLinkActive], 
  templateUrl: './masculino.component.html',
  styleUrl: './masculino.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MasculinoComponent{


  

}
