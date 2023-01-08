import { UrlSegment } from "@angular/router";
import { BehaviorSubject } from "rxjs";

export class MockActivatedRoute{
    url = new BehaviorSubject<UrlSegment>(new UrlSegment("https://localhost:8000",{
        "name":"profile"}));
}