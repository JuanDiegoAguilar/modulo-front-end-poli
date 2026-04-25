import { Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
})
export class EmptyStateComponent {
  readonly emoji = input.required<string>();
  readonly title = input.required<string>();
  readonly message = input.required<string>();
}
