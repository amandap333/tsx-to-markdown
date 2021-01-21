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


def tsx_markdown(path):
    input_file_type = 'tsx'

    raw_tsx_files = get_files(path, input_file_type)
    tsx_files = list(filter(lambda x: 'stories' not in x, raw_tsx_files))
    create_output_directory()

    for tsx_file in tsx_files:
        tsx_file_content = read_tsx_file(tsx_file)

        # Retrieve regex match of all props variables in component content
        tsx_variable_block = get_props_match(tsx_file_content)
        if tsx_variable_block is None:
            print(f'no props in file: {tsx_file}')
            continue

        props_list = get_props_list(tsx_variable_block)
        props_dict = get_props_dict(props_list)

        optional_props = get_optional_props(props_dict)
        required_props = get_required_props(props_dict)

        create_readme(required_props, optional_props, tsx_file)


def manage_input_directory(input_directory):
    if not isdir(input_directory):
        print('Not a directory. Use -f flag for a file.')
        return

    tsx_markdown(input_directory)


def manage_input_file(input_file):
    if isdir(input_file):
        print('Not a file. Use -d flag for a directory.')
        return

    tsx_markdown(input_file)


@click.command()
@click.option('-f', '--file', 'input_file', type=click.Path(exists=True), help='Individual file')
@click.option('-d', '--directory', 'input_directory', type=click.Path(exists=True), help='Directory path')
def cli(input_file, input_directory):
    if input_file:
        manage_input_file(input_file)
        return

    if input_directory:
        manage_input_directory(input_directory)
        return

    tsx_markdown('./input')


if __name__ == "__main__":
    cli()
