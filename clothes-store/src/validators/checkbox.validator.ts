
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function atLeastOneCheckBoxChecked(minRequired = 1): ValidatorFn{
    return (formArray: AbstractControl): ValidationErrors | null =>{
        const checkedCount = (formArray.value as boolean[])
        .filter(v => v).length
        return checkedCount >= minRequired ? null : { requireOneChecked: { actual: checkedCount, required: minRequired } };
    }
}
