
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function noWhiteSpaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value as string;
        if(value && /\s/.test(value)) {
          return { hasSpaces: true }; // Retorna um erro se houver espaços
        }
        return null;
    };
}

