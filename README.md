# All My Life She Sacrificed

'All My Life She Sacrificed' is a Social Network and e-commerce site for sharing uplifting stories about mothers - Users can login to their profile, make posts, comment on other user’s posts, upload, crop and add filters on their pictures and stories, as well as make purchases for a mother’s day celebrations package within the application via Stripe Checkout.

You can checkout it out here: [All My Life She Sacrificed](https://www.allmylifeshesacrificed.com/)

## How it's Made
Tech Used: AWS SES, AWS S3, Stripe, Service Workers, Tailwind, Daisy UI, EJS, Node.js, Caman.js, Croppie.js, Nodemailer, Javascript, Express.js, MongoDB, Passport - Google oAuth.

## Features

- ###  **Login via Google OAuth, Share Images with Custom Filters and Post Stories**


![User Login - Making Posts using Custom Image Filters](https://raw.githubusercontent.com/kolourr/All-My-Life-She-Sacrificed/main/apppages/pic3.gif)


- ### **Custom User Dashboards, Feeds and Commenting System**

![Custom User Dashboards, Feeds and Commenting System](https://raw.githubusercontent.com/kolourr/All-My-Life-She-Sacrificed/main/apppages/pic4.gif)


- ### **Crop and edit Profile Pictures. Check stats via Push Notification Service Worker**

![Crop and edit Profile Pictures. Check stats via Push Notification Service Worker](https://raw.githubusercontent.com/kolourr/All-My-Life-She-Sacrificed/main/apppages/pic1.gif)


- ### **Buy your mom a lifetime supply of Mother's Day Wishes via Stripe Checkout**

![Buy your mom a lifetime supply of Mother's Day Wishes via Stripe Checkout](https://raw.githubusercontent.com/kolourr/All-My-Life-She-Sacrificed/main/apppages/pic2.gif)


- ### **Welcome email sent via AWS SES and Sendy**

![Welcome email sent via AWS SES and Sendy](https://raw.githubusercontent.com/kolourr/All-My-Life-She-Sacrificed/main/apppages/welcome.png)


# Install

`npm install`


# What Needs to be Added

Create a `.env` file in config folder and add the following as `key = value`
- PORT = 3000
- MONGO_URI = MongoDB Cloud String
- GOOGLE_CLIENT_ID = Google Developer Client ID
- GOOGLE_CLIENT_SECRET = Google Developer Secret
- BUCKET = AWS S3 Bucket
- AWS_ACCESS_KEY_ID = AWS S3 Access Key ID
- AWS_SECRET_ACCESS_KEY = AWS S3 Secret
- AWS_DEFAULT_REGION = AWS S3 Default region
- APP_EMAIL = Application Email
- APP_ADMIN = App Admin Name
- APP_NAME = App Name
- VAPID_PUBLIC_KEY = Service Worker Public Key
- VAPID_PRIVATE_KEY = Service Worker Private Key
- LIST_ID = Sendy Welcome Email ID
- SENDY_URL = Sendy Url used for Signup
- SENDY_API_KEY= Sendy API
- STRIPE_PUBLIC_KEY = Stripe Public Key
- STRIPE_PRIVATE_KEY = Stripe Private Key/Test Key
- SERVER_URL = Server URL
- MOTHERS_DAY_LIST = ID of the Sendy List

# Run

`npm start`


# Future Optimizations
- Optimize Image and Story Feed
- Use React on the frontend
- Add ability to Search
- Add social media sharing ability