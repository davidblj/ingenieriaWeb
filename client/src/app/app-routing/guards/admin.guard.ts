import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate() {

    const user = JSON.parse(localStorage.getItem('currentUser'));

    if (user) {
      console.log(user.role);
      if (user.role === 'admin') {
        return true;
      }

      this.router.navigate(['/home']);
      return false;
    }

    this.router.navigate(['/admin-login']);
    return false
  }
}
