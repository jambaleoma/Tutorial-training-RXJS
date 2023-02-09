import { Component, OnInit } from '@angular/core';
import { filter, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    const el = document.querySelector('input');

    if (el) {
      // APPROCCIO CLASSICO VANILLA JAVASCRIPT (TYPESCRIPT)
      el.addEventListener('input', (e) => {
        console.log('ADD EVENT LISTENER', (e.currentTarget as HTMLInputElement).value);
      });
  
      // APPROCCIO CON RXJS
      fromEvent(el, 'input')
        .subscribe(e => {
          console.log('RXJS', (e.currentTarget as HTMLInputElement).value);
        });
      
      // APPROCCIO CON RXJS PIPE-MAP
      fromEvent(el, 'input')
        .pipe(
          map(e => (e.currentTarget as HTMLInputElement).value)
        )
        .subscribe(text => {
          console.log('RXJS PIPE-MAP', text);
        });
  
      // APPROCCIO CON RXJS PIPE-MAP-FILTER
      fromEvent(el, 'input')
        .pipe(
          map(e => (e.currentTarget as HTMLInputElement).value),
          filter(text => text.length > 3)
        )
        .subscribe(text => {
          console.log('RXJS PIPE-MAP-FILTER', text);
        });
    }
  }

}
