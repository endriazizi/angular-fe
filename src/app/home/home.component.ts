import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  prodotti = []; // arrai di oggetti

  constructor(private dataServizio: DataService) { }

  ngOnInit() {

    this.dataServizio.sendGetRequest().subscribe((mieiDati: any[]) => {
      console.log(mieiDati);
      this.prodotti = mieiDati;
      // https://www.c-sharpcorner.com/forums/how-to-calculate-total-amount-in-angular-7
      let totaleDue;
      totaleDue = this.prodotti.map(t => t.prezzo).reduce((a, value) => a + value, 0)
      console.log('totaleDue', totaleDue);
    })


  }

  // https://www.c-sharpcorner.com/forums/how-to-calculate-total-amount-in-angular-7
  getTotalAmount() {
    if (this.prodotti) {
      console.log('PRODOTTI:', this.prodotti)

      return this.prodotti.map(t => t.prezzo).reduce((a, value) => a + value, 0);

      // yourArray.forEach(function (arrayItem) {
      //   var x = arrayItem.prop1 + 2;
      //   console.log(x);
      // });

      // this.prodotti.forEach(function (arrayItem) {
      //   var x = arrayItem.prezzo + 2;
      //   console.log('XXXXX', x);
      // });

      // console.log('totale:', this.prodotti.map(t => t.prezzo).reduce((a, value) => a + value, 0));
      // let totale = this.prodotti.map(t => t.prezzo)
      // console.log('TOTALE MAP: ', totale);
      // totale.reduce((a, value) => a + value, 0);
      // console.log('TOTALE REDUCE: ', totale);

      // return totale;
    }
    return 0;
  }





}