import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { CrudService } from '../crud.service';
import { ActionSheetController } from '@ionic/angular';
import { ImagePicker ,ImagePickerOptions} from '@awesome-cordova-plugins/image-picker/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { Camera , CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { DomSanitizer } from '@angular/platform-browser';
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
  imageurl: any;
  securepath: any = window;
  url: any;

  constructor(
    private sqlite: SQLite,
    private fb: FormBuilder,
    private crud: CrudService,
    private actionsheet: ActionSheetController,
    private camera: Camera,
    private file:File,
    private imagepicker:ImagePicker,
    private crop:Crop,
    private domsanitize:DomSanitizer
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
    // console.log(this.crud.getAllUsers());
  }

  createUser() {
    // console.log("fdsfdf"+this.name, this.email, this.dob);

    this.crud.addItem(this.name, this.email, this.dob);
  }
  async selectimageOptions() {
    const actionsheet = await this.actionsheet.create({
      header: 'Select image Source',
      buttons: [
        {
          text: 'Load from Gallery',
          handler: () => {
            this.pickImagesFromLibrary();
            console.log('Image Selected from Gallery');
          },
        },
        {
          text: 'Select Camera',
          handler: () => {
            this.chooseFromCamera(this.camera.PictureSourceType.CAMERA);
            console.log('Camera Selected');
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });
    await actionsheet.present();
  }

  chooseFromCamera(sourceType){
    const options: CameraOptions = {
       quality: 100,
       mediaType: this.camera.MediaType.PICTURE,
       destinationType: this.camera.DestinationType.FILE_URI,
       encodingType: this.camera.EncodingType.JPEG,
       sourceType: sourceType,
    };

    this.camera.getPicture(options).then((result) => {
      console.log('Camera URL',result);
      // this.imageurl = result;
      this.imageurl = this.securepath.Ionic.WebView.convertFileSrc(result);
      // this.imageurl = 'data:image/jpeg;base64,'+result;
    }, error=>{
      console.log('Error CAMERA', error);
    });
  }

  santizeUrl(imageUrl){
    return this.domsanitize.bypassSecurityTrustUrl(imageUrl);
  }

  pickImagesFromLibrary(){
    const options: ImagePickerOptions = {
      quality: 100,
      maximumImagesCount: 1,
    };
    this.imagepicker.getPictures(options).then((imageresult)=> {
    console.log('image Picker Results', imageresult);

     for(let i=0; i<imageresult.length; i++){
      this.url = this.securepath.Ionic.WebView.convertFileSrc(imageresult[i]);
     }
    }, rror=>{
      console.log('Image Picker Error:', rror);
    });
  }

  // remove(user) {
  //   this.crud.deleteUser(user);
  // }
}
