import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from "rxjs/observable/forkJoin";
import {FileUploadModule} from 'primeng/primeng';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';

import { LoadXmlService } from '../providers/load-xml.service';
import { Translation } from '../models/Translation';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  private tHeads: any[] = [];
  private rForm: FormGroup;
  private data:any;
  private uploadedFiles: any[] = [];
  private msgs: any[];
  private allowed : boolean = true;
  private maxFiles = 3;
  private numValues : any[] = [];

  constructor(private loadXML: LoadXmlService, private fb: FormBuilder, public modal: Modal){

  }

  ngOnInit() {
    this.rForm = this.fb.group({
      translations: this.fb.array([]),
    });
    this.numValues = [];
    this.tHeads = ['Parameter'];
    for(var i = 0; i < this.maxFiles; i++) {
      this.tHeads.push('');
    }
    this.tHeads.push('comment');

  }

  private onSelect(event) {
    //Use onSelect so there are less issues using ng serve; since everything is done client-side, there is no problem :)
    this.msgs = [];
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
        // if files have different extensions, we stop!
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
    _app.numValues = [];
    _app.uploadedFiles.push(file);
    _app.tHeads[this.uploadedFiles.length] = file.name;

    // Closure to capture the file information.
    reader.onload = (function(theFile) {
      return function(e) {
        // We store a value to determine the key of the values (value0, value1, value2...)
        let num = 0;
        for(var i = 0; i < _app.uploadedFiles.length; i++) {
          if(theFile.name === _app.uploadedFiles[i].name) {
            num = i;
          }
        }
        switch(theFile.ext) {
          case 'csv':
            for(var i = 0; i < _app.maxFiles; i++) {
              _app.numValues.push(i)
            }
            _app.customizeCsvObject(e.target.result);
            break;
          case 'resx':
            for(var i = 0; i < _app.uploadedFiles.length; i++) {
              _app.numValues.push(i)
            }
            _app.parseXML(e.target.result, num);
            break;
          default:
          break;

        }
        //_app.parseXML(e.target.result, num);
      };
    })(file);
    reader.readAsText(file);
  }

  private csvToArray(strData, strDelimiter = ",") {
      // Create a regular expression to parse the CSV values.
      var objPattern = new RegExp((
      // Delimiters.
      "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
      // Quoted fields.
      "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
      // Standard fields.
      "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
      // Create an array to hold our data. Give the array
      // a default empty first row.
      var arrData = [[]];
      // Create an array to hold our individual pattern
      // matching groups.
      var arrMatches = null;
      // Keep looping over the regular expression matches
      // until we can no longer find a match.

      var i = 0;
      while (arrMatches = objPattern.exec(strData)) {

        //we don't take the headers
        //if(i > this.maxFiles + 1){
          // Get the delimiter that was found.
          var strMatchedDelimiter = arrMatches[1];
          // Check to see if the given delimiter has a length
          // (is not the start of string) and if it matches
          // field delimiter. If id does not, then we know
          // that this delimiter is a row delimiter.
          if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
              // Since we have reached a new row of data,
              // add an empty row to our data array.
              arrData.push([]);
          }
          // Now that we have our delimiter out of the way,
          // let's check to see which kind of value we
          // captured (quoted or unquoted).
          if (arrMatches[2]) {
              // We found a quoted value. When we capture
              // this value, unescape any double quotes.
              var strMatchedValue = arrMatches[2].replace(
              new RegExp("\"\"", "g"), "\"");
          } else {
              // We found a non-quoted value.
              var strMatchedValue = arrMatches[3];
          }
          // Now that we have our value string, let's add
          // it to the data array.
          arrData[arrData.length - 1].push(strMatchedValue);
        }
        i++;
      //}
      //if(arrData[arrData.length-1][0] == '')
      // Return the parsed data.
      return (arrData);
  }

  private customizeCsvObject(csv) {
      var array = this.csvToArray(csv),
      keys = ['tName'];
      this.tHeads = array[0];
      for(var i = this.tHeads.length; i > 0; i--) {
        //removing useless table headers
        if(this.tHeads[i] === 'value' + (i-1)){
          this.tHeads.splice(i, 1);
          this.numValues.pop()
        }
      }
      for(var i = 0; i < this.maxFiles; i++){
        keys.push('value' + i);
      }
      keys.push('comment')
      var objArray = [];
      for (var i = 1; i < array.length; i++) {
        let obj = {};

        for (var k = 0; k < keys.length; k++) {
            var key = keys[k];
            obj[key] = array[i][k];
        }
        objArray.push(obj)
      }
      // var json = JSON.stringify(objArray);
      // console.log(json)
      // var str = json.replace(/},/g, "},\r\n");
      // console.log(str)
      this.createControls(objArray);
  }


  private parseXML(fileText, num) {
    var parseString = require('xml2js').parseString,
      _app = this;

      parseString(fileText, function (err, result) {
        var resArray = result.root.data;
        _app.createControls(resArray, num);

      });
  }

  private createControls(resArray, num=null) {
    let k,
        tArr = this.rForm.controls.translations as FormArray,
        _app = this;
    for(k in resArray) {
      let item = resArray[k], lab = 'value' + num;


      if(num === 0) {
        //if it's the 1st upload and the item doesn't exist, we create it
        _app.createTranslationControl(tArr, item, lab);
      }
      else {
        // if it's the 2nd translation or more, the table has already be initialized
        // So we check if an instance already exists.
        // If yes, we replace the values
        if(num) {
          _app.editTranslationControl(tArr, item, lab);
        }
        else {
          // If there is no num, then the uploaded file is csv
          _app.createCsvTranslationControl(tArr, item);
        }
      }
    }
  }

  private removeFile(event: Event, index: number) {
    this.tHeads.splice(index+1, 1);
    this.numValues.splice(index+1, 1);
    this.uploadedFiles.splice(index, 1);
  }

  private createTranslationControl(tArr, item, lab){
    let _app = this,
        translation = {
          tName : item.$.name
        }

    for(var j = 0; j < _app.maxFiles; j++) {
      translation['value'+j] = '';
    }

    translation[lab] = item.value[0]
    if(item.comment)
      translation['comment'] = item.comment[0]

    tArr.push(_app.fb.group(translation));
  }

  private editTranslationControl(tArr, item, lab){
    let _app = this;
    for(var j = 0; j < tArr.controls.length; j++) {
      if(tArr.at(j).value.tName === item.$.name) {
        let translation = tArr.at(j).value;
        translation[lab] = item.value;
        tArr.setControl(j, _app.fb.group(translation));
      }
    }
  }

  private createCsvTranslationControl(tArr, item){
    tArr.push(this.fb.group(item));
  }

  // private save(form, ext) {
  //   switch(ext) {
  //     case 'resx':
  //       this.saveResx(form);
  //       break;
  //     case 'csv':
  //       this.savecsv(form);
  //       break;
  //     default:
  //       break;
  //   }
  // }

  private saveResx(form) {
    let head = `<?xml version="1.0" encoding="utf-8"?>
  <root>
    <xsd:schema id="root" xmlns="" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:msdata="urn:schemas-microsoft-com:xml-msdata">
      <xsd:import namespace="http://www.w3.org/XML/1998/namespace" />
      <xsd:element name="root" msdata:IsDataSet="true">
        <xsd:complexType>
          <xsd:choice maxOccurs="unbounded">
            <xsd:element name="metadata">
              <xsd:complexType>
                <xsd:sequence>
                  <xsd:element name="value" type="xsd:string" minOccurs="0" />
                </xsd:sequence>
                <xsd:attribute name="name" use="required" type="xsd:string" />
                <xsd:attribute name="type" type="xsd:string" />
                <xsd:attribute name="mimetype" type="xsd:string" />
                <xsd:attribute ref="xml:space" />
              </xsd:complexType>
            </xsd:element>
            <xsd:element name="assembly">
              <xsd:complexType>
                <xsd:attribute name="alias" type="xsd:string" />
                <xsd:attribute name="name" type="xsd:string" />
              </xsd:complexType>
            </xsd:element>
            <xsd:element name="data">
              <xsd:complexType>
                <xsd:sequence>
                  <xsd:element name="value" type="xsd:string" minOccurs="0" msdata:Ordinal="1" />
                  <xsd:element name="comment" type="xsd:string" minOccurs="0" msdata:Ordinal="2" />
                </xsd:sequence>
                <xsd:attribute name="name" type="xsd:string" use="required" msdata:Ordinal="1" />
                <xsd:attribute name="type" type="xsd:string" msdata:Ordinal="3" />
                <xsd:attribute name="mimetype" type="xsd:string" msdata:Ordinal="4" />
                <xsd:attribute ref="xml:space" />
              </xsd:complexType>
            </xsd:element>
            <xsd:element name="resheader">
              <xsd:complexType>
                <xsd:sequence>
                  <xsd:element name="value" type="xsd:string" minOccurs="0" msdata:Ordinal="1" />
                </xsd:sequence>
                <xsd:attribute name="name" type="xsd:string" use="required" />
              </xsd:complexType>
            </xsd:element>
          </xsd:choice>
        </xsd:complexType>
      </xsd:element>
    </xsd:schema>
    <resheader name="resmimetype">
      <value>text/microsoft-resx</value>
    </resheader>
    <resheader name="version">
      <value>2.0</value>
    </resheader>
    <resheader name="reader">
      <value>System.Resources.ResXResourceReader, System.Windows.Forms, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089</value>
    </resheader>
    <resheader name="writer">
      <value>System.Resources.ResXResourceWriter, System.Windows.Forms, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089</value>
    </resheader>`;
    for(var i = 0; i < this.uploadedFiles.length; i++) {
      let tFileEdited = head;
      form.value.translations.forEach(x => {

      tFileEdited += `
      <data name="` + x.tName + `" xml:space="preserve">
        <value>` + x['value' + i] + `</value>`;
      if(x.comment){
      tFileEdited += `
        <comment>`+ x.comment + `</comment>`;
      }
      tFileEdited += `
      </data>`;
      });
      tFileEdited += `
  </root>`;
      this.download(this.tHeads[i+1], tFileEdited);
    }
  }

  private saveCsv(form) {
    this.jsonToCsvConvertor(form.value.translations, true);
  }

  private jsonToCsvConvertor(jsonData, showLabel) {

      //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
      let arrData = typeof jsonData != 'object' ? JSON.parse(jsonData) : jsonData;

      let csv = '';

      //This condition will generate the Label/Header
      if (showLabel) {
          var row = "";
          //This loop will extract the label from 1st index of on array
          var i = 0
          for (var index in arrData[0]) {
            let head = index;
            //Now convert each value to string and comma-seprated
            if(this.tHeads[i]){
              head =  this.tHeads[i];
            }
            if(head.indexOf('"')>-1 || head.indexOf(',')>-1) {
              //escaping quotes and semi-colon
              head = head.replace(/"/g, '""');
              head = '"' + head + '"';
            }
            row += head + ',';
            i++;
          }

          row = row.slice(0, -1);

          //append Label row with line break
          csv += row + '\r\n';
      }

      //1st loop is to extract each row
      for (var i = 0; i < arrData.length; i++) {
        var row = "", j = 0;
        //2nd loop will extract each column and convert it in string comma-seprated

        for (var index in arrData[i]) {
          let val = arrData[i][index];
          if(val.indexOf('"')>-1 || val.indexOf(',')>-1) {
            //escaping quotes and semi-colon
            val = val.replace(/"/g, '""');
            val = '"' + val + '"';
          }
          row += val;
          // We set the separato except after the last parameter
          if(j !== Object.keys(arrData[i]).length-1) {
            row += ',';
          }
          j++;
        }
        row.slice(0, row.length - 1);
        csv += row;
        //add a line break after each row except the last one
        if(i !== arrData.length-1) {
          csv += '\r\n';
        }
      }

      if (csv == '') {
        alert("Invalid data");
        return;
      }

      //Generate a file name
      var fileName = 'translations.csv' ;
      //this will remove the blank-spaces from the title and replace it with an underscore
    //  fileName += reportTitle.replace(/ /g,"_");

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
}
