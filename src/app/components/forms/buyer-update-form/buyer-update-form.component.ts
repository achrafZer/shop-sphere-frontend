import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BuyerDTO } from 'src/api-client';
import { BuyerService } from 'src/app/services/buyer.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-buyer-update-form',
  templateUrl: './buyer-update-form.component.html',
  styleUrls: ['./buyer-update-form.component.scss'],
})
export class BuyerUpdateFormComponent implements OnInit {
  buyerUpdateForm!: FormGroup;
  @Input() buyer!: BuyerDTO;

  constructor(
    private formBuilder: FormBuilder,
    private buyerService: BuyerService,
    private snackBarService: SnackBarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buyerUpdateForm = this.formBuilder.group({
      firstName: [this.buyer.firstName, Validators.required],
      lastName: [this.buyer.lastName, Validators.required],
      address: [this.buyer.address, Validators.required],
      password: ['', Validators.required],
    });
  }

  public onSubmit(): void {
    if (this.buyerUpdateForm.valid) {
      let updatedBuyer = {
        ...this.buyerUpdateForm.value,
        id: this.buyer.id,
        email: this.buyer.email,
      } as BuyerDTO;
      this.buyerService.updateBuyer(updatedBuyer).subscribe({
        next: () => {
          this.snackBarService.openSnackBar(
            'Your information is updated successfully'
          );
          this.router
            .navigate(['/me'])
            .then(() => this.buyerUpdateForm.get('password')?.setValue(''));
        },
        error: () =>
          this.snackBarService.openSnackBar("Can't update information"),
      });
    }
  }
}
