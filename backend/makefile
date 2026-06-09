PY=python
PY3=python3

venv:
	$(PY) -m venv .venv

install: requirements.txt
	pip install -r $<

up: app/main.py
	$(PY3) $<

clean: app/__pycache__
	rm -rf $<
