import { Component } from '@angular/core';
import { UserConnectedDTO } from 'src/api-client';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  user!: UserConnectedDTO;

  constructor(private authService: AuthService) {
    this.user = JSON.parse(localStorage.getItem('auth-data')!);
  }

  public logout(): void {
    this.authService.logout();
  }
}
