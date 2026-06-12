PY=python
PY3=python3

up: app/main.py
	$(PY3) $<

venv:
	$(PY) -m venv .venv

install: requirements.txt
	pip install -r $<

clean: app/__pycache__
	rm -rf $<
