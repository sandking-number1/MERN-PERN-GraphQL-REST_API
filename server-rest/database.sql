CREATE DATABASE graph;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR (50) UNIQUE NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT current_timestamp
);
    