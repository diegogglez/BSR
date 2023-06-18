import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Practice } from 'src/app/models/practice';
import { StorageService } from 'src/app/services/storage.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-practice-form',
  templateUrl: './practice-form.component.html',
  styleUrls: ['./practice-form.component.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    ReactiveFormsModule,
  ],
})
export class PracticeFormComponent  implements OnInit {

  @Output() twoPointRateValue = new EventEmitter<number>();
  @Output() threePointRateValue = new EventEmitter<number>();
  
  private refreshSuscription: Subscription;
  private twoPointSuccess: number;
  private threePointSuccess: number;

  practiceForm: FormGroup;
  drillShootsArr: number[] = [0, 1, 2, 3, 4, 5];
  drillShoots: number = this.drillShootsArr.length - 1;

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    this.practiceForm = new FormGroup({
      two1: new FormControl(null, Validators.required),
      two2: new FormControl(null, Validators.required),
      two3: new FormControl(null, Validators.required),
      two4: new FormControl(null, Validators.required),
      two5: new FormControl(null, Validators.required),
      three1: new FormControl(null, Validators.required),
      three2: new FormControl(null, Validators.required),
      three3: new FormControl(null, Validators.required),
      three4: new FormControl(null, Validators.required),
      three5: new FormControl(null, Validators.required),
    });

    this.refreshSuscription = this.storageService.refresh.subscribe(() => {
      this.practiceForm.reset();
    })
  }

  onSubmit() {
    this.shootingRate();
    this.savePractice();
  }

  shootingRate() {
    this.threePointRate();
    this.twoPointRate();    
  }

  threePointRate() {
    const formValue = this.practiceForm.value;
    const success =
      Number(formValue.three1) +
      Number(formValue.three2) +
      Number(formValue.three3) +
      Number(formValue.three4) +
      Number(formValue.three5);

    const totalShoots = this.drillShoots * 5;
    const successRate = (success / totalShoots) * 100;
    this.threePointSuccess = Math.round(successRate);
    this.threePointRateValue.emit(Math.round(successRate));    
  }
  
  twoPointRate() {
    const formValue = this.practiceForm.value;
    const success =
      Number(formValue.two1) +
      Number(formValue.two2) +
      Number(formValue.two3) +
      Number(formValue.two4) +
      Number(formValue.two5);

    const totalShoots = this.drillShoots * 5;
    const successRate = (success / totalShoots) * 100;
    this.twoPointSuccess = Math.round(successRate);
    this.twoPointRateValue.emit(Math.round(successRate));
  }

  totalRate() {
    const formValue = this.practiceForm.value;
    const success =
      Number(formValue.two1) +
      Number(formValue.two2) +
      Number(formValue.two3) +
      Number(formValue.two4) +
      Number(formValue.two5) +
      Number(formValue.three1) +
      Number(formValue.three2) +
      Number(formValue.three3) +
      Number(formValue.three4) +
      Number(formValue.three5) ;
    
    const totalShoots = this.drillShoots * 10;
    const successRate = (success / totalShoots) * 100;
    return Math.round(successRate);
  }

  generateDate() {
    const date = new Date();
    const day = date.toLocaleDateString();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${day} ${hours}:${minutes < 10 ? `0${minutes}` : minutes}`; 
  }

  async getProgress() {
    const history = await this.storageService.getPractices();
    if (history.length) {
      const lastPracticeRate = history[0].totalRate;
      const progress = this.totalRate() - lastPracticeRate;

      if (Math.sign(progress) === 1) {
        return `+${progress}`
      } else {      
        return `${progress}`;
      }
    } else {
      return null;
    }
  }

  async savePractice() {
    this.getProgress();
    const practice: Practice = {
      id: uuidv4(),
      twoPointRate: this.twoPointSuccess,
      threePointRate: this.threePointSuccess,
      totalRate: this.totalRate(),
      rateProgress: await this.getProgress(),
      date: this.generateDate(),
    }
    console.log(practice);
    
    await this.storageService.addPractice(practice);
  }
}
