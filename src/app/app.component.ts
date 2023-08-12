import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { StorageService } from './services/storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class AppComponent implements OnInit {

  public theme: string = 'bsr-original';

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.getTheme();
  }

  async getTheme() {
    const theme = await this.storageService.getTheme();
    this.theme = theme.value;   
  }


}
