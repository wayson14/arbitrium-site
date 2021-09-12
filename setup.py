from setuptools import setup, find_packages

setup(
    name = 'arbitrium-server',
    version = '0.1.0',
    packages = find_packages(),
    entry_points = {
        'console_scripts': [
            'arbitrium=app.app:main'
        ]},
    )