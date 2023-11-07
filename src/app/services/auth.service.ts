import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDTO, LoginService, UserConnectedDTO } from 'src/api-client';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private loginService: LoginService, private router: Router) {}

  public login(email: string, password: string): void {
    this.loginService.login({ email, password } as LoginDTO).subscribe({
      next: (data: UserConnectedDTO) => {
        localStorage.setItem('auth-data', JSON.stringify(data));
        this.navigateToHome();
      },
      error: (error) => console.log(error),
    });
  }

  public logout(): void {
    localStorage.removeItem('auth-data');
    this.navigateToHome();
  }

  public isAuthenticatedUser(): boolean {
    return !!localStorage.getItem('auth-data');
  }

  private navigateToHome(): void {
    this.router.navigate(['home']);
  }
}
