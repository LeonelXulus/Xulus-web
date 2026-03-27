import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import emailjs from '@emailjs/browser';
import { environment } from '../../enviroment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitting = false;
  attempts = 0;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      message: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.contactForm.invalid) {
      this.openSnackBar('Please fill in all required fields correctly.', 'error');
      return;
    }

    if (this.attempts >= 5) {
      this.openSnackBar('You have reached the maximum number of attempts (5).', 'error');
      return;
    }

    this.isSubmitting = true;

    try {
      const result = await emailjs.send(
        environment.emailjsServiceId,
        environment.emailjsTemplateId,
        {
          from_name: this.contactForm.value.name,
          from_email: this.contactForm.value.email,
          phone: this.contactForm.value.phone,
          subject: this.contactForm.value.subject,
          message: this.contactForm.value.message,
        },
        environment.emailjsPublicKey
      );

      console.log('Email sent', result);
      this.openSnackBar('Message sent successfully!', 'success');
      this.contactForm.reset();
    } catch (error) {
      console.error('Error sending email', error);
      this.openSnackBar('An error occurred. Please try again.', 'error');
    } finally {
      this.attempts++;
      this.isSubmitting = false;
    }
  }

  private openSnackBar(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'X', {
      duration: 5000,
      panelClass: type === 'success' ? ['custom-snackbar', 'snackbar-success'] : ['custom-snackbar', 'snackbar-error'],
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
  }
}