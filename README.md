
# TODO :  CRUD Express JS

  

Melakukan pengujian dari sistem CRUD menggunakan Express JS dengan autentikasi JWT. CRUD yang diubat adalah untuk **Sign Up**, **Login**, **Update Password User**, **Find All Registered User**, **Find User by ID**, dan **Delete User**

  
## Getting Started  
Pertama-tama yang harus dilakukan terlebih dahulu adalah menginstall `package.json` dengan menggunakan command jika terdapat `package-lock.json`

First thing first that should be done is to install the `package.json` file or if there's `package-lock.json` you can use this command

    npm ci
jika hanya terdapat `package.json` maka lakukan 

If there's only `package.json` file then do this command

    npm install

Buat file `.env` dengan variabel yang tertera pada `.env.example`, untuk isi dari `.env` sesuaikan dengan kebutuhan atau settingan masing-masing, sebagai acuan

Create the `.env` file using all variables that written on `.env.example`,  for the content of `.env` file fill it with your own settings

    ACCESS_TOKEN_SECRET= "secret for JWT token"
    	
    DB_USER = "user database"
    DB_PASS = "password database"
    DB_NAME = "database name"
    DB_PORT =  port database
    
    PORT = port app

>**Notes :** Untuk ACESS_TOKEN_SECRET dapat menggunakan require('crypto').randombytes(64).tostring('hex') untuk mendapatkan randombytes agar token secret tersedia secara acak 

Jalankan command untuk migrasi database yang berfungsi untuk membuat table dan kolom secara otomatis, hal yang perlu dipersiapkan adalah database yang ingin dituju kemudian jalankan command pada terminal

Run this command to migrate the database so it can automatically build an new table and column on its own, it only require the database that you're going to use

    npm run migration

Kemudian jika sudah maka untuk menjalankan app menggunakan command

Run this command to start the app

    npm run dev
## The CRUD feature
 1. Sign Up
 2. Login
 3. Update Password User
 4. Find User by ID
 5. Find All Registered User
 6. Delete User

  


