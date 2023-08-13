import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage/storage.service';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TutorialComponent  implements OnInit {

  constructor(
    private modalController: ModalController,
    private storageService: StorageService
  ) { }

  ngOnInit() {}

  onClose() {
    this.modalController.dismiss();
    this.storageService.updateTutorialSettings();
  }
}
