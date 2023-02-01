DROP TABLE IF EXISTS friendship;
DROP TABLE IF EXISTS mushroom;

CREATE TABLE mushroom (
    mushroom_id INT GENERATED ALWAYS AS IDENTITY,
    mushroom_name VARCHAR(20) NOT NULL,
    age INT DEFAULT 0,
    mushroom_role VARCHAR(50),
    PRIMARY KEY (mushroom_id)
);

CREATE TABLE friendship (
    friendship_id INT GENERATED ALWAYS AS IDENTITY,
    first_friend_id INT NOT NULL,
    second_friend_id INT NOT NULL,
    PRIMARY KEY (friendship_id),
    FOREIGN KEY (first_friend_id) REFERENCES mushroom(mushroom_id),
    FOREIGN KEY (second_friend_id) REFERENCES mushroom(mushroom_id)
);