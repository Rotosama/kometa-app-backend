CREATE DATABASE kometaApp;

CREATE TABLE users (
    userID  serial UNIQUE,
    firstName varchar(50) NOT NULL,
    lastName varchar(50) NOT NULL,
    birthdate Date NOT NULL,
    nationalID varchar(10) NOT NULL UNIQUE,
    phone varchar(12),
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    userUUID uuid UNIQUE DEFAULT gen_random_uuid(),

    PRIMARY KEY (UserID)
);

CREATE TABLE clientUsers (
    clientID serial UNIQUE, 
    userUUID uuid UNIQUE,
    defaultLatitude real NOT NULL,
    defaultLongitude real NOT NULL,

    PRIMARY KEY (clientID),
    FOREIGN KEY (userUUID) REFERENCES users(userUUID)
);

CREATE TABLE deliveryUsers (
    deliveryID serial UNIQUE,
    userUUID uuid UNIQUE,
    isAvailable boolean NOT NULL,
    currentLatitude real NOT NULL,
    currentLongitude real NOT NULL,

    PRIMARY KEY (deliveryID),
    FOREIGN KEY (userUUID) REFERENCES users(userUUID)
);

CREATE TABLE adminUsers(
    adminID serial UNIQUE,
    userUUID uuid UNIQUE,

    PRIMARY KEY (adminID),
    FOREIGN KEY (userUUID) REFERENCES users (userUUID)
);

CREATE TABLE orders (
    orderID serial NOT NULL UNIQUE,
    clientUUID uuid NOT NULL,
    deliveryUUID uuid,
    orderDate Date NOT NULL,
    orderStatus varchar (20) NOT NULL,
    orderCharge int NOT NULL,
    originLatitude real NOT NULL,
    originLongitude real NOT NULL,
    destinationLatitude real NOT NULL,
    destinationLongitude real NOT NULL,
    description varchar (255),
    orderUUID uuid UNIQUE DEFAULT gen_random_uuid(),

    PRIMARY KEY (OrderID),
    FOREIGN KEY (clientUUID) REFERENCES clientUsers(userUUID),
    FOREIGN KEY (deliveryUUID) REFERENCES deliveryUsers(userUUID)
);

INSERT INTO users
(firstName, lastName, birthdate, nationalID, phone, email, password )
VALUES
('Laura', 'Pellicer', '1998-07-31', '12345678F', '666666666', 'laura@gmail.com', '1234'),
('Rocio', 'Lanfranconi', '1986-08-01', '99999999G', '111111111', 'rocio@gmail.com', '5678'),
('Eduard', 'Peters', '1900-01-01', '88888888L', '222222222', 'eduard@gmail.com','1111'),
('Nacho', 'Ruiz', '1987-03-13', '45777777X', '630476666', 'nacho@gmail.com', '2222');

INSERT INTO orders
(clientUUID, orderdate, orderstatus, ordercharge, originLatitude, originLongitude, destinationLatitude, destinationLongitude, description)
VALUES
('82959694-4e3f-496b-94c8-955961c1d140', '2023-01-01', 'In progress', 5, 32.44, 45.23, 33.44, 45.45, 'Lata de atún');