import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  platformId = inject(PLATFORM_ID)

  constructor() { }


  toggleDarkMode(isDark: boolean){
    
    if(isPlatformBrowser(this.platformId)){
      const classList = document.body.classList
      isDark ? classList.add('dark-theme') : classList.remove('dark-theme')
    }
    
  }


}
