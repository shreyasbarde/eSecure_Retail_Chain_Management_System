import { AbstractControl, ValidatorFn } from '@angular/forms';

export class CaptchaEqValidator {

    static captchaEqValidator(expectedCaptcha: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            if (control.value !== undefined && control.value !== expectedCaptcha) {
                return { 'captchaEqValidator': true };
            }
            return null;
        };
    }

    static validateCaptcha(enteredCaptcha: string, expectedCaptcha: string): boolean {
        return enteredCaptcha && enteredCaptcha === expectedCaptcha;
    }
}