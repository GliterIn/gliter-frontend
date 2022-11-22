import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  MONTHS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
  ];
  constructor() { }

  parseTimestampShort(date: Date) {
    var parsedDate = new Date(date);
    return parsedDate.getDate() + " " + this.MONTHS[parsedDate.getMonth()] + " " + parsedDate.getFullYear();
  }
  parseTimestamp(date: Date) {
    var parsedDate = new Date(date);
    return parsedDate.getDate() + " " + this.MONTHS[parsedDate.getMonth()] + ". " + parsedDate.getFullYear() + ", " + parsedDate.getHours() + ":" + parsedDate.getMinutes();
  }
}
