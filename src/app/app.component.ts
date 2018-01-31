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
  private maxFiles = 3

  constructor(private loadXML: LoadXmlService, private fb: FormBuilder, public modal: Modal){

  }

  ngOnInit() {
    this.rForm = this.fb.group({
      translations: this.fb.array([]),
    });
    this.tHeads = ['Parameter'];
  }

  private onUpload(event) {
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
            reader = new FileReader();

        this.uploadedFiles.push(file);
        _app.tHeads.push(file.name);

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
            _app.parseXML(e.target.result, num);
          };
        })(file);
        reader.readAsText(file);

      }
      let msgDetail = 'File Uploaded';
      if(event.files.length > 1) {
        msgDetail = 'Files Uploaded'
      }
      this.msgs.push({severity: 'success', summary: 'Success!', detail: msgDetail});
    }
    else {
      event.files.pop();
      this.msgs.push({severity: 'warning', summary: 'Failure: ', detail: 'Please upload '+this.maxFiles+' files maximum'});
    }
  }

  private parseXML(fileText, num) {
    var parseString = require('xml2js').parseString,
      tArr = this.rForm.controls.translations as FormArray,
      _app = this;

      var k,
          arr    = [],
          parser = require('xml2js').parseString;
      parseString(fileText, function (err, result) {
        var resArray = result.root.data;

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
            _app.editTranslationControl(tArr, item, lab);
          }
        }
      });
  }

  private removeFile(event: Event, index: number) {
    this.tHeads.splice(index+1, 1);
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

  private save(form) {
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

  private download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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
