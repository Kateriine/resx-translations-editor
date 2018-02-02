import { Component, ComponentRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Translation } from '../../models/Translation';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'translation',
  templateUrl: './translation.component.html'
})
export class TranslationComponent implements OnInit {

  @Input() tItem: FormGroup;
  @Input() tHeads: any[] = [];
  @Input() numValues: any[] = [];

  private fileNum: any[] = [];
  private subject: Subject<boolean> = new Subject();
  @Output() notify: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  constructor() { }

  ngOnInit() {
  }

  removeItem() {
    this.notify.emit(this.tItem);
  }


}
