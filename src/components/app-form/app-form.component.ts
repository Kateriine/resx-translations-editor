import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './app-form.component.html',
  styleUrls: ['./app-form.component.css']
})
export class AppFormComponent implements OnInit {

  // @Input() uploadedFiles: any[] = [];
  // @Input() tHeads: any[] = [];
  // private rForm: FormGroup;
  // private numValues : any[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // this.rForm = this.fb.group({
    //   translations: this.fb.array([]),
    // });
    // this.numValues = [];
  }

}
