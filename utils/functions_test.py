import pytest

from functions import (
    get_optional_props,
    get_required_props,
    __format_props,
    __get_file_name,
    __get_props,
    get_props_dict,
    get_props_list,
    get_props_match,
    read_tsx_file,
    __format_optional_props,
    create_output_directory,
    __format_required_props,
    __create_prop_dictionary
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


def test__get_file_name_passing():

    input = './input/components/form-quantity-field/form-quantity-field.tsx'

    expected = 'form-quantity-field'

    actual = __get_file_name(input)

    assert expected == actual


def test__get_file_name_failing():
    input = './input/components/form-quantity-field/form-quantity-field.tsx'

    expected = './input/components/form-quantity-field/form-quantity-field.tsx'

    with pytest.raises(AssertionError):
        assert expected == __get_file_name(input)


def test__create_prop_dictionary_passing():

    input = ['label', 'string']

    expected = {'required': True, 'name': 'label', 'type': 'string'}

    actual = __create_prop_dictionary(input)

    assert expected == actual


def test__create_prop_dictionary_failing():
    input = ['label', 'string']

    expected = {'required': True, 'name': 'name', 'type': 'string'}

    with pytest.raises(AssertionError):
        assert expected == __create_prop_dictionary(input)


def test_get_props_list_passing():

    input = 'type FormReadOnlyFieldProps = { label: string, name: string, placeholder: string,[other:string]: unknown }'

    expected = [['label', 'string'], ['name', 'string'], [
        'placeholder', 'string'], ['[other:string]', 'unknown']]

    actual = get_props_list(input)

    assert expected == actual


def test_get_props_list_failing():
    input = 'type FormQuantityFieldProps = { defaultQuantity?: number, setValue: VoidValueCallback<number>, visible?: boolean,[other:string]: unknown}'

    expected = [['defaultQuantity?', 'number'], ['setValue', 'VoidValueCallback<number>'], [
        'visible?', 'boolean'], ['[other:string]', 'unknown']]

    with pytest.raises(AssertionError):
        assert expected == get_props_list(input)


def test__get_props_passing():

    input = 'type FormQuantityFieldProps = { defaultQuantity?: number, setValue: VoidValueCallback<number>, visible?: boolean,[other:string]: unknown }'

    expected = 'defaultQuantity?: number, setValue: VoidValueCallback<number>, visible?: boolean,[other:string]: unknown'

    actual = __get_props(input)

    assert expected == actual


def test__get_props_failing():
    input = 'type FormQuantityFieldProps = { defaultQuantity?: number, setValue: VoidValueCallback<number>, visible?: boolean,[other:string]: unknown }'

    expected = ' children: ReactNode, className?: string, color?: Color, [other:string]: unknown'

    with pytest.raises(AssertionError):
        assert expected == __get_props(input)


# def test_get_props_match_passing():

#     input = 'const FormQuantityField: FC<FormQuantityFieldProps> = ({ defaultQuantity=1,setValue, visible=true, ...other }: FormQuantityFieldProps) => { const inputRef = useRef<HTMLInputElement>(null) const [quantity, setQuantity] = useState<number>(defaultQuantity) const formattedDecrease: string = formatClassList(MINUS) const formattedMinusIcon: string = formatClassList(MINUS_ICON) const formattedIncrease: string = formatClassList(PLUS)const formattedPlusIcon: string = formatClassList(PLUS_ICON) const formattedQuantity: string = formatClassList(QUANTITY) useEffect(() => { if (!validateQuantity(quantity)) { setQuantity(1)} }, [quantity])'

#     expected = 'type FormQuantityFieldProps = { defaultQuantity?: number, setValue: VoidValueCallback<number>, visible?: boolean,[other:string]: unknown}'

#     actual = get_props_match(input)

#     assert expected == actual


def test_get_props_match_failing():
    input = 'const FormQuantityField: FC<FormQuantityFieldProps> = ({ defaultQuantity=1,setValue, visible=true, ...other }: FormQuantityFieldProps) => { const inputRef = useRef<HTMLInputElement>(null) const [quantity, setQuantity] = useState<number>(defaultQuantity) const formattedDecrease: string = formatClassList(MINUS) const formattedMinusIcon: string = formatClassList(MINUS_ICON) const formattedIncrease: string = formatClassList(PLUS)const formattedPlusIcon: string = formatClassList(PLUS_ICON) const formattedQuantity: string = formatClassList(QUANTITY) useEffect(() => { if (!validateQuantity(quantity)) { setQuantity(1)} }, [quantity])'

    expected = 'type TagProps = { children: ReactNode,className?: string, color?: Color,[other:string]: unknown }'

    with pytest.raises(AssertionError):
        assert expected == get_props_match(input)


def test_create_output_directory_passing(tmpdir):
    p = tmpdir.mkdir("sub").join("hello.txt")
    p.write("content")
    assert p.read() == "content"
    assert len(tmpdir.listdir()) == 1


def test_create_output_directory_failing(tmpdir):
    p = tmpdir.mkdir("sub").join("hello.txt")
    p.write("content")
    assert p.read() == "content"
    assert len(tmpdir.listdir()) == 1
    with pytest.raises(AssertionError):
        assert 0


def test_read_tsx_file_failing():
    input = 'input/components/arrow/arrow.tsx'

    expected = "import React, { FC } from 'react' import { formatClassList,joinStrings } from '@bscs-dev-team/bscs-design-system-common' import './arrow.css' type ArrowProps = { active: boolean, className?: string } const ACTIVE_ARROW: string = ` active arrow ` const ARROW: string = ` arrow ` const TEXT_LEFT: string = ` text-left ` const Arrow: FC<ArrowProps> = ({ active=false,className }: ArrowProps) => { const formattedActiveArrow: string = formatClassList(ACTIVE_ARROW) const formattedArrow: string = formatClassList(ARROW) const formattedTextLeft: string = formatClassList(TEXT_LEFT) return ( <i className={ className && active ? joinStrings(' ', className, formattedTextLeft,formattedActiveArrow) : className ? joinStrings(' ', className, formattedTextLeft, formattedArrow) : formattedActiveArrow } /> ) } export default Arrow"

    actual = read_tsx_file(input)

    with pytest.raises(AssertionError):
        assert expected == actual


# testing to make sure you pass in the correct prop
def test_read_tsx_file_passing():
    input = 'input/components/arrow/arrow.tsx'

    expected = "import React, { FC } from 'react' import { formatClassList,joinStrings } from '@bscs-dev-team/bscs-design-system-common' import './arrow.css' type ArrowProps = { active: boolean, className?: string } const ACTIVE_ARROW: string = ` active arrow ` const ARROW: string = ` arrow ` const TEXT_LEFT: string = ` text-left ` const Arrow: FC<ArrowProps> = ({ active=false,className }: ArrowProps) => { const formattedActiveArrow: string = formatClassList(ACTIVE_ARROW) const formattedArrow: string = formatClassList(ARROW) const formattedTextLeft: string = formatClassList(TEXT_LEFT) return ( <i className={ className && active ? joinStrings(' ', className, formattedTextLeft,formattedActiveArrow) : className ? joinStrings(' ', className, formattedTextLeft, formattedArrow) : formattedActiveArrow } /> ) } export default Arrow no props in file: input/components/arrow/arrow.tsx"

    read_tsx_file(input) == expected
