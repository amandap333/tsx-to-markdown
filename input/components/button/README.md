# Button

## Usage

`
  <Button>
    Sign In&nbsp;<i className="fas fa-sign-in-alt" />
  </Button>

`
### List of Props
#### Required
1. title: A string which is to be displayed on the button
**Passed in as child.** *Sign In* in above example.

#### Optional
2. className: 
Any additional `classNames`

3. disabled:
Defaults to `false`, pass in `true` to make unclickable. 
Will append various classes to show is disabled.

4. size:
Defaults to 'standard', other sizes include:  
- 'lg': Largest size, px-4, py-4, and text-lg classes added
- 'standard': Default size, px-4, py-3, text-base classes added
- 'sm': Smallest size, px-2, py-2, text-base classes added

5. color:
Defaults to 'indigo' other colors include:  
-  'blue'
-  'green'
-  'indigo'
-  'naked'
-  'orange'
-  'outlineblue'
-  'outlinegreen'
-  'outlineindigo'
-  'outlineorange'
-  'outlinered'
-  'outlineviolet'
-  'outlineyellow'
-  'red'
-  'violet'
-  'yellow'

6. ...other
