CREATE DATABASE (

)

CREATE TABLE clientUsers (
    clientID uuid NOT NULL, 
    firstName varchar (50) NOT NULL,
    lastName varchar (50) NOT NULL,
    Birthday Date NOT NULL,
    ID int NOT NULL,
    email varchar (255) NOT NULL,
    password varchar (255) NOT NULL,

    PRIMARY KEY (clientID),
    UNIQUE (ID),
    UNIQUE (email)
);

CREATE TABLE orders (
    OrderID uuid NOT NULL,
    ClientID int NOT NULL,
    DeliverID int NOT NULL,
    DateOrder Date NOT NULL,
    Origin varchar (255) NOT NULL,
    Origin
    Destination varchar (255) NOT NULL,
    DEstination
    Goods varchar (255) NOT NULL,

    PRIMARY KEY (OrderID),
    FOREIGN KEY (ClientID) REFERENCES clientUsers (ClientID),
    FOREIGN KEY (DeliverID) REFERENCES deliveryUsers (deliveryID)
);

CREATE TABLE deliveryUsers (
    deliveryID uuid,
    firstName varchar(50) NOT NULL, 
    lastName varchar(50) NOT NULL,
    email varchar (255) NOT NULL,
    Password varchar(50),
    isAvailable boolean,
    Position varchar(255),
    activeOrder int,

    PRIMARY KEY (deliveryID),
    FOREIGN KEY (activeOrder) REFERENCES orders (OrderID)

);

CREATE TABLE adminUsers(
    adminID int,
    firstName varchar(50) NOT NULL, 
    lastName varchar(50) NOT NULL,
    email varchar (255) NOT NULL,
    password varchar (255) NOT NULL,
);