import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  public dbInstance: SQLiteObject;
  USERS: Array<any>;

  constructor(private platform: Platform, private sqlite: SQLite) {
    this.databaseConn();
    // this.getAllUsers();
  }

  // Create SQLite database
  databaseConn() {
    // console.log();
    console.log('inside connection method');
    this.platform.ready().then(() => {
       this.sqlite
        .create({
          name: 'users',
          location: 'default',
        })
        .then((db: SQLiteObject) => {
          this.dbInstance = db;
          db.executeSql("CREATE TABLE IF NOT EXISTS users (name TEXT,email TEXT,dob TEXT)",
            []
          )
            .then((res) => {
              console.log("Executed SQL",res);
              // alert(JSON.stringify(res));
            })
            .catch((error) => console.error(JSON.stringify(error)));
            console.log("Database connected");
            
        })
        .catch((error) => alert(JSON.stringify(error)));
    });
  }

  // Crud
  public addItem(n, e, d) {
    // validation
    // this.databaseConn();
    console.log(n + ' ' + e + ' ' + d);
    console.log(this.dbInstance);
    
    if (!n.length || !e.length || !d.length) {
      alert(n + ' ' + e + ' ' + d + ' ' + 'Provide all details');
      return;
    }
    this.dbInstance
      .executeSql(
        'INSERT INTO users (name, email,dob) VALUES (?,?,?)',
        [n,e,d]
      )
      .then(
        () => {
          // alert('Success');
          console.log("Insert Query Executed");
          // this.getAllUsers();
        },
        (e) => {
          alert(JSON.stringify(e.err));
        }
      );
  }

  getAllUsers() {
    // return new Promise((resolve, reject) => {
      this.dbInstance.executeSql('SELECT * FROM users',[]).then(
        (res) => {
          this.USERS = [];
          if (res.rows.length > 0) {
            for (var i = 0; i < res.rows.length; i++) {
              this.USERS.push(res.rows.item(i));
            }
            return this.USERS;
          }
        },
        (e) => {
          alert(JSON.stringify(e));
        }
      );
    // });
  }

  // Get user
  // getUser(id): Promise<any> {
  //   return this.dbInstance
  //     .executeSql(`SELECT * FROM ${this.db_table} WHERE user_id = ?`, [id])
  //     .then((res) => {
  //       return {
  //         user_id: res.rows.item(0).user_id,
  //         name: res.rows.item(0).name,
  //         email: res.rows.item(0).email,
  //         dob: res.rows.item(0).dob,
  //       };
  //     });
  // }

  // Update
  // updateUser(id, name, email) {
  //   let data = [name, email];
  //   return this.dbInstance.executeSql(`UPDATE ${this.db_table} SET name = ?, email = ? WHERE user_id = ${id}`, data)
  // }

  // Delete
  // deleteUser(user) {
  //   this.dbInstance.executeSql(`
  //   DELETE FROM ${this.db_table} WHERE user_id = ${user}`, [])
  //     .then(() => {
  //       alert("User deleted!");
  //       this.getAllUsers();
  //     })
  //     .catch(e => {
  //       alert(JSON.stringify(e))
  //     });
  // }
}
