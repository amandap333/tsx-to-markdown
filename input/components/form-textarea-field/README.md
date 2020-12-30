# FormTextareaField

## Usage

```
import { FormTextareaField } from 'bscs-design-system/core'

<FormTextareaField
  id='required-text-area-field'
  label='Required Text Area Field'
  name='Required Text Area Field'
  setValid={(valid) => valid}
  setValue={(value) => value}
/>
```

### List of Props

#### Required

1. id
 - must have a unique id

2. label

3. name

4. setValid

5. setValue

6. ...other

#### Optional

1. invalidMessage
  - default is set to 'Field is required.'

2. optional
   - default is set to `false`

3. visible
   - default is set to `true`
