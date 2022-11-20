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
    return date.getDate() + " " + MONTHS[date.getMonth()] + " " + date.getFullYear();
  }
  parseTimestamp(date:Date){
    
    return date.getDate() + " " + MONTHS[date.getMonth()] + ". " + date.getFullYear() + ", " + date.getHours()+":"+date.getMinutes();
  }
}
