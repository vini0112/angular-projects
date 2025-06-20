# API_CLOTHE-STORE

### 🧾 Dependecies -> All dependecies are available in package.json file!
- mysql2 ^3.12.0
- nodemailer ^6.10.0
- passport ^0.7.0
- passport-auth0 ^1.4.4
- socket.io ^4.8.1
- stripe ^18.0.0
- sequelize ^6.37.5
- multer ^1.4.5-lts.1
- jsonwebtoken ^9.0.2
- jwks-rsa ^3.2.0
- express ^4.21.2
- dotenv ^16.4.7

### 🚀 Getting Started 
- ℹ️ Make sure to have cloned the repository in the first README! If you don't  -> 🔗 [MAIN README](../README.md)
  
### 1. get into the frontend folder
   ```
  cd api_clothe-store
  ```
### 2. Install the dependecies
   ```
  npm install
  ```
### 3. ⚙️ Environment Variables
- Create a .env file at the root of the backend folder:
  - In api_clothe-store folder -> right click > New File
  - name it .env

#### DATABASE
  - DB_PORT=yourPort
  - DB_HOST=localhost
  - DB_USER=root
  - DB_PASSWORD=yourPassword
  - NAME=yourDBName

#### JWT
  - SECRET_KEY=your_jwt_secret
  - REFRESH_TOKEN=your_jwt_secret or create a random one
    
#### ADM/DEVELOPER AUTHENTICATION - ℹ️ this is used in the login logic! 
- EMAIL_OF_DEVELOPER=yourEmail
- ADM_ROLE=yourRole

#### RESET PASSWORD INFORMATION
- SECRET_RESET_PASSWORD=create a random hard to break token
- MY_EMAIL=yourEmail 
- MY_PASSWORD=create a random hard to break password 
- CLIENT_URL=http://localhost:4200/reset-password

#### STRIPE VARIABLES
- STRIPE_PUBLIC_KEY=yourPublicKey
- STRIPE_SECRET_KEY=yourSecretKey
- STRIPE_SECRET_ID=yourSecretID
- STRIPE_SECRET_ENDPOINT=yourSecretEndpoint

#### AUTH0
- AUTH0_DOMAIN=yourDomain
- AUTH0_CLIENT_ID=yourClientID
- AUTH0_CLIENT_SECRET=yourClientSecret
- AUTH0_CALLBACK_URL=http://localhost:3000/callback
- API_AUTH0_ID=yourID
- API_AUTH0_AUDIENCE=yourAUDIENCE

### 3. ▶️ Run the Project
   ```
  npm start
  ```
##### Or Run with Nodemon
 ```
 npm run dev
 ```
## 📌 Important Points 📌
- Stripe listener needs to be running in the prompt:
 ```
 stripe listen --forward-to localhost:3000/webhook
 ```
So now you can see a real simulation of stripe payment! I'm explaining more about stripe webhook in this video on LinkedIn 🔗 [WEBHOOK VIDEO](https://www.linkedin.com/posts/vin%C3%ADcius-silva-26b715321_fullstack-ecommerce-stripe-activity-7318990406040383488-RbxE?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFFxGDMBbncfBKgY8dvI-a1LRXErWJQw7w8)







