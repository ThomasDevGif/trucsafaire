import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ToolbarService {
  private titleSubject = new Subject<string>();
  private routeSubject = new Subject<string>();
  private hasReturnSubject = new Subject<boolean>();

  setHasReturn(hasReturn: boolean) {
    this.hasReturnSubject.next(hasReturn);
  }

  getHasReturn(): Observable<boolean> {
    return this.hasReturnSubject.asObservable();
  }

  setRoute(route: string){
    this.routeSubject.next(route);
  }

  clearRoute() {
    this.routeSubject.next();
  }

  getRoute() : Observable<string> {
    return this.routeSubject.asObservable();
  }

  setTitle(title: string){
    this.titleSubject.next(title);
  }

  clearTitle() {
    this.titleSubject.next();
  }

  getTitle() : Observable<any> {
    return this.titleSubject.asObservable();
  }
}
