import { Component, input } from '@angular/core';

@Component({
  selector: 'app-testimonial-card',
  templateUrl: './testimonial-card.component.html',
})
export class TestimonialCardComponent {
  readonly name = input.required<string>();
  readonly role = input.required<string>();
  readonly quote = input.required<string>();
  readonly initials = input.required<string>();
}
