from setuptools import setup, find_packages

with open("requirements.txt") as f:
    requirements=f.read().splitlines()
    
    setup(
        name="Qloo-LLM-Hackathon",
        version="0.0.1",
        author="Wesley Gonzales",
        packages=find_packages(),
        install_requires=requirements,
        python_requires=">=3.10"
    )

# pip install -e .