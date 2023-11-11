import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BuyerDTO } from 'src/api-client';
import { BuyerService } from 'src/app/services/buyer.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent {
  signupFrom!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private buyerService: BuyerService,
    private snackBarService: SnackBarService,
    private router: Router
  ) {
    this.signupFrom = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public onSubmit() {
    if (this.signupFrom.valid) {
      this.buyerService
        .createBuyer(this.signupFrom.value as BuyerDTO)
        .subscribe({
          next: () => {
            this.snackBarService.openSnackBar('Account created successfully');
            this.router.navigate(['/login']);
          },
          error: (error) => console.log(error),
        });
    }
  }
}
