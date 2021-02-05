import sys
import click

from os.path import dirname, abspath, isdir

from utils.functions import (
    create_readme,
    create_output_directory,
    get_files,
    get_optional_props,
    get_props_dict,
    get_props_list,
    get_props_match,
    get_required_props,
    read_tsx_file
)


def create_tsx_file_readme(path):
    tsx_file_content = read_tsx_file(path)

    # Retrieve regex match of all props variables in component content
    tsx_variable_block = get_props_match(tsx_file_content)
    if tsx_variable_block is None:
        print(f'no props in file: {path}')
        return

    props_list = get_props_list(tsx_variable_block)
    props_dict = get_props_dict(props_list)

    optional_props = get_optional_props(props_dict)
    required_props = get_required_props(props_dict)

    create_readme(required_props, optional_props, path)


def create_readmes_from_directory(path):
    input_file_type = 'tsx'

    raw_tsx_files = get_files(path, input_file_type)
    tsx_files = list(filter(lambda x: 'stories' not in x, raw_tsx_files))

    for tsx_file in tsx_files:
        create_tsx_file_readme(tsx_file)


def take_input_directory(input_directory,):
    if not isdir(input_directory):
        print('Not a directory. Use -f flag for a file.')
        return

    create_readmes_from_directory(input_directory)


def take_input_file(input_file):
    if isdir(input_file):
        print('Not a file. Use -d flag for a directory.')
        return

    create_tsx_file_readme(input_file)


@click.command()
@click.option('-f', '--file', 'input_file', type=click.Path(exists=True), help='Individual file')
@click.option('-d', '--directory', 'input_directory', type=click.Path(exists=True), help='Directory path')
def user_input(input_file, input_directory):
    create_output_directory()
    if input_file:
        take_input_file(input_file)
        return

    if input_directory:
        take_input_directory(input_directory)
        return

    create_readmes_from_directory('./input')


if __name__ == "__main__":
    # pylint: disable=no-value-for-parameter
    user_input()
