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
    originAddress varchar(255) NOT NULL,
    destinationLatitude real NOT NULL,
    destinationLongitude real NOT NULL,
    destinationAddress varchar(255) NOT NULL,
    description varchar (255),
    orderUUID uuid UNIQUE DEFAULT gen_random_uuid(),

    PRIMARY KEY (OrderID),
    FOREIGN KEY (clientUUID) REFERENCES clientUsers(userUUID),
    FOREIGN KEY (deliveryUUID) REFERENCES deliveryUsers(userUUID)
);