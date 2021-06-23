CREATE TABLE recipes (
    id INT(11) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    ingredients VARCHAR(500) NOT NULL,
    video LONGBLOB NOT NULL,
    user_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);