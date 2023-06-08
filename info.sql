CREATE DATABASE CARS;

--  extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
SELECT uuid_generate_v4();

-- users
CREATE TABLE users(
            id VARCHAR UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
            username VARCHAR(64) UNIQUE NOT NULL,
            email VARCHAR(64) UNIQUE NOT NULL,
            role VARCHAR(16) NOT NULL,
            age INT NOT NULL,
            password VARCHAR(128) NOT NULL
          );
          
-- companies
CREATE TABLE companies(
            id VARCHAR UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
            title VARCHAR(64) NOT NULL,
            image TEXT UNIQUE NOT NULL,
            created_by VARCHAR(64) NOT NULL,
            CONSTRAINT fk_created_by
            FOREIGN KEY(created_by) 
	          REFERENCES users(id)
          );