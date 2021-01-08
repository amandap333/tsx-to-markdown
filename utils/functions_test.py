import pytest

from functions import (
  get_optional_props
)

def test_get_props_match():
    assert get_optional_props([{'required': False, 'name': 'defaultQuantity', 'type': 'number'}, {'required': True, 'name': 'setValue', 'type': 'VoidValueCallback<number>'}]) == [{'required': False, 'name': 'defaultQuantity', 'type': 'number'}]




