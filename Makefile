REPORTER = list
MOCHA_OPTS = --ui tdd --ignore-leaks

test:
	clear
	echo Seeding *********************************************************
	node seed.js
	echo Ending test