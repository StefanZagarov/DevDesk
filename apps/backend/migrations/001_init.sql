-- Enable crypto for the UUIDs
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Clean up old tables (Dev Mode only: Allows us to reset schema easily)

DROP TABLE IF EXISTS resources;
DROP TABLE IF EXISTS users;

-- Create Users Table (Must be created first)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR (255) UNIQUE NOT NULL,
    password_hash VARCHAR (255) NOT NULL,
    name VARCHAR(100),

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create resources table
CREATE TABLE resources (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

-- The critical link
user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

title TEXT NOT NULL,
description TEXT,
type VARCHAR(50) NOT NULL,
content JSONB NOT NULL,
tags TEXT[] DEFAULT '{}',

created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_users_email ON users (email);
CREATE INDEX idx_resources_user ON resources(user_id);
CREATE INDEX idx_resources_type ON resources(type);
CREATE INDEX idx_resources_content ON resources USING GIN (content);
CREATE INDEX idx_resources_tags ON resources USING GIN (tags);

