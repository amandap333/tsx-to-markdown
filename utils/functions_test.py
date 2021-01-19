import pytest

from functions import (
    get_optional_props,
    get_required_props,
    __format_props,
    get_props_dict,
    get_props_match,
    __format_optional_props,
    __format_required_props
)


def test_get_optional_props_passing():
    input = [{'required': False, 'name': 'defaultQuantity', 'type': 'number'}, {
        'required': True, 'name': 'setValue', 'type': 'VoidValueCallback<number>'}]

    expected = [
        {'required': False, 'name': 'defaultQuantity', 'type': 'number'}]

    actual = get_optional_props(input)

    assert expected == actual


# testing to make sure required props don't get read as optional
def test_get_optional_props_failing():
    input = [{'required': True, 'name': 'defaultQuantity', 'type': 'number'}, {
        'required': True, 'name': 'setValue', 'type': 'VoidValueCallback<number>'}]

    expected = [{'required': False, 'name': 'setValue',
                 'type': 'VoidValueCallback<number>'}]

    actual = get_optional_props(input)

    with pytest.raises(AssertionError):
        assert expected == actual


def test_get_props_dict_passing():
    input = [['defaultQuantity?', 'number'], [
        'setValue', 'VoidValueCallback<number>']]

    expected = [{'required': False, 'name': 'defaultQuantity', 'type': 'number'}, {
        'required': True, 'name': 'setValue', 'type': 'VoidValueCallback<number>'}]

    actual = get_props_dict(input)

    assert expected == actual


# testing to make sure you pass in the correct prop
def test_get_props_dict_failing():
    input = [{'required': False, 'name': 'defaultQuantity', 'type': 'number'}]

    expected = [
        {'required': False, 'name': 'defaultQuantity', 'type': 'number'}]

    with pytest.raises(TypeError):
        get_props_dict(input) == expected


def test_get_required_props_passing():
    input = [{'required': False, 'name': 'defaultQuantity', 'type': 'number'}, {
        'required': True, 'name': 'setValue', 'type': 'VoidValueCallback<number>'}]

    expected = [{'required': True, 'name': 'setValue',
                 'type': 'VoidValueCallback<number>'}]

    actual = get_required_props(input)

    assert expected == actual


# testing to make sure optional props don't get passed in as a required
def test_get_required_props_failing():
    input = [{'required': False, 'name': 'name', 'type': 'string'},
             {'required': False, 'name': 'title', 'type': 'string'}]

    expected = [{'name': 'name', 'type': 'string'},
                {'name': 'title', 'type': 'string'}]

    actual = get_required_props(input)

    with pytest.raises(AssertionError):
        assert expected == actual


def test__format_required_props_passing():
    input = [{'required': True, 'name': 'name', 'type': 'string'},
             {'required': True, 'name': 'title', 'type': 'string'}]

    expected = [{'name': 'name', 'type': 'string'},
                {'name': 'title', 'type': 'string'}]

    actual = __format_required_props(input)

    assert expected == actual


# testing to make sure optional props don't go into the required array
def test__format_required_props_failing():
    input = [{'required': False, 'name': 'name', 'type': 'string'},
             {'required': True, 'name': 'title', 'type': 'string'}]

    expected = [{'name': 'name', 'type': 'string'},
                {'name': 'title', 'type': 'string'}]

    actual = __format_required_props(input)

    with pytest.raises(AssertionError):
        assert expected == actual


def test__format_optional_props_passing():
    input = [{'required': False, 'name': 'name', 'type': 'string'},
             {'required': False, 'name': 'title', 'type': 'string'}]

    expected = [{'name': 'name', 'type': 'string'},
                {'name': 'title', 'type': 'string'}]

    actual = __format_optional_props(input)

    assert expected == actual


# testing to make sure required props don't work
def test__format_optional_props_failing():
    input = [{'required': False, 'name': 'name', 'type': 'string'},
             {'required': True, 'name': 'title', 'type': 'string'}]

    expected = [[{'name': 'name', 'type': 'string'},
                 {'name': 'title', 'type': 'string'}]]

    actual = __format_optional_props(input)

    with pytest.raises(AssertionError):
        assert expected == actual


def test__format_props_passing():
    input = ['\n  visible?', ' boolean']

    expected = ['visible?', 'boolean']

    actual = __format_props(input)

    assert actual == expected


# test to make sure it takes the correct input
def test__format_props_failing():
    input = [{'required': False, 'name': 'visible', 'type': 'boolean'}]

    expected = [['visible?', 'boolean']]

    with pytest.raises(AttributeError):
        assert expected == __format_props(input)


# def test_get_props_match():
#     assert get_props_match("""const FormQuantityField: FC<FormQuantityFieldProps> = ({
#   defaultQuantity=1,
#   setValue,
#   visible=true,
#   ...other
# }: FormQuantityFieldProps) => {
#   const inputRef = useRef<HTMLInputElement>(null)

#   const [quantity, setQuantity] = useState<number>(defaultQuantity)

#   const formattedDecrease: string = formatClassList(MINUS)
#   const formattedMinusIcon: string = formatClassList(MINUS_ICON)
#   const formattedIncrease: string = formatClassList(PLUS)
#   const formattedPlusIcon: string = formatClassList(PLUS_ICON)
#   const formattedQuantity: string = formatClassList(QUANTITY)

#   useEffect(() => {
#     if (!validateQuantity(quantity)) {
#       setQuantity(1)
#     }
#   }, [quantity])

#   return (
#     <div {...other}>
#       <button
#         aria-label='Decrease by One'
#         className={formattedDecrease}
#         disabled={ visible ? false : true }
#         onClick={(e: MouseEvent) => handleDecrease(e, setQuantity, setValue)}
#         tabIndex={ visible ? 0 : -1 }
#         title='Decrease by One'
#       >
#         <i className={formattedMinusIcon} />
#       </button>
#       <input
#         className={formattedQuantity}
#         ref={inputRef}
#         onChange={(e: FormEvent) => handleChange(e, inputRef, setQuantity)}
#         value={quantity}
#       />
#       <button
#         aria-label='Increase by One'
#         className={formattedIncrease}
#         disabled={ visible ? false : true }
#         onClick={(e: MouseEvent) => handleIncrease(e, setQuantity, setValue)}
#         tabIndex={ visible ? 0 : -1 }
#         title='Increase by One'
#       >
#         <i className={formattedPlusIcon} />
#       </button>
#     </div>
#   )
# }

# export default FormQuantityField""") == """ type FormQuantityFieldProps = {
#   defaultQuantity?: number,
#   setValue: VoidValueCallback<number>,
#   visible?: boolean,
#   [other:string]: unknown
# }
# """
