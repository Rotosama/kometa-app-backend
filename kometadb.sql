CREATE DATABASE kometaApp;

CREATE TABLE users (
    userID  int NOT NULL,
    firstName varchar (50) NOT NULL,
    lastName varchar (50) NOT NULL,
    birthdate Date NOT NULL,
    nationalID int NOT NULL,
    phone smallint,
    email varchar (255) NOT NULL,
    password varchar (255) NOT NULL,
    role varchar (20) NOT NULL,

    PRIMARY KEY (UserID),
    UNIQUE (nationalID),
    UNIQUE (email)
);

CREATE TABLE clientUsers (
    clientID int NOT NULL, 
    userID varchar (50) NOT NULL,
    defaultLatitude real NOT NULL,
    defaultLongitude real NOT NULL,

    PRIMARY KEY (clientID),
    FOREIGN KEY (userID) REFERENCES users (userID),
    INHERITS (Users);
);
CREATE TABLE deliveryUsers (
    deliveryID int NOT NULL,
    UserID int NOT NULL,
    activeOrderID int,
    isAvailable boolean NOT NULL,
    currentLatitude real NOT NULL,
    currentLongitude real NOT NULL,

    PRIMARY KEY (deliveryID),
    FOREIGN KEY (activeOrder) REFERENCES orders (OrderID),
    FOREIGN KEY (userID) REFERENCES Users (userID),
    INHERITS (Users);
);

CREATE TABLE adminUsers(
    adminID int,
    UserID int,

    PRIMARY KEY (adminID),
    FOREIGN KEY (userID) REFERENCES users (userID),
    INHERITS (Users);

);

CREATE TABLE orders (
    orderID uuid NOT NULL,
    clientID int NOT NULL,
    deliverID int NOT NULL,
    dateOrder Date NOT NULL,
    status varchar (20) NOT NULL,
    amount int NOT NULL,
    originLatitiude real NOT NULL,
    originLongitude real NOT NULL,
    destinationLatitude real NOT NULL,
    destinationLOngitude real NOT NULL,
    description varchar (255),

    PRIMARY KEY (OrderID),
    FOREIGN KEY (ClientID) REFERENCES clientUsers (clientID),
    FOREIGN KEY (DeliverID) REFERENCES deliveryUsers (deliveryID)
);

