import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, IonHeader, IonToolbar,IonTitle, IonContent, IonButtons, IonCard, IonAvatar, IonChip, IonIcon, IonLabel, IonImg, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonFooter, IonButton, IonInput, IonSelect, IonSelectOption, IonTextarea } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonTextarea, IonAvatar, IonCard, IonChip, IonIcon, IonLabel,  IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,IonImg, IonItem, IonFooter, IonButton, IonInput, IonLabel, IonSelect, IonSelectOption],

})
export class ChangePasswordComponent {
  passwordForm: FormGroup;
  private modalController = inject(ModalController);

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  dismissModal(data: any = null) {
    this.modalController.dismiss(data);
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      const { currentPassword, newPassword, confirmPassword } = this.passwordForm.value;

      if (newPassword !== confirmPassword) {
        console.error('Passwords do not match!');
        this.dismissModal("Passwords do not match"); // Close the modal after successful submission
      }
      console.log('Saving Password..');
      this.dismissModal(this.passwordForm.value); // Close the modal after successful submission
      
    }
  }
}