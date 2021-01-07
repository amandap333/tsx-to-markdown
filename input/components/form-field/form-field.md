
## Form-field
=============
## Props


### Required:
 - invalidMessage:string
 - label:string
 - setValid:VoidValueCallback<boolean>
 - setValue:VoidValueCallback<string>
 - validator(
    str:string
 - ...other: (string | number | undefined)[]
  ):boolean
 - visible:boolean

### Optional:
 - id:string
 - max:number
 - min:number
 - name:string
 - optional:boolean
 - placeholder:string
 - step:number
 - type:string
 - validatorArgs:(string | number | undefined)[]
 - other:unknown