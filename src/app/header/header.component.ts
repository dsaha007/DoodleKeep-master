import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../welcome/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  userName: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAccess;
    this.userName = this.authService.getUserName(); // Assuming `getUserName` exists in AuthService
  }

  onLogout(): void {
    this.authService.logout(); // Assuming `logout` exists in AuthService
    this.isLoggedIn = false;
    this.router.navigate(['/welcome']);
  }
}
