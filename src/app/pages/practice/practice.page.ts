import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { PracticeFormComponent } from './practice-form/practice-form.component';
import { Practice } from 'src/app/models/practice';
import { StorageService } from 'src/app/services/storage.service';

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
export class PracticePage implements OnInit{

  public twoPointRateValue: number | null;
  public threePointRateValue: number | null;
  public history: Practice[] = [];


  constructor(
    private storageService: StorageService,
    private toastController: ToastController) {}

  ngOnInit(): void {
    this.getHistory();
  }

  async getHistory() {
    this.history = await this.storageService.getPractices();
  }

  twoPointRate(rate: number) {
    this.twoPointRateValue = rate;
    this.presentToast('bottom');
  }

  threePointRate(rate: number) {
    this.threePointRateValue = rate;
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Practice successfully saved!',
      duration: 2000,
      position: position
    });
    await toast.present();
  }
}
