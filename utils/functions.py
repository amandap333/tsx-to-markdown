import glob
import re
import json
import shutil


from os.path import isdir, isfile
from mdutils.mdutils import MdUtils
from os import mkdir
from pathlib import Path


def get_files(path, file_type):
    return glob.glob(f'{path}/**/*.{file_type}', recursive=True)


def read_tsx_file(tsx_file_path):
    with open(tsx_file_path, 'r') as f:
        return f.read()


def get_all_props(tsx_file_content):
    m = re.search(r'type \w.*?Props.*?}', tsx_file_content, flags=re.DOTALL)

    return m.group(0)


def __get_props(props_block):
    m = re.search(r'\{\s(.+?)\s\}', props_block, flags=re.DOTALL)

    if not m:
        return None

    return m.group(1)


def get_props_list(props_block):
    props_list = __get_props(props_block)

    if not props_list:
        return []

    props = props_list.split(',')
    props = [prop.split(':') for prop in props]

    for prop in props:
        if len(prop) > 2:
            prop[0] = f'{prop[0]}:{prop[1]}'
            del[prop[1]]

        prop[0] = prop[0].strip()
        prop[1] = prop[1].strip()

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


def get_optional_props_dict(props_list):
    optional_props_dict = [x for x in props_list if not x['required']]
    return optional_props_dict


def get_required_props_dict(props_list):
    required_props_dict = [x for x in props_list if x['required']]
    return required_props_dict


def __get_title_name(file):
    m = re.search(r'\w.*?Props.*?', get_all_props(file))
    return m.group(0)


def __strip_extra_characters(file):
    file = __get_title_name(file).strip("Props")
    final_text = file.strip("type")

    return final_text


def __format_required_props(required_dict):
    for x in range(len(required_dict)):
        if required_dict[x]['required'] == True:
            del required_dict[x]["required"]

    return required_dict


def __format_optional_props(optional_dict):
    for x in range(len(optional_dict)):
        if optional_dict[x]['required'] == False:
            del optional_dict[x]["required"]

    return optional_dict


def create_readme(required, optional, file):
    required_props = __format_required_props(required)

    optional_props = __format_optional_props(optional)

    name_of_component = __strip_extra_characters(file)

    mdFile = MdUtils(file_name=f'{name_of_component}',title=f'##{name_of_component}')
    mdFile.write("## Props\n")
    mdFile.write(f"\n\n### Required:")
    for props in required_props:
        mdFile.write(f"\n - {props['name']}:{props['type']}")
    mdFile.write(f"\n\n### Optional:")
    for props in optional_props:
        mdFile.write(f"\n - {props['name']}:{props['type']}")
    mdFile.create_md_file()

    return mdFile


def create_output_dir(output):
    p = Path('./output')
    p.mkdir(exist_ok=True)
    print("Output directory has been created")

def move_to_output():
    shutil.move('README.md', './output')