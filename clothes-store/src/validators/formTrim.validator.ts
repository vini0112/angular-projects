
import { AbstractControl, ValidationErrors } from "@angular/forms";

export function noWhiteSpaceValidator(control: AbstractControl): ValidationErrors | null {
    return control.value && control.value.trim().length === 0 ? {whitespace: true} : null
}

