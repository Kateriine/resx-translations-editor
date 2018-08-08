// don't know how to do that :/
import { Injectable } from '@angular/core';

@Injectable()
export class ConverterService {

  constructor() {}

  public csvToArray(strData, strDelimiter = ",") {
      // Create a regular expression to parse the CSV values.
      var objPattern = new RegExp((
      // Delimiters.
      "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
      // Quoted fields.
      "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
      // Standard fields.
      "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
      // Create an array to hold our data. Give the array a default empty first row.
      var arrData = [[]];
      // Create an array to hold our individual pattern matching groups.
      var arrMatches = null;
      // Keep looping over the regular expression matches until we can no longer find a match.
      while (arrMatches = objPattern.exec(strData)) {
        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[1];
        // Check to see if the given delimiter has a length (is not the start of string) and if it matches field delimiter. If id does not, then we know that this delimiter is a row delimiter.
        if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
            // Since we have reached a new row of data, add an empty row to our data array.
            arrData.push([]);
        }
        // Now that we have our delimiter out of the way, let's check to see which kind of value we captured (quoted or unquoted).
        if (arrMatches[2]) {
            // We found a quoted value. When we capture this value, unescape any double quotes.
            var strMatchedValue = arrMatches[2].replace(
            new RegExp("\"\"", "g"), "\"");
        } else {
            // We found a non-quoted value.
            var strMatchedValue = arrMatches[3];
        }
        // Now that we have our value string, let's add it to the data array.
        arrData[arrData.length - 1].push(strMatchedValue);
      }
    return (arrData);
  }

  public customizeCsvObject(array, maxFiles) {
    let keys = ['tName'];

    for(var i = 0; i < maxFiles; i++){
      keys.push('value' + i);
    }
    keys.push('comment');
    var objArray = [];
    for (var i = 1; i < array.length; i++) {
      let obj = {};

      for (var k = 0; k < keys.length; k++) {
          var key = keys[k];
          obj[key] = array[i][k];
      }
      objArray.push(obj)
    }
    return objArray;
  }

  public parseXML(fileText) {
    var parseString = require('xml2js').parseString,
      res = [],
      _app = this;
    parseString(fileText, function (err, result) {
      res = result.root.data;
    });
    return res;
  }

  public createResx(form, i) {
    let head = `<?xml version="1.0" encoding="utf-8"?>
<root>
  <!-- 
    Microsoft ResX Schema 
    
    Version 2.0
    
    The primary goals of this format is to allow a simple XML format 
    that is mostly human readable. The generation and parsing of the 
    various data types are done through the TypeConverter classes 
    associated with the data types.
    
    Example:
    
    ... ado.net/XML headers & schema ...
    <resheader name="resmimetype">text/microsoft-resx</resheader>
    <resheader name="version">2.0</resheader>
    <resheader name="reader">System.Resources.ResXResourceReader, System.Windows.Forms, ...</resheader>
    <resheader name="writer">System.Resources.ResXResourceWriter, System.Windows.Forms, ...</resheader>
    <data name="Name1"><value>this is my long string</value><comment>this is a comment</comment></data>
    <data name="Color1" type="System.Drawing.Color, System.Drawing">Blue</data>
    <data name="Bitmap1" mimetype="application/x-microsoft.net.object.binary.base64">
        <value>[base64 mime encoded serialized .NET Framework object]</value>
    </data>
    <data name="Icon1" type="System.Drawing.Icon, System.Drawing" mimetype="application/x-microsoft.net.object.bytearray.base64">
        <value>[base64 mime encoded string representing a byte array form of the .NET Framework object]</value>
        <comment>This is a comment</comment>
    </data>
                
    There are any number of "resheader" rows that contain simple 
    name/value pairs.
    
    Each data row contains a name, and value. The row also contains a 
    type or mimetype. Type corresponds to a .NET class that support 
    text/value conversion through the TypeConverter architecture. 
    Classes that don't support this are serialized and stored with the 
    mimetype set.
    
    The mimetype is used for serialized objects, and tells the 
    ResXResourceReader how to depersist the object. This is currently not 
    extensible. For a given mimetype the value must be set accordingly:
    
    Note - application/x-microsoft.net.object.binary.base64 is the format 
    that the ResXResourceWriter will generate, however the reader can 
    read any of the formats listed below.
    
    mimetype: application/x-microsoft.net.object.binary.base64
    value   : The object must be serialized with 
            : System.Runtime.Serialization.Formatters.Binary.BinaryFormatter
            : and then encoded with base64 encoding.
    
    mimetype: application/x-microsoft.net.object.soap.base64
    value   : The object must be serialized with 
            : System.Runtime.Serialization.Formatters.Soap.SoapFormatter
            : and then encoded with base64 encoding.

    mimetype: application/x-microsoft.net.object.bytearray.base64
    value   : The object must be serialized into a byte array 
            : using a System.ComponentModel.TypeConverter
            : and then encoded with base64 encoding.
    -->
  <xsd:schema id="root" 
    xmlns="" 
    xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
    xmlns:msdata="urn:schemas-microsoft-com:xml-msdata">
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

    return tFileEdited;
  }

  public jsonToCsvConvertor(jsonData, tHeads, showLabel=true) {
      //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
      let arrData = typeof jsonData != 'object' ? JSON.parse(jsonData) : jsonData;
      let csv = '\uFEFF';

      //This condition will generate the Label/Header
      if (showLabel) {
          //This loop will extract the label from 1st index of on array
          var i = 0, row = '';
          for (var index in arrData[0]) {
            let head = '';
            //Now convert each value to string and comma-seprated
            if(i === 0) {
              head = 'Parameter';
            }
            else {
              head = index;
            }
            if(tHeads[i-1]){
              head =  tHeads[i-1];
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

          // to investigate: line-break in cell breaks csv
          // if(val.indexOf('\r\n')>-1) {
          //   val = val.replace(/\r\n/ig, "<br>");
          // }
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
      return csv;
  }
}
