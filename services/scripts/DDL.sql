-- Create a table to store player data
CREATE TABLE IF NOT EXISTS players (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    position VARCHAR(50),
    team_name VARCHAR(100),
    goals_scored INT,
    assists INT,
    description TEXT
);
-- create index on search columns
CREATE INDEX IF NOT EXISTS idx_players_description ON players (description);
CREATE INDEX IF NOT EXISTS idx_players_position ON players (position);

-- get all players
SELECT * 
FROM players 
WHERE lower(description) ILIKE lower($1) AND lower(position) ILIKE lower($2);

-- filter players by description and position
SELECT * 
FROM players 
WHERE lower(description) ILIKE lower($1) AND lower(position) ILIKE lower($2) 
LIMIT $3 OFFSET $4;

-- create user auth table
CREATE TABLE if NOT EXISTS user_auth (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(255)  NOT NULL,
    username VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    CONSTRAINT unique_email UNIQUE (email),
	CONSTRAINT unique_user UNIQUE (username)
);

-- insert user data
INSERT INTO user_auth (first_name, last_name, email, username, password_hash ) 
VALUES ($1, $2, $3, $4, $5) RETURNING *;

