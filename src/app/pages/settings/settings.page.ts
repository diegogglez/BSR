import { StorageService } from 'src/app/services/storage.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SettingsPage implements OnInit {

  public themes: any[] = [
    {class: 'bsr-original', themeName: 'BSR'},
    {class: 'chicago-bulls', themeName: 'Chicago'},
    {class: 'angeles-lakers', themeName: 'Lakers'},
    {class: 'boston-celtics', themeName: 'Celtics'},
    {class: 'golden-state-warriors', themeName: 'Warriors'},
    {class: 'miami-heat-vice', themeName: 'Miami'},
    {class: 'charlotte-hornets', themeName: 'Hornets'}
  ]

  constructor(private storageService: StorageService) { }

  ngOnInit() {
  }

  async setTheme(theme: string) {
    await this.storageService.setTheme(theme);
    console.log(theme);
    window.location.reload();
  }

  async getTheme() {
    await this.storageService.getTheme();
  }
}
