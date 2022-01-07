CREATE DATABASE tododb;

--download extension
-- create extension if not exists "uuid-ossp";
CREATE TABLE users(
    user_id uuid     PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

CREATE TABLE todos(
    todo_id  SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    iscomplete BOOLEAN NOT NULL,
    user_id uuid NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
