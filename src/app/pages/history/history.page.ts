import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HistoryPage {

  constructor(private storageService: StorageService) { }

  ionViewWillEnter() {
    this.getHistory();
  }

  async getHistory() {
    const history = await this.storageService.getPractices();
    console.log(history);
    
  }
}
