import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PracticeFormComponent } from './practice-form/practice-form.component';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.page.html',
  styleUrls: ['./practice.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    ReactiveFormsModule,
    PracticeFormComponent
  ],
})
export class PracticePage {

  twoPointRateValue: number | null;
  threePointRateValue: number | null;

  constructor() {}

  twoPointRate(rate: any) {
    this.twoPointRateValue = rate.toFixed(1);
  }

  threePointRate(rate: any) {
    this.threePointRateValue = rate.toFixed(1);
  }
}
