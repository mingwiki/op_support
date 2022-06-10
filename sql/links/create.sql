CREATE TABLE links(
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    create_time DATETIME COMMENT 'Create Time',
    update_time DATETIME COMMENT 'Update Time',
    isShow BOOLEAN COMMENT 'show',
    appId VARCHAR(100) COMMENT 'App Id',
    pagePath VARCHAR(255) COMMENT 'Page Path',
    enterId VARCHAR(100) COMMENT 'Enter Id',
    sourceOrigin VARCHAR(100) COMMENT 'Source Origin',
    linkName VARCHAR(255) COMMENT 'Link Name',
    username VARCHAR(50) COMMENT 'username',
    url VARCHAR(255) COMMENT 'url'
) DEFAULT CHARSET UTF8 COMMENT 'Links Details';