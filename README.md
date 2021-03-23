
TSXTOMARKDOWN
=============

- Put the file(s)/folder(s) you want to extract the props from in the input folder.
- then run python or python3 tsxmarkdown.py in your terminal.
- It'll output everything to a new output directory


### to run script
- run python or python3 tsxmarkdown.py

### to run specific directory
- python3 tsxmarkdown.py  -d <directory path>

### to run specific file
- python3 tsxmarkdown.py  -f <file path>

### to run help
- python3 tsxmarkdown.py --help

### to run test
- run pytest utils/functions_test.py

### to run coverage test
- coverage run -m pytest utils/functions_test.py
- coverage report

## functions still to test


## functions tested
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
