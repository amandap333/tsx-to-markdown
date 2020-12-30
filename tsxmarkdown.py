from os.path import dirname, abspath
from utils.functions import *


def tsx_markdown(path):
    input_file_type = 'tsx'

    # 1. Read TSX files and append content to a list.
    raw_tsx_files = get_files(path, input_file_type)
    tsx_files = list(filter(lambda x: 'stories' not in x, raw_tsx_files))

    # 2. selecting one file from tsx_files
    tsx_file_content = read_tsx_file(tsx_files[4])

    # 3. Retrieve all variables from component
    tsx_variable_block = get_all_props(tsx_file_content)

    # 4. Create nested list of all variables from componentt
    props = get_props_list(tsx_variable_block)

    # 5. Create list of dictionaries for all variables
    props_list = get_props_dict(props)

    # 6. Seperate into list of dictionaries of all optional props
    optional_props = get_optional_props_dict(props_list)

    # 7. Seperate into of dictionaries of all required props
    required_props = get_required_props_dict(props_list)

    # 8. Create readme markdown file
    create_readme(required_props, optional_props, tsx_file_content)

    # 9. create output directory



if __name__ == "__main__":
    tsx_markdown('./input')
