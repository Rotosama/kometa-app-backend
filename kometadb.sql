CREATE DATABASE kometaApp;

--must agree on the ID data type...

CREATE TABLE users (
    userID  serial,
    firstName varchar(50) NOT NULL,
    lastName varchar(50) NOT NULL,
    birthdate Date NOT NULL,
    nationalID varchar(10) NOT NULL,
    phone smallint,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,

    PRIMARY KEY (UserID),
    UNIQUE (nationalID),
    UNIQUE (email)
);

--Not sure clientID, deliveryID or adminID are needed?

CREATE TABLE clientUsers (
    clientID int NOT NULL, 
    userID varchar (50) NOT NULL,
    defaultLatitude real NOT NULL,
    defaultLongitude real NOT NULL,

    PRIMARY KEY (clientID),
) INHERITS (Users);

--Ensure ID types are consistent accross tables order ID is an INT, UUID or SERIAL?

CREATE TABLE deliveryUsers (
    deliveryID int NOT NULL,
    activeOrderID int,
    isAvailable boolean NOT NULL,
    currentLatitude real NOT NULL,
    currentLongitude real NOT NULL,

    PRIMARY KEY (deliveryID),
    FOREIGN KEY (activeOrder) REFERENCES orders(OrderID),
) INHERITS (Users);

CREATE TABLE adminUsers(
    adminID int,

    PRIMARY KEY (adminID),
) INHERITS (Users);

--Check id type, make sure clientID and deliveryID still exist for references

CREATE TABLE orders (
    orderID uuid NOT NULL,
    clientID int NOT NULL,
    deliverID int NOT NULL,
    orderDate Date NOT NULL,
    orderStatus varchar (20) NOT NULL,
    orderCharge int NOT NULL,
    originLatitude real NOT NULL,
    originLongitude real NOT NULL,
    destinationLatitude real NOT NULL,
    destinationLongitude real NOT NULL,
    description varchar (255),

    PRIMARY KEY (OrderID),
    FOREIGN KEY (ClientID) REFERENCES clientUsers(clientID),
    FOREIGN KEY (DeliverID) REFERENCES deliveryUsers(deliveryID)
);
