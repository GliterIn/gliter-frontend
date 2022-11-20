import { Injectable } from '@angular/core';

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
];

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  parseTimestampShort(date:Date){
    var parsedDate=new Date(date);
    return parsedDate.getDate() + " " + MONTHS[parsedDate.getMonth()] + " " + parsedDate.getFullYear();
  }
  parseTimestamp(date:Date){
    var parsedDate=new Date(date);
    return parsedDate.getDate() + " " + MONTHS[parsedDate.getMonth()] + ". " + parsedDate.getFullYear() + ", " + parsedDate.getHours()+":"+parsedDate.getMinutes();
  }
}
