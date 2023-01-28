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
    var am_pm = 'AM';
    var time_hr_value = parsedDate.getUTCHours();
    var time_hr = parsedDate.getUTCHours().toString();
    var time_min = parsedDate.getUTCMinutes().toString();
    if(parsedDate.getUTCHours() >= 12){
      am_pm = 'PM';
      time_hr_value = time_hr_value-12;
    }
    if(time_hr_value<=9){
      time_hr = "0"+time_hr_value.toString();
    }
    
    if(parsedDate.getUTCMinutes()<=9){
      time_min = "0"+parsedDate.getUTCMinutes().toString();
    }
    return parsedDate.getUTCDate() + " " + this.MONTHS[parsedDate.getUTCMonth()] + ". " + parsedDate.getUTCFullYear() + ", " + time_hr + ":" + time_min + " " + am_pm;
  }
}
