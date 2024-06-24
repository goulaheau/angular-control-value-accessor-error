import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InputComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  readonly formControl = signal(new FormControl('', Validators.required));

  protected onResetClick(): void {
    this.formControl.set(new FormControl('', Validators.required));
  }
}
