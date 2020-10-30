import { from } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})
export class WebsiteComponent implements OnInit {

  constructor(private client: HttpClient) { }
  priceInEur: number;

  ngOnInit(): void {
    const body = {fsym: 'ETH', tsyms: 'EUR'};

    this.client.post('https://min-api.cryptocompare.com/data/price',
    body, )
    .subscribe(data => {
      this.priceInEur = data[' EUR '];
      console.log(this.priceInEur);
      console.log(data);
    });
  }

}
