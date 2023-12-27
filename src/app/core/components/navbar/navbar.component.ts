import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../services/token-storage.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  currentLang = this.translate.currentLang;

  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private translate: TranslateService
  ) {}
  onLogout() {
    this.tokenStorageService.signOut();
    this.router.navigateByUrl('');
  }
  useLanguage() {
    if (this.translate.currentLang === 'en') {
      this.translate.use('ar');
      this.currentLang = 'ar';
    } else {
      this.translate.use('en');
      this.currentLang = 'en';
    }
  }
}
