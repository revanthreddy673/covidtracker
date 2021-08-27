import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../modelclass/admin.model';
import { Guest } from '../modelclass/guest.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private htttp: HttpClient) {}

  loginAdmin(admin: Admin) {
    return this.htttp.post('http://localhost:8080/admin/login', admin, {
      responseType: 'text',
    });
  }

  guestLogin(guest: Guest) {
    return this.htttp.post('http://localhost:8080/guest/login', guest, {
      responseType: 'text',
    });
  }
}
