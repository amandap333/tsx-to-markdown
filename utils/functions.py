import click
import glob
import json
import os.path
import re
import shutil


from copy import deepcopy
from os.path import isdir, isfile
from mdutils.mdutils import MdUtils
from os import mkdir
from pathlib import Path


def get_files(path, file_type):
    return glob.glob(f'{path}/**/*.{file_type}', recursive=True)


def read_tsx_file(tsx_file_path):
    with open(tsx_file_path, 'r') as f:
        return f.read()


def get_props_match(tsx_file_content):
    m = re.search(r'type \w.*?Props.*?}', tsx_file_content, flags=re.DOTALL)

    return m.group(0)


def __get_props(props_block):
    m = re.search(r'\{\s(.+?)\s\}', props_block, flags=re.DOTALL)

    if not m:
        return None

    return m.group(1)


def __format_props(prop):
    prop_copy = prop.copy()

    if len(prop_copy) > 2:
        # handle [other:string]: unknown
        prop_copy[0] = f'{prop_copy[0]}:{prop_copy[1]}'
        del[prop_copy[1]]

    prop_copy[0] = prop_copy[0].strip()
    prop_copy[1] = prop_copy[1].strip()

    return prop_copy


def get_props_list(props_block):
    props_string = __get_props(props_block)

    if not props_string:
        return []

    props_list = props_string.split(',')
    props = [prop.split(':') for prop in props_list]

    for i, prop in enumerate(props):
        props[i] = __format_props(prop)

    return props


def __create_prop_dictionary(prop):
    if not isinstance(prop, list) or len(prop) != 2:
        raise TypeError('prop must be a list of [name, type]')

    prop_dict = {}
    prop_dict['required'] = '?' not in prop[0]
    prop_dict['name'] = prop[0].rstrip('?')
    prop_dict['type'] = prop[1]

    if prop[0] == '[other:string]':
        prop_dict['name'] = 'other'
        prop_dict['required'] = False

    return prop_dict

def get_props_dict(props):
    props_dict_list = []
    for prop in props:
        props_dict_list.append(__create_prop_dictionary(prop))

    return props_dict_list


# List of dictionaries
def get_optional_props(props_list):
    optional_props = [x for x in props_list if not x['required']]
    return optional_props


# List of dictionaries
def get_required_props(props_list):
    required_props = [x for x in props_list if x['required']]
    return required_props


def __get_file_name(file):
    head, tail = os.path.split(file)
    name = tail.split('.')[0]

    return name


def __find_path_name(file):
    dirname = os.path.dirname(file)
    return dirname


def __format_required_props(required_props):
    required_props_copy = deepcopy(required_props)
    for x in range(len(required_props_copy)):
        if required_props_copy[x]['required'] == True:
            del required_props_copy[x]["required"]

    return required_props_copy


def __format_optional_props(optional_props):
    optional_props_copy = deepcopy(optional_props)
    for x in range(len(optional_props_copy)):
        if optional_props_copy[x]['required'] == False:
            del optional_props_copy[x]["required"]

    return optional_props_copy

@click.command()
def promt_for_overwrite():
    click.echo('Hello World!')


def create_readme(required, optional, file):
    required_props = __format_required_props(required)
    optional_props = __format_optional_props(optional)

    file_name = __get_file_name(file)
    name_of_component = file_name.capitalize()

    path_name = __find_path_name(file)

    if os.path.exists('README.md'):
        print(f"{name_of_component} readme being overwritten!!")
        promt_for_overwrite()


    mdFile = MdUtils(file_name=f'./{path_name}/README.md', title=f'# {name_of_component}')

    mdFile.write("## Props\n")
    mdFile.write(f"\n### Required:\n")

    for props in required_props:
        mdFile.write(f"  - {props['name']}: {props['type']}\n")

    mdFile.write(f"\n### Optional:\n")

    for props in optional_props:
        mdFile.write(f"  - {props['name']}: {props['type']}\n")

    mdFile.create_md_file()

    return mdFile