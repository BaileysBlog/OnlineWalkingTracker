import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatInputModule, MatCardModule, MatProgressSpinnerModule, MatIconModule, MatSnackBarModule, MatMenuModule, MatSidenavModule, MatListModule, MatFormFieldModule, MatGridListModule, MatDialogModule, MatStepperModule, MatNativeDateModule, MatDatepickerModule, MatSliderModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [NgbModule, ReactiveFormsModule, HttpClientModule, MatGridListModule, MatButtonModule, MatToolbarModule, MatInputModule, MatProgressSpinnerModule, MatCardModule, MatIconModule, MatSnackBarModule, MatMenuModule, MatSidenavModule, MatListModule, MatFormFieldModule, MatDialogModule, MatStepperModule, MatNativeDateModule, MatDatepickerModule, MatSliderModule],
  exports: [MatGridListModule, MatButtonModule, MatToolbarModule, MatInputModule, MatProgressSpinnerModule, MatCardModule, MatIconModule, MatSnackBarModule, MatMenuModule, MatSidenavModule, MatListModule, MatFormFieldModule, MatDialogModule, MatStepperModule, MatNativeDateModule, MatDatepickerModule, MatSliderModule],
})
export class MaterialModule { }
