import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
  HostBinding,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NgControl, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Renvoie une error de dépendance cyclique quand on utilise inject NgControl.
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => InputComponent),
  //     multi: true
  //   }
  // ],
  host: {
    '[class.toto]': 'ngControl.invalid', // Est-ce vraiment nécessaire au final ? Car les classes ng-touched, ng-invalid, etc. sont automatiquement rajoutées.
  }
})
export class InputComponent implements ControlValueAccessor {
  private onChange?: (value: string) => {};
  private onTouch?: () => {};

  protected readonly value = signal('');

  protected readonly ngControl = inject(NgControl, { self: true });

  constructor() {
    // Technique pour ne pas avoir de dépendance cyclique entre le provider et l'inject NgControl.
    // Trouvé dans le code de material angular.
    this.ngControl.valueAccessor = this;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(value: any): void {
    this.value.set(value);
  }

  protected onNgModelChange(value: string): void {
    this.onChange?.(value);
    this.value.set(value);
  }

  protected onBlur(): void {
    this.onTouch?.();
  }
}
