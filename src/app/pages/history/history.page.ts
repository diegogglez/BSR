import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { Practice } from 'src/app/models/practice';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HistoryPage {

  refreshSuscription: Subscription;
  public history: Practice[] = [];

  constructor(
    private storageService: StorageService,
    private alertController: AlertController) { }

  ionViewWillEnter() {
    this.getHistory();
    this.refreshSuscription = this.storageService.refresh.subscribe(() => {
      this.getHistory();
    })
  }

  async presentAlert(item: Practice) {
    const alert = await this.alertController.create({
      header: 'Do you want to delete this item?',
      message: 'Once you delete it, there is no going back.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler: () => this.deletePractice(item)
        }
      ]
    });
    await alert.present();
  }

  async getHistory() {
    this.history = await this.storageService.getPractices();
  }

  getSign(value: string): boolean {
    const valueArr = value.split('');
    const isPositive = (item: string) => {
      return item === '+' ? true : false;
    }
    return valueArr.some(isPositive);
  }

  async deletePractice(practice: Practice) {
    await this.storageService.deletePractice(practice);
  }
}
