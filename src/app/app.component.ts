import { Component, ElementRef, OnInit } from '@angular/core';
import { User } from './models/userModel';
import { TokenStorageService } from './services/token-storage.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Azar&Co';
  constructor() { }

  ngOnInit(): void {
  }

}
