import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'translation',
  templateUrl: './translation.component.html'
})
export class TranslationComponent {

  @Input() tItem: FormGroup;
  @Input() numTranslations: any[] = [];

  @Output() notify: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  constructor() { }

  removeItem() {
    this.notify.emit(this.tItem);
  }
}
