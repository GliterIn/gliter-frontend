import { TestBed } from '@angular/core/testing';

import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should parse timestamp short', ()=>{
    expect(service.parseTimestampShort(new Date(1669095632000))).toEqual('22 Nov 2022');
  });
  it('should parse timestamp', ()=>{
    expect(service.parseTimestamp(new Date(1669095632000))).toEqual('22 Nov. 2022, 6:40');
  });
  it('should have 12 months', ()=>{
    expect(service.MONTHS).toHaveSize(12);
  });
  it('should have months in order', ()=>{
    expect(service.MONTHS).toEqual([
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]);
  });
});
