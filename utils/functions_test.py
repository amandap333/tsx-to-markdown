import pytest

from functions import (
  get_optional_props,
  get_required_props,
  __format_optional_props,
  __format_required_props
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


def test__format_required_props_passing():
    assert __format_required_props([{'required': True, 'name': 'name', 'type': 'string'}, {'required': True, 'name': 'title', 'type': 'string'}]) == [{'name': 'name', 'type': 'string'}, {'name': 'title', 'type': 'string'}]


# testing to make sure optional props don't go into the required array
def test__format_required_props_failing():
    with pytest.raises(AssertionError):
      assert __format_required_props([{'required': False, 'name': 'name', 'type': 'string'}, {'required': True, 'name': 'title', 'type': 'string'}]) == [{'name': 'name', 'type': 'string'}, {'name': 'title', 'type': 'string'}]


def test__format_optional_props_passing():
    assert __format_optional_props([{'required': False, 'name': 'name', 'type': 'string'}, {'required': False, 'name': 'title', 'type': 'string'}]) == [{'name': 'name', 'type': 'string'}, {'name': 'title', 'type': 'string'}]


# testing to make sure required props don't work
def test__format_optional_props_failing():
    with pytest.raises(AssertionError):
      assert __format_optional_props([{'required': False, 'name': 'name', 'type': 'string'}, {'required': True, 'name': 'title', 'type': 'string'}]) == [{'name': 'name', 'type': 'string'}, {'name': 'title', 'type': 'string'}]