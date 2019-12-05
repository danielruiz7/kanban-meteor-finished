import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { UserService } from '../user/user.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private us: UserService) { }

  public canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.us.userObs.pipe(
      take(1),
      map((userId: String) => {
        if (!userId) {
          return false;
        }

        return true;
      })
    );
  }
}