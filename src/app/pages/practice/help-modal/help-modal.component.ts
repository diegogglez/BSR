import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-help-modal',
  templateUrl: './help-modal.component.html',
  styleUrls: ['./help-modal.component.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule
  ],
})
export class HelpModalComponent  implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  close() {
    return this.modalController.dismiss();
  }

}
