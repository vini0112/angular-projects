# ClothesStore

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.5.

## 🧾 Dependecies -> All dependecies are available in package.json file!
- Angular 19
- Angular-Material ^19.2.10
- fortawesome/fontawesome-free ^6.7.1
- jwt-decode ^4.0.0
- apexcharts ^4.5.0
- ng-apexcharts ^1.15.0
- ngx-socket-io ^4.8.5
- angular/cdk ^19.2.10
- ngx-stripe ^19.0.0
- stripe-elements/stripe-elements ^2.0.2
- stripe/stripe-js ^5.10.0
- rxjs ~7.8.0
- auth0/angular-jwt ^5.2.0
- auth0/auth0-angular ^2.2.3

## 🚀 Getting Started 
- ℹ️ Make sure to have cloned the repository in the first README! If you don't  -> 🔗 [MAIN README](../README.md)
  
### 1. get into the frontend folder
   ```
  cd clothes-store
  ```
### 2. Install the dependecies
   ```
  npm install
  ```
### 3. Run the Project
   ```
  ng start
  ```
### 4. Run Unit Tests (Optional)
   ```
  ng test
  ```

## 📌 Important Points 📌
- The whole app is running with OnPush Strategy
- Registering/Login system + Auth0 authentication 
- Payment system with Stripe -> You need to run the webhook in your prompt and use the fake card number that stripe gives for tests, so then you can see the success payment page, without the webhook running in your prompt you'll only see the failer payment page! I'm covering more about the payment system in the backend README. Go there to check 🔗 [Backend (Node.js)](../api_clothe-store/README.md)
- Using ng-apexcharts to display the graphs in the dashboard
- ngx-socket.io to real-time responses, but i'm just using it to get the online users in real time. So i'm displaying the online users in the dashboard only for the ADM.
- Angular-Material only used to get the toggle button of dark-theme





