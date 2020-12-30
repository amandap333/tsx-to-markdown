# SelectCards

## Usage
`import { SelectCards } from 'bscs-design-system/core'`

`<SelectCards cardData={cards} multiple={true}/>`

Intended for use in forms for a more stylized alternative to radio buttons

### List of Props
#### Required
1. cardData:   
Requires JSON describing cards

Required JSON object properties:
- id: String corresponding to card id. Must be unique.
- title: String where title of card will be displayed.
- description: String where card description will be displayed.
- price: String with unit price. (Dollar sign ($) will be added automatically.)
- unit: String describing price per unit (x). (In example it is price per individual.)

Example JSON   
`[  
  {  
    "id": "vista-plus-student",  
    "title": "ViSTA Plus Teacher Edition",  
    "description": "Information about ViSTA Plus",  
    "price": "50",  
    "unit": "Individual"  
  }  
]`  

**Note:** The JSON file should be an array of these objects.

#### Optional
2. className:  

3. multiple:   
Defaults to `true`
Set to `false` if only one card is desired to be selected at a time.

4. ...other
