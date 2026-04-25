import { Component, input } from '@angular/core';

@Component({
  selector: 'app-contact-info-card',
  templateUrl: './contact-info-card.component.html',
})
export class ContactInfoCardComponent {
  readonly emoji = input.required<string>();
  readonly label = input.required<string>();
  readonly value = input.required<string>();
  readonly bgColor = input<string>('#ebf1ff');
}
