import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-prova',
  templateUrl: './prova.component.html',
  styleUrls: ['./prova.component.css']
})
export class ProvaComponent implements OnInit {

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

  name = 'Angular'
  onButtonClicked() {
    if (this.prodotti) {
      //console.log('PRODOTTI PROVA:', this.prodotti)
      return this.name = 'Charlie'
    }
  }
}