# Launch Modal

## Usage

```
<LaunchModal
  as='span'
  blurId='docs-root'
  inline={false}
  modalId='test'
  render={<span>Click Me to Open Modal</span>}
  title='Modal 3'
/>
```

### List of Props

#### Required

1. children
2. modalId
3. title

#### Optional

1. variant
2. callback
3. button
4. blurId
5. as
6. size
7. launchText
8. launchClassName
9. render
10. inline
11. className
12. ...other

# Modal

## Usage

```
<Modal
  aria-label='modal'
  blurId={blurId}
  id={modalId}
  showModal={showModal}
  setModalClosed={() => handleModalClose(launchRef, setShowModal)}
  setModalOpen={() => setShowModal(true)}
  title={title}
>
  {children}
</Modal>
```

### List of Props

#### Required

1. children
2. id
3. showModal
4. setModalClosed
5. setModalOpen,
6. title

#### Optional

1. blurId
2. ...otther