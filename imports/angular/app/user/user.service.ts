import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { MeteorObservable } from 'meteor-rxjs';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { ReplaySubject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class UserService {

  user;
  userId: string;

  userObs = new ReplaySubject<String>(1);

  private autorunSub: Subscription;

  constructor(private router: Router, private zone: NgZone) {
    this.subscribe();
  }

  login(username, password, errorCallback) {
    Meteor.loginWithPassword(username, password, (err) => {
      if (err) {
        errorCallback(err);
      }
    });
  }

  signUp(username, password, errorCallback) {
    Accounts.createUser({ username, password }, (err) => {
      if (err) {
        errorCallback(err);
      }
    });
  }

  logout() {
    Meteor.logout(() => {

    });
  }

  subscribe() {
    if (this.autorunSub) {
      return;
    }

    this.autorunSub = MeteorObservable.autorun().subscribe(() => {
      // User
      this.user = Meteor.user();
      this.userId = Meteor.userId();
      // Emit values
      this.userObs.next(this.userId);
      setTimeout(() => {
        this.goToHome();
      });
    });
  }

  unsubscribe() {
    if (this.autorunSub) {
      this.autorunSub.unsubscribe();
      this.autorunSub = undefined;
      this.userObs.next(null);
    }
  }

  goToHome() {
    this.userObs.pipe(take(1)).subscribe((userId) => {
      this.zone.run(() => {
        if (userId) {
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/login']);
        }
      });
    });
  }

}