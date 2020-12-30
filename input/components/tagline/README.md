# Tagline

Tagline text that should go directly beneath `<Header />`.

## Usage

```
<Tagline
  tagline="Transforming science education through research-driven innovation"
/>
```

### List of Props

#### Required

- tagline: String containing desired tagline.

#### Optional

- className:
  * Any additional `classNames`.

- closeMenu: state setter function to handle closing NavigationLg menu on click
  * The parent component should have a useEffect hook that sets the
    `closeMenuManually` state variable to `false` whenever the varible changes.
    This will close the menu and reset the click close for next time.

- ...other: Any other attributes that will be passed to the wrapper div.
