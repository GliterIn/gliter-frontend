import { BehaviorSubject } from "rxjs";

export class MockAngularFireAuth{
    onAuthStateChanged():BehaviorSubject<boolean|null>{
        return new BehaviorSubject<boolean|null>(null);
    }
    signInWithPopup():BehaviorSubject<boolean|null>{
        return new BehaviorSubject<boolean|null>(null);
    }
}