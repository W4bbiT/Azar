import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/productModel';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit,AfterViewInit {
  searchResults: Product[];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    // Retrieve search results from the route data
    const state = this.route.snapshot.data['state'];
    if (state && state['products']) {
      this.searchResults = state['products'];
    } else {
      // If no search results found, navigate back to the search page
      this.router.navigate(['/search']);
    }
  }
}
