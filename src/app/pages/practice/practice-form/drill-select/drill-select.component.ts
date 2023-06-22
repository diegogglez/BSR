import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { IonSelect, IonicModule } from '@ionic/angular';

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

  options: number[] = [0, 1, 2, 3, 4, 5];
  @ViewChild('drillSelect') select!: IonSelect;

  @Input() selected: number;

  public value: number;
  public changed: (value: string) => void;
  public touched: () => void;
  public isDisabled: boolean;

  constructor() { }

  writeValue(value: number): void {
    this.value = value;
  }

  onChange(event: Event): void {
    const value: string = (<HTMLSelectElement>event.target).value;
    this.changed(value);
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
}
