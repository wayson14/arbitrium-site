from setuptools import setup, find_packages

setup(
    name = 'arbitrium-site',
    version = '0.1.0',
    packages = find_packages(),
    entry_points = {
        'console_scripts': [
            'arbitrium=app.app:main',
            'post_admin=app.post_admin:main'
        ]},
    )