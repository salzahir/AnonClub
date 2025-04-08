CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY, 
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'member', 'user'))
);

-- passwords
-- hashed with bcrypt

-- admin: admin
-- member: member
-- user: user

INSERT INTO users(username, password, role) 
VALUES
    ('admin', '$2b$10$1eLPj1DWrI2Qwa8VKe8QheuinRu7TUc5XCuWFAnH3gH7wI/9ULPza', 'admin'),
    ('member', '$2b$10$LW/EGP6BZpwxHHq9RNOIIOCKRg41aJlLri2qcqvgYdGjA4.0Cru4O', 'member'),
    ('user', '$2b$10$mVJ4e65K.J6zeegofF.p7u53kudBlSNWQiYkxqHOtJczz8yXRNHmO', 'user');

CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY, 
    username VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages(username, message) 
VALUES
    ('Anonymous', 'Welcome to the chat');