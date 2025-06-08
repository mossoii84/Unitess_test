import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

export type ModelFormControls<Model> = {
  [Key in keyof Model]: Model[Key] extends (infer D)[]
    ? FormArray<AbstractControl<D | null>> | AbstractControl<D[] | null>
    : Model[Key] extends Date
    ? AbstractControl<Date>
    : AbstractControl<Model[Key] | null> | FormGroup<ModelFormControls<Model[Key]>>;
};