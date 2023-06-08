import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.page.html',
  styleUrls: ['./practice.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class PracticePage implements OnInit {

  practiceForm: FormGroup;
  drillShoots: number[] = [0, 1, 2, 3, 4, 5, 5];
  
  constructor() { }

  ngOnInit() {
    this.practiceForm = new FormGroup({
      'two-1': new FormControl('0'),
      'two-2': new FormControl('0'),
      'two-3': new FormControl('0'),
      'two-4': new FormControl('0'),
      'two-5': new FormControl('0'),
      'three-1': new FormControl('0'),
      'three-2': new FormControl('0'),
      'three-3': new FormControl('0'),
      'three-4': new FormControl('0'),
      'three-5': new FormControl('0'),
    })
  }

  onSubmit() {
    console.log(this.practiceForm);
  }
}
