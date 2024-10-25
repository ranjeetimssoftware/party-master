
import { Injectable } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";
import { Observable, Subject } from "rxjs";
@Injectable({ providedIn: 'root' })
export class SpinnerService {
  public showHideSpinnerSubject = new Subject<any>();
  public keepAfterNavigationChange = false;


  constructor(public router: Router) {
    // clear alert message on route change
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
          this.showHideSpinnerSubject.next(true);
        }
        else {
          // clear loading
          this.showHideSpinnerSubject.next(false);
        }
      }
    });
  }

  getSpinnerShowHide(): Observable<any> {
    return this.showHideSpinnerSubject.asObservable();
  }
  show(loadingMessage : string) {
    this.showHideSpinnerSubject.next({text: loadingMessage, isLoading : true});
  }
  hide() {
    this.showHideSpinnerSubject.next({text: "", isLoading : false});
  }
}
