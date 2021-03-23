import pytest

from functions import (
    create_readme,
    get_optional_props,
    get_required_props,
    __format_props,
    __get_file_name,
    __get_props,
    get_files,
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
#     expected = 'type FormQuantityFieldProps = { defaultQuantity?: number, setValue: VoidValueCallback<number>, visible?: boolean,[other:string]: unknown}'

#     actual = get_props_match('const FormQuantityField: FC<FormQuantityFieldProps> = ({ defaultQuantity=1,setValue, visible=true, ...other }: FormQuantityFieldProps) => { const inputRef = useRef<HTMLInputElement>(null) const [quantity, setQuantity] = useState<number>(defaultQuantity) const formattedDecrease: string = formatClassList(MINUS) const formattedMinusIcon: string = formatClassList(MINUS_ICON) const formattedIncrease: string = formatClassList(PLUS)const formattedPlusIcon: string = formatClassList(PLUS_ICON) const formattedQuantity: string = formatClassList(QUANTITY) useEffect(() => { if (!validateQuantity(quantity)) { setQuantity(1)} }, [quantity])')

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


def test_read_tsx_file_passing():
    input = 'input/components/arrow/arrow.tsx'

    expected = "import React, { FC } from 'react' import { formatClassList,joinStrings } from '@bscs-dev-team/bscs-design-system-common' import './arrow.css' type ArrowProps = { active: boolean, className?: string } const ACTIVE_ARROW: string = ` active arrow ` const ARROW: string = ` arrow ` const TEXT_LEFT: string = ` text-left ` const Arrow: FC<ArrowProps> = ({ active=false,className }: ArrowProps) => { const formattedActiveArrow: string = formatClassList(ACTIVE_ARROW) const formattedArrow: string = formatClassList(ARROW) const formattedTextLeft: string = formatClassList(TEXT_LEFT) return ( <i className={ className && active ? joinStrings(' ', className, formattedTextLeft,formattedActiveArrow) : className ? joinStrings(' ', className, formattedTextLeft, formattedArrow) : formattedActiveArrow } /> ) } export default Arrow no props in file: input/components/arrow/arrow.tsx"

    read_tsx_file(input) == expected


def get_files_passing():

    input = './input'
    input_two = 'tsx'

    expected = ['./input/components/form-read-only-field/form-read-only-field.tsx', './input/components/form-read-only-field/stories/form-read-only-field.stories.tsx', './input/components/footer/footer.tsx', './input/components/footer/stories/footer.stories.tsx', './input/components/form/form.tsx', './input/components/form-password-field/form-password-field.tsx', './input/components/form-password-field/stories/form-password-field.stories.tsx', './input/components/loading/loading.tsx', './input/components/loading/stories/loading.stories.tsx', './input/components/pill-badge/pill-badge.tsx', './input/components/pill-badge/stories/pill-badge.stories.tsx', './input/components/arrow/arrow.tsx', './input/components/alert/alert.tsx', './input/components/alert/stories/alert.stories.tsx', './input/components/toast/toast.tsx', './input/components/toast/stories/toast.stories.tsx', './input/components/specific-contact-form/specific-contact-form.tsx', './input/components/specific-contact-form/stories/specific-contact-form.stories.tsx', './input/components/form-checkbox-field/form-checkbox-field.tsx', './input/components/form-checkbox-field/stories/form-checkbox-field.stories.tsx', './input/components/navigation/bottom-navigation.tsx', './input/components/navigation/navigation-lg.tsx', './input/components/navigation/dropdown.tsx', './input/components/navigation/stories/navigation-lg.stories.tsx', './input/components/general-contact-form/general-contact-form.tsx', './input/components/general-contact-form/stories/general-contact-form.stories.tsx', './input/components/form-text-field/form-text-field.tsx', './input/components/form-text-field/stories/form-text-field.stories.tsx', './input/components/breadcrumb-item/breadcrumb-item.tsx', './input/components/page-title/page-title.tsx', './input/components/page-title/stories/page-title.stories.tsx', './input/components/form-field/form-field.tsx', './input/components/select-cards/select-cards.tsx', './input/components/select-cards/select-card.tsx', './input/components/select-cards/stories/select-cards.stories.tsx', './input/components/tagline/tagline.tsx', './input/components/tagline/stories/tagline.stories.tsx', './input/components/button/button.tsx', './input/components/button/stories/button.stories.tsx',
                './input/components/form-radio-field/form-radio-field.tsx', './input/components/form-radio-field/stories/form-radio-field.stories.tsx', './input/components/icon-list/icon-list.tsx', './input/components/icon-list/stories/icon-list.stories.tsx', './input/components/form-dropdown-field/form-dropdown-field.tsx', './input/components/form-dropdown-field/stories/form-dropdown-field.stories.tsx', './input/components/form-confirm-password-field/form-confirm-password-field.tsx', './input/components/form-confirm-password-field/stories/form-confirm-password-field.stories.tsx', './input/components/form-number-field/form-number-field.tsx', './input/components/form-number-field/stories/form-number-field.stories.tsx', './input/components/form-textarea-field/form-textarea-field.tsx', './input/components/form-textarea-field/stories/form-textarea-field.stories.tsx', './input/components/join-email-list-form/join-email-list-form.tsx', './input/components/join-email-list-form/stories/join-email-list-form.stories.tsx', './input/components/breadcrumb/breadcrumb.tsx', './input/components/breadcrumb/stories/breadcrumb.stories.tsx', './input/components/modal/launch-modal.tsx', './input/components/modal/modal.tsx', './input/components/modal/stories/modal.stories.tsx', './input/components/form-email-field/form-email-field.tsx', './input/components/form-email-field/stories/form-email-field.stories.tsx', './input/components/form-phone-field/form-phone-field.tsx', './input/components/form-phone-field/stories/form-phone-field.stories.tsx', './input/components/timeline/timeline.tsx', './input/components/timeline/timeline-container.tsx', './input/components/timeline/stories/timeline.stories.tsx', './input/components/title-border/title-border.tsx', './input/components/title-border/stories/title-border.stories.tsx', './input/components/staff-card/staff-card.tsx', './input/components/staff-card/stories/staff-card.stories.tsx', './input/components/tag/tag.tsx', './input/components/tag/stories/tag.stories.tsx', './input/components/header/header.tsx', './input/components/header/stories/header.stories.tsx', './input/components/form-quantity-field/form-quantity-field.tsx', './input/components/form-quantity-field/stories/form-quantity-field.stories.tsx']

    actual = get_files(input, input_two)

    assert expected == actual


def test_get_files_failing():
    expected = [
        './input/components/form-read-only-field/form-read-only-field.tsx']

    actual = get_files('./input', 'tsx')

    with pytest.raises(AssertionError):
        assert expected == actual


# def test_create_readme_props_passing():
#     expected = '# Arrow ======= ## Props ### Required: - active: boolean ### Optional: - className: string'

#     actual = create_readme([{'required': True, 'name': 'active', 'type': 'boolean'}], [{'required': False, 'name': 'className', 'type': 'string'}],'input/components/arrow/arrow.tsx')

#     assert expected == actual


# testing to make sure required props don't get read as optional
def test_create_readme_failing():
    expected = [{'required': False, 'name': 'setValue',
                 'type': 'VoidValueCallback<number>'}]

    actual = create_readme([{'required': True, 'name': 'active', 'type': 'boolean'}], [
                           {'required': False, 'name': 'className', 'type': 'string'}], 'input/components/arrow/arrow.tsx')

    with pytest.raises(AssertionError):
        assert expected == actual
