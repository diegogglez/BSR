import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { IonSelect, IonicModule, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-drill-select',
  templateUrl: './drill-select.component.html',
  styleUrls: ['./drill-select.component.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DrillSelectComponent),
      multi: true
    }
  ]
})
export class DrillSelectComponent implements ControlValueAccessor{

  public options: any[] = [
    {value: 0, message: 'Keep trying'}, 
    {value: 1, message: 'Ok'}, 
    {value: 2, message: 'Good'}, 
    {value: 3, message: 'Very Good'}, 
    {value: 4, message: 'Nice!'}, 
    {value: 5, message: 'Epic!!'}
  ];

  @ViewChild('drillSelect') select!: IonSelect;
  @Input() selected: number;

  public value: number;
  public changed: (value: string) => void;
  public touched: () => void;
  public isDisabled: boolean;

  constructor(private toastController: ToastController) { }

  writeValue(value: number): void {
    this.value = value;
  }

  onChange(event: Event): void {
    const value: string = (<HTMLSelectElement>event.target).value;
    this.changed(value);
    this.showToast(Number(value))
  }

  registerOnChange(fn: any): void {
    this.changed = fn;
  }

  registerOnTouched(fn: any): void {
    this.touched = fn
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }  

  handleClick() {
    this.select.open();
  }

  async showToast(value: number) {
    const toast = await this.toastController.create({
      message: this.options[value].message,
      duration: 1000,
      position: 'bottom',
      cssClass: 'motivation'
    });
    await toast.present();
  }
}
