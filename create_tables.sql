CREATE TABLE stats (
	id SERIAL PRIMARY KEY,
	userId INT REFERENCES users(id),
	saveName TEXT,
	location TEXT,
	credits INTEGER,
	starships TEXT
	);