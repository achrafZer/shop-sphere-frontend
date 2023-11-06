import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDTO, LoginService, UserConnectedDTO } from 'src/api-client';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {}

  public login(email: string, password: string): void {
    this.loginService.login({ email, password } as LoginDTO).subscribe({
      next: (data: UserConnectedDTO) => {
        this.isAuthenticated = true;
        localStorage.setItem('auth-data', JSON.stringify(data));
        this.navigateToHome();
      },
      error: (error) => console.log(error),
    });
  }

  public logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('auth-data');
    this.navigateToHome();
  }

  public isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  private navigateToHome(): void {
    this.router.navigate(['home']);
  }
}
