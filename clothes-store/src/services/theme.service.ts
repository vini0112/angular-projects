import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }


  toggleDarkMode(isDark: boolean){
    const classList = document.body.classList
    isDark ? classList.add('dark-theme') : classList.remove('dark-theme')
  }


}
