import { Component, OnInit, HostBinding, HostListener } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('cardHover', [
      state('hovered', style({
        transform: 'scale(1.05)',
        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
      })),
      state('notHovered', style({
        transform: 'scale(1)',
        boxShadow: 'none',
      })),
      transition('hovered => notHovered', [
        animate('0.3s ease-out')
      ]),
      transition('notHovered => hovered', [
        animate('0.3s ease-in')
      ]),
    ])
  ]
})
export class HomeComponent implements OnInit {

  items: any[] = [];
  groupedItems: { [key: string]: any[] } = {}; 

  @HostBinding('@cardHover') cardHover = 'notHovered';


  @HostListener('mouseenter')
  onMouseEnter() {
    this.cardHover = 'hovered';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.cardHover = 'notHovered';
  }
  
addToCart() {
throw new Error('Method not implemented.');
}
productData: any;
removeToCart(arg0: any) {
throw new Error('Method not implemented.');
}
 popularProducts:undefined|product[];
 trendyProducts:undefined | product[];
 removeCart= false;
  constructor(private product:ProductService, private http: HttpClient) {}

  ngOnInit(): void {

    this.fetchItems();

    
    this.product.popularProducts().subscribe((data)=>{
      this.popularProducts=data;
    })

    this.product.trendyProducts().subscribe((data)=>{
      this.trendyProducts=data;
    })
  }

  fetchItems() {
    this.http.get<any>('assets/db.json').subscribe(data => {
      this.items = data.items;
      this.groupedItems = this.groupByCategory(this.items);
    });
  }

  groupByCategory(items: any[]): { [key: string]: any[] } { // Define return type
    return items.reduce((groups, item) => {
      const category = item.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(item);
      return groups;
    }, {});
  }
}