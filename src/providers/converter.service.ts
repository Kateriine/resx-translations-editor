// don't know how to do that :/
import { Injectable } from '@angular/core';

@Injectable()
export class ConverterService {
  private tHeads: any[] = [];
  private numValues : any[] = [];
  private maxFiles;

  constructor() { }

  ngOnInit() {
    this.numValues = [];
    this.tHeads = ['Parameter'];
    for(var i = 0; i < this.maxFiles; i++) {
      this.tHeads.push('');
    }
    this.tHeads.push('comment');
  }

  public get_tHeads() {
    return this.tHeads;
  }
  public get_numValues() {
    return this.numValues;
  }

  public set_tHeads(th) {
    this.tHeads = th;
  }

  public set_Thead(index, value) {
    this.tHeads[index] = value;
  }

  public set_numValues(nv) {
    this.numValues = nv;
  }

  public set_numValue(num) {
    this.numValues[num] = num;
  }

  public set_maxFiles(mF) {
    this.maxFiles = mF;
  }

  public remove_numValue(index) {
    this.numValues.splice(index+1, 1);
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

  public customizeCsvObject(csv) {
    var array = this.csvToArray(csv),
    keys = ['tName'];
    this.tHeads = array[0];
    for(var i = this.tHeads.length; i > 0; i--) {
      //removing useless table headers + recounting number of languages
      if(this.tHeads[i] === 'value' + (i-1)){
        this.tHeads.splice(i, 1);
        this.numValues.pop()
      }
    }
    for(var i = 0; i < this.maxFiles; i++){
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
    console.log(objArray)
    return objArray;
  }

}
