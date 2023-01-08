import { Component, inject, OnDestroy } from '@angular/core';
import { catchError, concatMap, exhaustMap, map, mergeMap, of, Subject, switchMap, takeUntil } from 'rxjs';
import { IUser, USERS } from 'src/datasource';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  roomUsers: IUser[] = [];
  queueUsers: IUser[] = USERS;
  errorMsg$ = new Subject<string>();

  private _unsubscribeAll$ = new Subject<void>();
  private _switchMapOp$ = new Subject<void>();
  private _mergeMapOp$ = new Subject<void>();
  private _concatMapOp$ = new Subject<void>();
  private _exhaustMapOp$ = new Subject<void>();

  _apiService = inject(ApiService);

  constructor() {
    this.subscribeConcatMap();    
    this.subscribeMergeMap();    
    this.subscribeSwitchMap();    
    this.subscribeExhaustMap();    
  }

  subscribeSwitchMap() {
    this._switchMapOp$.pipe(
      takeUntil(this._unsubscribeAll$),
      catchError(err => {this.errorMsg$.next(err); return of(null)}),
      switchMap(() => {
        // fetch next user from api
        return this._apiService.getNextFromQueue()
      }),
      catchError(err => {this.errorMsg$.next(err); return of(null)}),
      switchMap((usersResp) => {
        if (usersResp) {
          // convert user balance
          return this._apiService.convertUserBalance(usersResp.data.id).pipe(
            takeUntil(this._unsubscribeAll$),
            map(b => {return {...usersResp.data, balance: b.data} as IUser})
          )
        }
        return of(null);
      }),
    ).subscribe((userObj) => {
      if (userObj) {
        this.errorMsg$.next("");
        this.enterRoom(userObj);
      }
    });

  }

  subscribeMergeMap() {
    this._mergeMapOp$.pipe(
      takeUntil(this._unsubscribeAll$),
      catchError(err => {this.errorMsg$.next(err); return of(null)}),
      mergeMap(() => {
        // fetch next user from api
        return this._apiService.getNextFromQueue()
      }),
      catchError(err => {this.errorMsg$.next(err); return of(null)}),
      mergeMap((usersResp) => {
        if (usersResp) {
          // convert user balance
          return this._apiService.convertUserBalance(usersResp.data.id).pipe(
            takeUntil(this._unsubscribeAll$),
            map(b => {return {...usersResp.data, balance: b.data} as IUser})
          )
        }
        return of(null);
      }),
    ).subscribe((userObj) => {
      if (userObj) {
        this.errorMsg$.next("");
        this.enterRoom(userObj);
      }
    });
  }

  subscribeConcatMap() {
    this._concatMapOp$.pipe(
      takeUntil(this._unsubscribeAll$),
      catchError(err => {this.errorMsg$.next(err); return of(null)}),
      concatMap(() => {
        // fetch next user from api
        return this._apiService.getNextFromQueue()
      }),
      catchError(err => {this.errorMsg$.next(err); return of(null)}),
      concatMap((usersResp) => {
        if (usersResp) {
          // convert user balance
          return this._apiService.convertUserBalance(usersResp.data.id).pipe(
            takeUntil(this._unsubscribeAll$),
            map(b => {return {...usersResp.data, balance: b.data} as IUser})
          )
        }
        return of(null);
      }),
    ).subscribe((userObj) => {
      if (userObj) {
        this.errorMsg$.next("");
        this.enterRoom(userObj);
      }
    });
  }

  subscribeExhaustMap() {
    this._exhaustMapOp$.pipe(
      takeUntil(this._unsubscribeAll$),
      catchError(err => {this.errorMsg$.next(err); return of(null)}),
      exhaustMap(() => {
        // fetch next user from api
        return this._apiService.getNextFromQueue()
      }),
      catchError(err => {this.errorMsg$.next(err); return of(null)}),
      exhaustMap((usersResp) => {
        if (usersResp) {
          // convert user balance
          return this._apiService.convertUserBalance(usersResp.data.id).pipe(
            takeUntil(this._unsubscribeAll$),
            map(b => {return {...usersResp.data, balance: b.data} as IUser})
          )
        }
        return of(null);
      }),
    ).subscribe((userObj) => {
      if (userObj) {
        this.errorMsg$.next("");
        this.enterRoom(userObj);
      }
    });
  }

  switchMapOperator() {
    this._switchMapOp$.next();
  }

  mergeMapOperator() {
    this._mergeMapOp$.next();
  }

  concatMapOperator() {
    this._concatMapOp$.next();
  }

  exhaustMapOperator() {
    this._exhaustMapOp$.next();
  }

  enterRoom(user: IUser) {
    console.log("A user enters the room: ", user)
    this.roomUsers.push(user);
    this.queueUsers = this._apiService.getQueue();
  }

  ngOnDestroy() {
    this._unsubscribeAll$.next();
    this._unsubscribeAll$.complete();
  }
}
