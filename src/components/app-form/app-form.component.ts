import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';

@Component({
  selector: 'app-form',
  templateUrl: './app-form.component.html',
  styleUrls: ['./app-form.component.css']
})
export class AppFormComponent implements OnInit {

  @Input() numTranslations: any[] = [];
  @Input() maxFiles: number = 0;
  @Input() uploadedFiles: any[] = [];


  @Output() save: EventEmitter<object> = new EventEmitter<object>();
  @Input() set fileData(fileObject: any) {
    if(this.rForm) {
      this.createControls(fileObject.res, fileObject.theFile)
    }
  }

  private rForm: FormGroup;

  constructor(private fb: FormBuilder, public modal: Modal) { }

  ngOnInit() {
    let _app = this;
    this.resetControls();
  }

  private createControls(resArray, theFile) {
    let _app = this
    let num = null, res = [];
    for(var i = 0; i < this.uploadedFiles.length; i++) {
      if(theFile.name === this.uploadedFiles[i].name) {
        num = i;
      }
    }

    let k,
        tArr = this.rForm.controls.translations as FormArray;
    for(k in resArray) {
      let item = resArray[k], lab = 'value' + num;
      if(theFile.ext === 'csv') {
        this.createCsvTranslationControl(tArr, item);
      }
      else {
        if(num === 0) {
          //if it's the 1st upload and the item doesn't exist, we create it
          this.createTranslationControl(tArr, item, lab);
        }
        else {
          // if it's the 2nd translation or more, the table has already be initialized
          // So we check if an instance already exists.
          // If yes, we replace the values
          if(num) {
            this.editTranslationControl(tArr, item, lab);
          }
        }
      }
    }
  }

  public resetControls(){
    this.rForm = this.fb.group({
      translations: this.fb.array([]),
    });
  }

  private removeTranslation(t: FormGroup) {
    const dialogRef = this.modal.confirm()
        .showClose(true)
        .title('Do you really want to delete the translation '+ t.value.tName +'?')
        .body(`
            <div class="vert-padding text-center">Click "ok" to delete the translation, or cancel if you changed your mind</div>`)
        .open();

    dialogRef.result
        .then((result) => {
            if(result) {
              let tArr = this.rForm.controls.translations as FormArray;
              const index = tArr.controls.indexOf(t);
              if (index !== -1) {
                  tArr.removeAt(index);
              }
            }
          },
          () => {}
        );
  }

  private addTranslation() {
    let translation = {
        tName: 'Choose_a_parameter_name',
        comment: '',
        isEdit: 'true'
      },
      tArr = this.rForm.controls.translations as FormArray;
    for(var j = 0; j < this.maxFiles; j++) {
      translation['value'+j] = '';
    }
    tArr.push(this.fb.group(translation));
  }

  private createTranslationControl(tArr, item, lab){
    let translation = {
          tName : item.$.name
        }

    for(var j = 0; j < this.maxFiles; j++) {
      translation['value'+j] = '';
    }
    translation[lab] = item.value[0]
    if(item.comment)
      translation['comment'] = item.comment[0]

    tArr.push(this.fb.group(translation));
  }

  private editTranslationControl(tArr, item, lab){
    for(var j = 0; j < tArr.controls.length; j++) {
      if(tArr.at(j).value.tName === item.$.name) {
        let translation = tArr.at(j).value;
        translation[lab] = item.value;
        tArr.setControl(j, this.fb.group(translation));
      }
    }
  }

  private createCsvTranslationControl(tArr, item){
    tArr.push(this.fb.group(item));
  }

  private saveResx(form) {
    this.save.emit({form: form, type: 'resx'})
  }

  private saveCsv(form) {
    this.save.emit({form: form, type: 'csv'})
  }
}
