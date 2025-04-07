CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY, 
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    admin BOOLEAN DEFAULT FALSE
);

INSERT INTO users(username, password, admin) 
VALUES
    ('admin', '$2b$10$1eLPj1DWrI2Qwa8VKe8QheuinRu7TUc5XCuWFAnH3gH7wI/9ULPza', TRUE);

CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY, 
    username VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages(username, message) 
VALUES
    ('Anonymous', 'Welcome to the chat');