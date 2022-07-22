import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { CrudService } from '../crud.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  form: FormGroup;
  submitted = false;
  name: string = '';
  email: string = '';
  dob: Date;

  constructor(
    private sqlite: SQLite,
    private fb: FormBuilder,
    private crud: CrudService
  ) {
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
      dob: [null, [Validators.required]],
      email: [
        null,
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      // password: [null, [Validators.required, Validators.minLength(6)]],
      // confirmPassword: [null, [Validators.required]],
    });
    // this.crud.databaseConn();
  }
  saveDetails() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.name = this.form.value.name;
    this.email = this.form.value.email;
    this.dob = this.form.value.dob;
    console.log(this.form.value);
    
    this.createUser();
  }
  showDetails() {
    this.crud.getAllUsers();
    console.log(this.crud.getAllUsers());
    
  }

  createUser() {
    console.log("fdsfdf"+this.name, this.email, this.dob);
    
    this.crud.addItem(this.name, this.email, this.dob);
  }

  // remove(user) {
  //   this.crud.deleteUser(user);
  // }
}
