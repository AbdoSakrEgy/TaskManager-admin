import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {}
  onLogout() {
    this.tokenStorageService.signOut();
    this.router.navigateByUrl('');
  }
}
