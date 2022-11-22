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
    return parsedDate.getUTCDate() + " " + this.MONTHS[parsedDate.getUTCMonth()] + " " + parsedDate.getUTCFullYear();
  }
  parseTimestamp(date: Date) {
    var parsedDate = new Date(date);
    return parsedDate.getUTCDate() + " " + this.MONTHS[parsedDate.getUTCMonth()] + ". " + parsedDate.getUTCFullYear() + ", " + parsedDate.getUTCHours() + ":" + parsedDate.getUTCMinutes();
  }
}
