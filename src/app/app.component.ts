import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
// import { Observable } from 'rxjs/Observable';
// import { forkJoin } from "rxjs/observable/forkJoin";
import { FileUploadModule } from 'primeng/primeng';
import { ConverterService } from '../providers/converter.service';
import { AppFormComponent } from '../components/app-form/app-form.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  // uploadedfiles must be different of numTranslations (number of translations): in a csv, there can be multiple translations
  private tHeads: any[] = [];
  uploadedFiles: any[] = [];
  numTranslations : any[] = [];
  fileData: object;
  private msgs: any[];
  private allowed : boolean = true;
  maxFiles = 3;
  @ViewChild(AppFormComponent) appForm: AppFormComponent;

  constructor(public converter: ConverterService){
  }

  ngOnInit() {
    this.resetHeads();
  }

  onSelect(event) {
    //Use onSelect so there are less issues using ng serve; since everything is done client-side, there is no problem :)
    this.msgs = [];
    // check if maximum file number is not exceeded
    if( event.files.length > this.maxFiles || this.uploadedFiles.length + event.files.length > this.maxFiles ) {
      this.allowed = false
    }
    else {
      this.allowed= true
    }
    if(this.allowed) {
      let _app = this;

      // Read in the file
      for(var i = 0; i < event.files.length; i++) {
        var file = event.files[i],
            extension = file.name.split('.').pop().toLowerCase(),
            sameFileType = true,
            msgDetail = '';

        file.ext = extension;
        // if uploaded files are multiple and have different extensions, we stop!
        if(this.uploadedFiles.length > 0) {
          for(var j = 0; j < this.uploadedFiles.length; j++) {
            let uploaded = this.uploadedFiles[this.uploadedFiles.length-1];
            if(uploaded.ext !== file.ext ) {
              sameFileType = false;
              msgDetail = 'You can\'t upload a ' + uploaded.ext + ' file and a ' + file.ext + ' file at the same time. Refresh the page to restart or continue by adding another ' + uploaded.ext + ' file.';
            }
            if(uploaded.ext === 'csv') {
              sameFileType = false;
              msgDetail = 'You can\'t upload more than one ' + uploaded.ext + ' file. Refresh the page to restart or continue by adding another ' + uploaded.ext + ' file.';
            }
          }
          if(!sameFileType) {
            this.msgs.push({severity: 'error', summary: 'Failure!', detail: msgDetail});
            return;
          }
          else {
            _app.readAndUpload(file);
          }
        }
        else {
          _app.readAndUpload(file);
        }
      }
      if(sameFileType) {
        let msgDetail = 'File Uploaded';
        if(event.files.length > 1) {
          msgDetail = 'Files Uploaded'
        }
        this.msgs.push({severity: 'success', summary: 'Success!', detail: msgDetail});
      }
    }
    else {
      event.files.pop();
      this.msgs.push({severity: 'warning', summary: 'Failure: ', detail: 'Please upload '+this.maxFiles+' files maximum'});
    }
  }

  private readAndUpload(file) {
    let _app = this,
        reader = new FileReader();

    // we store the uploaded file and its name for the table header
    // but we don't want to remove the comments
    _app.uploadedFiles.push(file);
    _app.tHeads[_app.uploadedFiles.length-1] = file.name;
    // Closure to capture the file information.
    reader.onload = (function(theFile) {
      return function(e) {
        let res = [];
        // reset the number of languages per item
        _app.numTranslations = [];
        // We store a value to determine the key of the values (value0, value1, value2...)

        switch(theFile.ext) {
          case 'csv':
            // We suppose the csv contains the data of all languages. If not, we'll check it later
            for(var i = 0; i < _app.maxFiles; i++) {
              _app.numTranslations.push(i)
            }
            var array = _app.converter.csvToArray(e.target.result);
            _app.tHeads = array[0];
            _app.tHeads.pop();
            _app.tHeads.shift();
            for(var i = _app.tHeads.length; i > 0; i--) {
              //removing useless table headers + recounting number of languages
              if(_app.tHeads[i] === 'value' + (i-1)){
                _app.tHeads[i] = '';
                _app.numTranslations.pop()
              }
            }
            res = _app.converter.customizeCsvObject(array, _app.maxFiles);
            break;
          case 'resx':
            // if multiple uploaded files, we store the number of languages
            for(var i = 0; i < _app.uploadedFiles.length; i++) {
              _app.numTranslations.push(i)
            }
            res = _app.converter.parseXML(e.target.result);
            break;
          default:
          break;

        }
        // for child component communication
        _app.fileData = {res: res, theFile: theFile};
      };
    })(file);
    reader.readAsText(file);
  }

  private resetHeads(){
    this.tHeads = [];
    for(var i = 0; i < this.maxFiles; i++) {
      this.tHeads.push('');
    }
  }

  private removeFile(event: Event, index: number) {
    this.numTranslations.splice(index, 1);
    this.uploadedFiles.splice(index, 1);
    if(this.uploadedFiles.length ===0){
      this.appForm.resetControls()
      // to be sure, we reset the heads
      this.resetHeads();
    }
    else {
      this.tHeads.splice(index, 1);
      this.tHeads[this.tHeads.length] = '';
    }
  }


  onSave(message):void {
    if(message.type === 'csv') {
      this.saveCsv(message.form);
    }
    else {
      this.saveResx(message.form);
    }
  }


  saveResx(form) {
    for(var i = 0; i < this.numTranslations.length; i++) {
      let tFileEdited = this.converter.createResx(form, i)
      this.download(this.tHeads[i], tFileEdited);
    }
  }

  saveCsv(form) {
    let csv = this.converter.jsonToCsvConvertor(form.value.translations, this.tHeads),
        fileName = 'translations.csv' ;
    //Initialize file format you want csv or xls
    this.download(fileName, csv, 'csv')
  }

  private download(filename, text, type='plain') {
    var blob = new Blob([text], { type: 'text/' + type + ';charset=utf-8;' });

    if (navigator.msSaveBlob) {
      window.navigator.msSaveOrOpenBlob(blob, filename);
    }
    else {
      var a = document.createElement('a');
      if(type){

      }
      var uri = window.URL.createObjectURL(blob);
      a.href = uri;
      a.download = filename;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }
}
