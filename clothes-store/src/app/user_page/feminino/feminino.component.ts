import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-feminino',
  imports: [RouterLink, RouterOutlet, RouterLinkActive],  
  templateUrl: './feminino.component.html',
  styleUrl: './feminino.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FemininoComponent {

}


