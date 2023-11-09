import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BuyerDTO } from 'src/api-client';
import { BuyerService } from 'src/app/services/buyer.service';

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
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.buyerUpdateForm = this.formBuilder.group({
      firstName: [this.buyer.firstName, Validators.required],
      lastName: [this.buyer.lastName, Validators.required],
      address: [this.buyer.address, Validators.required],
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
        next: () => console.log(updatedBuyer),
        error: () => this.openSnackBar(),
      });
    }
  }

  private openSnackBar() {
    this.snackBar.open("Can't update information", 'close', { duration: 3000 });
  }
}
