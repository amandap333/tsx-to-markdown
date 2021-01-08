import pytest

from functions import (
  get_optional_props,
  get_required_props
)

def test_get_optional_props_passing():
    assert get_optional_props([{'required': False, 'name': 'defaultQuantity', 'type': 'number'}, {'required': True, 'name': 'setValue', 'type': 'VoidValueCallback<number>'}]) == [{'required': False, 'name': 'defaultQuantity', 'type': 'number'}]


def test_get_optional_props_failing():
    with pytest.raises(AssertionError):
      assert get_optional_props([{'required': False, 'name': 'defaultQuantity', 'type': 'number'}, {'required': True, 'name': 'setValue', 'type': 'VoidValueCallback<number>'}]) == [{'required': True, 'name': 'setValue', 'type': 'VoidValueCallback<number>'}]


def test_get_required_props_passing():
    assert get_required_props([{'required': False, 'name': 'defaultQuantity', 'type': 'number'}, {'required': True, 'name': 'setValue', 'type': 'VoidValueCallback<number>'}]) == [{'required': True, 'name': 'setValue', 'type': 'VoidValueCallback<number>'}]


def test_get_required_props_failing():
    with pytest.raises(AssertionError):
      assert get_required_props([{'required': False, 'name': 'defaultQuantity', 'type': 'number'}, {'required': True, 'name': 'setValue', 'type': 'VoidValueCallback<number>'}]) == [{'required': False, 'name': 'defaultQuantity', 'type': 'number'}]

