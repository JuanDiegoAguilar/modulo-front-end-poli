import { Component, input } from '@angular/core';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
})
export class StatComponent {
  readonly value = input.required<string>();
  readonly label = input.required<string>();
}
