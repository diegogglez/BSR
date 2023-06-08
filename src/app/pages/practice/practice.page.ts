import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
export class PracticePage implements OnInit {

  constructor() {}

  ngOnInit() {
  }

  twoPointRate(rate: any) {
    console.log('hola', rate);
  }

  threePointRate(rate: any) {
    console.log('hola', rate);
  }
}
