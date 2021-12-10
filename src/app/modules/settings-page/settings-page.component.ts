import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/models';
import { AuthStoreService } from 'src/app/services/store/auth-store.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css'],
})
export class SettingsPageComponent implements OnInit {
  settingForm = new FormGroup({
    image: new FormControl(''),
    username: new FormControl('', Validators.required),
    bio: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private auth: AuthStoreService) {}

  ngOnInit(): void {
    this.auth.currentUser.subscribe((userData) => {
      this.settingForm.patchValue({
        image: userData?.image,
        username: userData?.username,
        bio: userData?.bio,
        email: userData?.email,
      });
    });
  }

  onSubmit() {
    let updateUser: any = {};
    Object.entries(this.settingForm.value).forEach(([key, value]) => {
      let valueData = value ? (value as string) : '';

      if (valueData.trim() != '' && key != 'email') {
        updateUser[key] = valueData;
      }
    });

    console.log(updateUser);

    this.auth.UpdateUser(updateUser);
  }

  onLogout() {
    this.auth.Logout();
  }
}
