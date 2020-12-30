# Header

Indended to be used as top of page UI header with a logo and optional elements
in the top right corner. This will be directly above `<Tagline ... />` and
`<NavigationLg ... />` components if they are used.

## Usage

```
import { Header } from 'bscs-design-system/core'

<Header />
```

### List of Props

#### Optional Props
  - closeMenu: state setter function to handle closing NavigationLg menu on click
    * The parent component should have a useEffect hook that sets the
      `closeMenuManually` state variable to `false` whenever the varible changes.
      This will close the menu and reset the click close for next time.

  - frameworkLinkComponent: component to use for internal links

  - icon: icon to display in top left corner

  - iconAlt: alt text for icon

  - iconLink: link to navigate to on icon click

  - render: JSX to render in top right corner

  - ...other: other attributes to pass to wrapper div element
