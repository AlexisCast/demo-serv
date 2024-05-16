# demo-serv

# Getting Started

## Step 1: Start your Application

```bash
# using npm
npm i
npx nodemon app
```

## Env File:

- PORT=8080
- NODE_ENV= type of environment
- MONGODB_CNN:=<mongodb+srv://...>

- JWT_SECRET=secretwordkeyofstring
- JWT_EXPIRES_IN=4h | 1m | 30s

- NODEMAILER_HOST=sandbox.smtp.mailtrap.io
- NODEMAILER_AUTH_USER=mailtrapuser
- NODEMAILER_AUTH_PASS=mailtrappassword
- NODEMAILER_FROM=anemail@provider.com
- NODEMAILER_PORT=mailtrapportnumbner

- CLOUDINARY_URL=cloudinary://...
- CLOUDINARY_FOLDER=nameOfFolder

https://miracleio.me/snippets/use-gmail-with-nodemailer/

https://mailtrap.io/inboxes/2850586/messages
https://cloudinary.com/blog/guest_post/upload-images-to-cloudinary-with-node-js-and-react


```bash
PORT=8080
NODE_ENV=development
MONGODB_CNN=mongodb://localhost:27017/demo-db

JWT_SECRET=
JWT_EXPIRES_IN=

NODEMAILER_HOST=
NODEMAILER_AUTH_USER=
NODEMAILER_AUTH_PASS=
NODEMAILER_FROM=
NODEMAILER_PORT=

CLOUDINARY_URL=
CLOUDINARY_FOLDER=
```
