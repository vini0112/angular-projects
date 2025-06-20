# 📊 Database Documentation
This folder contains the schema and structure of the database used in this project.

---
## 🗂 Overview

This project uses a **MySQL** database to store and manage data. Below is the structure, relationships, and setup instructions to get the database running locally or in production.

---
## 🧱 Schema

### `users` Table
| Column       | Type              | Description           |
|--------------|-------------------|-----------------------|
| idusers      | INT (PK) (NN)     | Auto-incremented ID   |
| username     | VARCHAR(75) (NN)  | Username              |
| email        | VARCHAR(200) (NN) | Unique user email     |
| password     | VARCHAR(255)      | Hashed password       |
| token_reset  | VARCHAR(300)      | To reset password     |
| token_expires| TIMESTAMP         | token expiration      |
| roles        | VARCHAR(45) (NN)  | Roles                 |
| status       | VARCHAR(45)       | Payment status        |
| ammount      | INT               | User ammount          |
| purchases    | INT               | User purchases        |
| auth0_sub    | VARCHAR(300)      | auth0 identifier      |
| address      | JSON (NN)         | user address          |

OBS: password column can be null because when the user authenticates via auth0 his password is not saved in the database!

### `clothes` Table
| Column       | Type              | Description                 |
|--------------|-------------------|-----------------------------|
| id           | INT (PK)    (NN)  | Auto-incremented ID  |
| name         | VARCHAR(75) (NN)  | product name         |
| image        | VARCHAR(250) (NN) | product image        |
| info         | VARCHAR(255) (NN) | product information  |
| isFavorite   | TINYINT (NN)      | favorite/unfavorite product |
| sexo         | VARCHAR(45) (NN)  | product sexo         |
| section      | VARCHAR(45) (NN)  | product section      |
| price        | INT (NN)          | product price        |
| isBestseller | TINYINT (NN)      | product bestseller   |
| quantity     | INT (NN)          | product quantity     |

### `dashboard` Table
| Column       | Type             | Description         | Initial value        |
|--------------|------------------|---------------------|----------------------|
| idDashboard  | INT (PK) (NN)    | Auto-incremented ID |                      |
| total_sales  | INT (NN)         | all sales           | 0                    |
|yearMonthsData| JSON (NN)        | array of numbers    |[0, 0, 0, 0, 0, 0]    |
| invoices     | JSON             | all invoices        |[]                    |
| revenue      | INT (NN)         | all revenue         |0                     |
| currentMonth | INT (NN)         | current month number|the current day       |
| weekdays     | JSON (NN)        | array of numbers    |[0, 0, 0, 0, 0, 0, 0] |
| currentDay   | INT (NN)         | current day number  | the current day      |

OBS:
- The array of yearMonthsData column is created according to your current month, every passed month you add a zero. Once correctly added, it'll automatically add the value zero as the new months come!
- In invoices column add an empty array to receive stringfy objects as the users buy products.
- In currentMonth add your current month. Once correctly added, it'll automatically add the new month number
- In weekdays, add a zero to each week day. It'll automatically reset it every monday after a purchased
- In currentDay just add your current day

### `sizes` Table
| Column       | Type             | Description         | 
|--------------|------------------|---------------------|
| idsizes      | INT (PK) (NN)    | Auto-incremented ID |
| label        | VARCHAR(5) (NN)  | sizes abbreviation  |

### `products_size` Table
| Column       | Type     | Description | 
|--------------|----------|-------------|
| product_id   | INT      | product id  |
| idsizes      | INT      | size id     |

```
  products        products_size        sizes
   ┌────┐        ┌────────────┐       ┌────┐
   │ id ├────────► product_id │       │ id │
   └────┘        │ size_id ◄──────────┤    │
                 └────────────┘       └────┘
```

#### Everytime you create a product, is added the product information to clothes table and the sizes to products_size table!










