import { Component, OnInit } from '@angular/core';
import { BuyerDTO } from 'src/api-client';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.scss'],
})
export class BuyerComponent implements OnInit {
  buyer!: BuyerDTO;

  ngOnInit(): void {
    this.buyer = JSON.parse(
      localStorage.getItem('auth-data') as string
    ) as BuyerDTO;
  }
}
