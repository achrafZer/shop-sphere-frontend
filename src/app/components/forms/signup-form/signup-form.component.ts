import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BuyerDTO, BuyersService } from 'src/api-client';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent {
  signupFrom!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private buyerService: BuyersService,
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
      this.buyerService.createBuyer(this.signupFrom.value as BuyerDTO);
      this.router.navigate(['login']);
    }
  }
}
