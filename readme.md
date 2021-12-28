# rateplate

# install & run

**Clone repo**
```
git clone https://github.com/mikemajara/rateplate
cd rateplate
yarn install #install dependencies
```

**Run backend**
Make sure `backend` is running with a valid PostgreSQL endpoint available.
```shell
cd backend
docker-compose up
```

**Set up environment variables**
create a local copy for development, and fill in with relevant details
```shell
cp .env .env.local
```


**Initialize and seed the database**
```shell
npx prisma migrate reset
npx prisma db seed
```

💡 Default user alice (alice@ofertas.io - alice) is seeded.

**Run front & backend**
```shell
yarn dev
```
build: `yarn build`
run: `yarn start`

# API

1. Start your project as indicated above
2. Sign up with any of the provided methods. Methods might require ENV varialbles, so make sure you use one you already set up. If the DB is up and running registering with credentials might be the most straight forward one as it does not require authentication.
3. Go to [settings](localhost:3000/settings)
4. Click **Generate API Key** and copy the key
5. Use the key as a password for Basic Authentication in your API IDE of choice.

💡 **Hint:** postman collections are in [postman](postman) directory. you can import them into your Postman app and test them out. 

📝 **Note:** Basic Authentication is the combination of a username and a password. To use this API you need to use both your email as username and your API Key as password. Read more in [RFC7617 Section 2 Page 4](https://datatracker.ietf.org/doc/html/rfc7617#section-2)

> To receive authorization, the client
>
>   1.  obtains the user-id and password from the user,
>
>   2.  constructs the user-pass by concatenating the user-id, a single
>       colon (":") character, and the password,
>
>   3.  encodes the user-pass into an octet sequence (see below for a
>       discussion of character encoding schemes),
>
>   4.  and obtains the basic-credentials by encoding this octet sequence
>       using Base64 ([RFC4648], Section 4) into a sequence of US-ASCII
>       characters ([RFC0020]).

**Example**  
user: myemail@mailserver.com
pass: mypassword

```js
// execute in browser to try
btoa("myemail@mailserver.com:mypassword")
bXllbWFpbEBtYWlsc2VydmVyLmNvbTpteXBhc3N3b3Jk
```
Headers: 
```json
{ 
  //...
  "authorization": "Basic bXllbWFpbEBtYWlsc2VydmVyLmNvbTpteXBhc3N3b3Jk"
  // ...
}
```

# read more

- [NextJS](nextjs.org/)
- [Installation & original template](install.md)
- [RFC7617 - The 'Basic' HTTP Authentication Scheme](https://datatracker.ietf.org/doc/html/rfc7617#section-2)