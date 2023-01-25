CREATE DATABASE kometaApp;

CREATE TABLE users (
    userID  serial,
    firstName varchar(50) NOT NULL,
    lastName varchar(50) NOT NULL,
    birthdate Date NOT NULL,
    nationalID varchar(10) NOT NULL,
    phone varchar(12),
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    userUUID uuid,

    PRIMARY KEY (UserID),
    UNIQUE (nationalID),
    UNIQUE (email)
);

CREATE TABLE clientUsers (
    clientID serial, 
    userUUID uuid,
    defaultLatitude real NOT NULL,
    defaultLongitude real NOT NULL,

    PRIMARY KEY (clientID),
    FOREIGN KEY (userUUID) REFERENCES users(userUUID)
);

CREATE TABLE deliveryUsers (
    deliveryID serial,
    userUUID uuid,
    isAvailable boolean NOT NULL,
    currentLatitude real NOT NULL,
    currentLongitude real NOT NULL,

    PRIMARY KEY (deliveryID),
    FOREIGN KEY (userUUID) REFERENCES users(userUUID)
);

CREATE TABLE adminUsers(
    adminID serial,
    userUUID uuid,

    PRIMARY KEY (adminID),
    FOREIGN KEY (userUUID) REFERENCES users (userUUID)
);

CREATE TABLE orders (
    orderID serial NOT NULL,
    clientID uuid NOT NULL,
    deliverID uuid NOT NULL,
    orderDate Date NOT NULL,
    orderStatus varchar (20) NOT NULL,
    orderCharge int NOT NULL,
    originLatitude real NOT NULL,
    originLongitude real NOT NULL,
    destinationLatitude real NOT NULL,
    destinationLongitude real NOT NULL,
    description varchar (255),
    orderUUID uuid,

    PRIMARY KEY (OrderID),
    FOREIGN KEY (clientID) REFERENCES clientUsers(userUUID),
    FOREIGN KEY (deliverID) REFERENCES deliveryUsers(userUUID)
);
