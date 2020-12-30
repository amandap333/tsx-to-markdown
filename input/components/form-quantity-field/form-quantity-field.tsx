import React, {
  Dispatch,
  FC,
  FormEvent,
  MouseEvent,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState
} from 'react'

import {
  formatClassList,
  VoidValueCallback
} from '@bscs-dev-team/bscs-design-system-common'


export type FormQuantityFieldProps = {
  defaultQuantity?: number,
  setValue: VoidValueCallback<number>,
  visible?: boolean,
  [other:string]: unknown
}

const CLICKER: string = `
  bg-bscs-indigo-800
  cursor-pointer
  focus:shadow-outline
  inline-block
  p-3
  text-white
`

const MINUS: string = `
  ${CLICKER}
  rounded-l-full
`

const MINUS_ICON: string = `
  fa-minus
  fas
`

const PLUS: string = `
  ${CLICKER}
  rounded-r-full
`

const PLUS_ICON: string = `
  fa-plus
  fas
`

const QUANTITY: string = `
  bg-white
  inline-block
  p-3
  text-base
  text-bscs-gray-800
  text-center
  w-12
`

const handleDecrease = (
  e: MouseEvent,
  setQuantity: Dispatch<SetStateAction<number>>,
  setValue: VoidValueCallback<number>
): void => {
  e.preventDefault()

  setQuantity((quantity:number) => {
    if (quantity === 0) {
      return 0
    }

    const newQuantity = --quantity
    setValue(newQuantity)
    return newQuantity
  })
}

const handleIncrease = (
  e: MouseEvent,
  setQuantity: Dispatch<SetStateAction<number>>,
  setValue: VoidValueCallback<number>
): void => {
  e.preventDefault()

  setQuantity((quantity: number) => {
    const newQuantity = ++quantity
    setValue(newQuantity)
    return newQuantity
  })
}

const validateQuantity = (quantity: number): boolean => {
  if (isNaN(quantity)) return false

  return true
}

const handleChange = (
  e: FormEvent,
  inputRef: RefObject<HTMLInputElement>,
  setQuantity: Dispatch<SetStateAction<number>>
): void => {
  e.preventDefault()

  if (!inputRef || !inputRef.current) {
    return
  }

  setQuantity(parseInt(inputRef.current.value))
}

const FormQuantityField: FC<FormQuantityFieldProps> = ({
  defaultQuantity=1,
  setValue,
  visible=true,
  ...other
}: FormQuantityFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [quantity, setQuantity] = useState<number>(defaultQuantity)

  const formattedDecrease: string = formatClassList(MINUS)
  const formattedMinusIcon: string = formatClassList(MINUS_ICON)
  const formattedIncrease: string = formatClassList(PLUS)
  const formattedPlusIcon: string = formatClassList(PLUS_ICON)
  const formattedQuantity: string = formatClassList(QUANTITY)

  useEffect(() => {
    if (!validateQuantity(quantity)) {
      setQuantity(1)
    }
  }, [quantity])

  return (
    <div {...other}>
      <button
        aria-label='Decrease by One'
        className={formattedDecrease}
        disabled={ visible ? false : true }
        onClick={(e: MouseEvent) => handleDecrease(e, setQuantity, setValue)}
        tabIndex={ visible ? 0 : -1 }
        title='Decrease by One'
      >
        <i className={formattedMinusIcon} />
      </button>
      <input
        className={formattedQuantity}
        ref={inputRef}
        onChange={(e: FormEvent) => handleChange(e, inputRef, setQuantity)}
        value={quantity}
      />
      <button
        aria-label='Increase by One'
        className={formattedIncrease}
        disabled={ visible ? false : true }
        onClick={(e: MouseEvent) => handleIncrease(e, setQuantity, setValue)}
        tabIndex={ visible ? 0 : -1 }
        title='Increase by One'
      >
        <i className={formattedPlusIcon} />
      </button>
    </div>
  )
}

export default FormQuantityField
