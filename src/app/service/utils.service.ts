import { Injectable } from '@angular/core';
import {formatDate} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor() { }

  parseTimestampShort(date: Date) {
    return formatDate(date,'d MMM yyyy','en-US');
  }
  parseTimestamp(date: Date) {
    return formatDate(date,'dd MMM. yyyy, hh:mm a','en-US');
  }
}
