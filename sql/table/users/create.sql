CREATE TABLE users(
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    create_time DATETIME COMMENT 'Create Time',
    update_time DATETIME COMMENT 'Update Time',
    username VARCHAR(50) COMMENT 'username',
    password VARCHAR(50) COMMENT 'password',
    nickname VARCHAR(50) COMMENT 'nickname',
    session_id VARCHAR(50) COMMENT 'session_id'
) DEFAULT CHARSET UTF8 COMMENT 'Users Info';