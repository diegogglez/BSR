import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.page.html',
  styleUrls: ['./practice.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class PracticePage implements OnInit {
  practiceForm: FormGroup;
  drillShootsArr: number[] = [0, 1, 2, 3, 4, 5];

  constructor() {}

  ngOnInit() {
    this.practiceForm = new FormGroup({
      two1: new FormControl('0'),
      two2: new FormControl('0'),
      two3: new FormControl('0'),
      two4: new FormControl('0'),
      two5: new FormControl('0'),
      three1: new FormControl('0'),
      three2: new FormControl('0'),
      three3: new FormControl('0'),
      three4: new FormControl('0'),
      three5: new FormControl('0'),
    });
  }

  onSubmit() {
    const formValue = this.practiceForm.value;
    console.log(formValue);
    const rate = this.shootingRate();
    console.log(rate);
  }

  shootingRate() {
    const formValue = this.practiceForm.value;
    const drillShoots = this.drillShootsArr.length;

    const twoPointRate = () => {
      const success =
        Number(formValue.two1) +
        Number(formValue.two2) +
        Number(formValue.two3) +
        Number(formValue.two4) +
        Number(formValue.two5);

      const totalShoots = drillShoots * 5;
      const successRate = (success / totalShoots) * 100;
      return successRate;
    };

    const threePointRate = () => {
      const success =
        Number(formValue.three1) +
        Number(formValue.three2) +
        Number(formValue.three3) +
        Number(formValue.three4) +
        Number(formValue.three5);
        
      const totalShoots = drillShoots * 5;
      const successRate = (success / totalShoots) * 100;
      return successRate;
    };
    return `two point rate:${twoPointRate().toFixed(1)}%, three point rate:${threePointRate().toFixed(1)}%`;
  }
}
