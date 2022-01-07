import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { SharedService } from '../shared/services/shared.service';
import { apiService } from '../shared/services/apiService.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userProfileForm!: FormGroup;
  userProfile = false;
  userData: any;
  hide = true;
  selectedGender = 0;
  genderError: boolean = false;
  userId: any
  userDetails: any;

  selectedFiles?: FileList;
  selectedFileNames: string[] = [];

  // progressInfos: any[] = [];
  // // message: string[] = [];

  previews: string[] = [];
  // imageInfos?: Observable<any>;

  imageSrc: string = '';

  constructor(
    public sharedService: SharedService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    public apiService: apiService) {
    this.userData = localStorage.getItem('user');
  }

  ngOnInit() {
    this.userForm();
    // console.log('this.userData', this.userData);
    this.sharedService.isLogin = false;
    // this.userProfileForm.controls.name.setValue();
  }

  userForm() {
    this.userProfileForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: [''],
      mobileNo: [''],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      address: ['', Validators.required],
      city: [''],
      state: [''],
      pinCode: [''],
      gender: ['', Validators.required],
      // uploadPhoto: [],
    });
  }

  get rf() { return this.userProfileForm.controls; }

  public errorHandling = (control: string, error: string) => {
    return this.userProfileForm.controls[control].hasError(error);
  }

  updateProfile() {
    let userDetails: FormData = new FormData();
    this.userId = "d6df6735-7ff8-4a4e-bfa8-10c02d0e91f3";
    this.genderValidation();

    console.log('name', this.userProfileForm);

    userDetails.append('UserName', JSON.stringify(this.userProfileForm.value.name));
    userDetails.append('Age', JSON.stringify(this.userProfileForm.value.age));
    userDetails.append('MobileNo', JSON.stringify(this.userProfileForm.value.mobileNo));
    userDetails.append('DateOfBirth', JSON.stringify(this.userProfileForm.value.dob));
    userDetails.append('Email', JSON.stringify(this.userProfileForm.value.email));
    userDetails.append('Password', JSON.stringify(this.userProfileForm.value.password));
    userDetails.append('Address', JSON.stringify(this.userProfileForm.value.address));
    userDetails.append('City', JSON.stringify(this.userProfileForm.value.city));
    userDetails.append('State', JSON.stringify(this.userProfileForm.value.state));
    userDetails.append('Pincode', JSON.stringify(this.userProfileForm.value.pinCode));
    userDetails.append('Gender', JSON.stringify(this.userProfileForm.value.gender));
    userDetails.append('Image', this.imageSrc)
    // formData.append("name", this.userProfileForm.get('name').value);
    // formData.append("avatar", this.userProfileForm.get('avatar').value);

    console.log('formData', userDetails);
    console.log(userDetails.getAll('mycustom'));

    // if (this.userProfileForm.valid == true) {
    //   console.log('calling');
    //   this.genderError = false;

    //  

    //   this.userDetails = {
    //     "userName": this.rf.name.value,
    //     "email": this.rf.email.value,
    //     "password": this.rf.password,
    //     "mobileNo": this.rf.mobileNo,
    //     "age": this.rf.age.value,
    //     "dateOfBirth": this.rf.dob.value,
    //     "address": this.rf.address.value,
    //     "city": this.rf.city.value,
    //     "state": this.rf.state.value,
    //     "pincode": this.rf.pinCode.value,
    //     "gender": this.rf.gender.value,
    //     "image": this.imageSrc
    //   }
    //   console.log('rf', this.userProfileForm);
    //   console.log('userDetails', this.userDetails);

    // this.apiService.userProfile(this.userId, this.userDetails).subscribe(data => {
    //   console.log('data', data);

    // },
    //  err => {
    // this.toastr.error("Internal server Error!");
    // });

    // }
    // else {
    //   console.log('error calling');
    // }
  }

  // selectFiles(event: any): void {
  //   // this.message = [];
  //   this.progressInfos = [];
  //   this.selectedFileNames = [];
  //   this.selectedFiles = event.target.files;
  //   console.log('this.selectedFiles', this.selectedFiles);

  //   this.previews = [];
  //   if (this.selectedFiles && this.selectedFiles[0]) {
  //     const numberOfFiles = this.selectedFiles.length;
  //     for (let i = 0; i < numberOfFiles; i++) {
  //       const reader = new FileReader();

  //       reader.onload = (e: any) => {
  //         this.previews.push(e.target.result);
  //         console.log('this.previews', this.previews);

  //       };
  //       reader.readAsDataURL(this.selectedFiles[i]);
  //       this.selectedFileNames.push(this.selectedFiles[i].name);
  //       console.log('this.selectedFileNames', this.selectedFileNames);

  //     }
  //   }
  // }

  onFileChange(event: any) {
    const reader = new FileReader();
    this.previews = [];
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;

    if (this.selectedFiles && this.selectedFiles[0]) {
      // const [file] = event.target.files;

      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(this.selectedFiles[i]);

        reader.onload = (e: any) => {

          this.imageSrc = reader.result as string;
          // console.log('imageSrc', this.imageSrc);
          this.previews.push(e.target.result);
          // console.log('this.previews', this.previews);

          this.userProfileForm.patchValue({
            fileSource: reader.result
          });

        }
      }
    }
  }

  // uploadFiles() {
  //   // this.message = [];

  //   if (this.selectedFiles) {
  //     for (let i = 0; i < this.selectedFiles.length; i++) {
  //       this.upload(i, this.selectedFiles[i]);
  //     }
  //   }
  // }

  // upload(idx: number, file: File): void {
  //   this.progressInfos[idx] = { value: 0, fileName: file.name };
  //   console.log('this.progressInfos[idx]', this.progressInfos[idx]);

  //   // if (file) {
  //   //   this.uploadService.upload(file).subscribe(
  //   //     (event: any) => {
  //   //       if (event.type === HttpEventType.UploadProgress) {
  //   //         this.progressInfos[idx].value = Math.round(
  //   //           (100 * event.loaded) / event.total
  //   //         );
  //   //       } else if (event instanceof HttpResponse) {
  //   //         const msg = 'Uploaded the file successfully: ' + file.name;
  //   //         this.message.push(msg);
  //   //         this.imageInfos = this.uploadService.getFiles();
  //   //       }
  //   //     },
  //   //     (err: any) => {
  //   //       this.progressInfos[idx].value = 0;
  //   //       const msg = 'Could not upload the file: ' + file.name;
  //   //       this.message.push(msg);
  //   //     }
  //   //   );
  //   // }
  // }

  radioChange(event: MatRadioChange) {
    this.selectedGender = event.value;
    this.rf.gender.setValue(this.selectedGender);
    this.genderValidation();
  }

  genderValidation() {
    if (this.selectedGender <= 0) {
      this.genderError = true
    }
    else {
      this.genderError = false;
    }
  }

  date(e: any) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.rf.dob.setValue(convertDate, {
      onlyself: true
    });
  }


}