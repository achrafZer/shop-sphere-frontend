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
        localStorage.setItem('auth-cart', JSON.stringify([]));
        this.router.navigate(['/home']).then(() => window.location.reload());
      },
      error: (error) => console.log(error),
    });
  }

  public logout(): void {
    localStorage.clear();
    this.router.navigate(['/home']).then(() => window.location.reload());
  }

  public isAuthenticatedUser(): boolean {
    return !!localStorage.getItem('auth-data');
  }

  public getUser(): UserConnectedDTO {
    return JSON.parse(
      localStorage.getItem('auth-data') as string
    ) as UserConnectedDTO;
  }
}
