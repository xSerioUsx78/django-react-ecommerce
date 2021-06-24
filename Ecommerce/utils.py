import string
import random


def generate_random_code(k, char=False):
    if char:
        return ''.join(random.choices(string.digits + string.ascii_letters, k=k))
    return ''.join(random.choices(string.digits, k=k))


# Here we write a function to generate a unique code for models
def generate_unqiue_code(function, model, prefix='', key=8):

    generate = True

    underline = ''

    if prefix:
        underline = '-'

    key = f'{prefix}{underline}{function(key)}'

    while generate:
        code = model.objects.filter(object_code=key)
        if code.exists():
            key = f'{prefix}{underline}{function(key)}'
        else:
            generate = False
            return key


def convert_to_int(char):
    if char is not None and char != '':
        char = char.replace(",", "")
        return int(char)
    return char


def convert_to_comma(char):
    if char is not None and char != '':
        char = "{:,}".format(char)
        return char
    return 0
