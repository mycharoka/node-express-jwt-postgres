
# TODO : Uji Coba Fungsi Sistem CRUD Express JS

  

Melakukan pengujian dari sistem CRUD menggunakan Express JS dengan autentikasi JWT. CRUD yang diubat adalah untuk **Sign Up**, **Login**, **Update Password User**, **Find All Registered User**, **Find User by ID**, dan **Delete User**

  
  

## 1. Sign Up

 2. [ ] User bisa mendaftar dengan memasukkan **Username** dan **Password**

 3. [ ] Sistem mengecek apakah **Username** yang di input user sudah terdapat di database
	 > **Note :** Sistem akan mengecek Username **JIKA** input Username dan Password sudah terisi

 4. [ ] **Password** yang didaftarkan ke database harus melewati tahap enkripsi

 5. [ ] Jika terdapat pendaftaran di sistem dengan **Username** yang sudah terdaftar sistem menampilkan peringatan
 6. [ ] Sistem memerika apakah Username dan Password yang di input merupakan string kosong atau spasi

  
  

## 2. Login

  

- [ ] User dapat memasukkan **Username** dan **Password**

- [ ] Sistem memeriksa apakah **Username** yang di input terdaftar pada database

- [ ] Sistem memeriksa apakah **Password** yang di input merupakan password yang sama di database

- [ ] Sistem memberikan peringatan jika ingin mencoba *Login* tanpa menginput **Username** atau **Password**

- [ ] Sistem memberikan peringatan jika ingin mencoba *Login* dengn menginput **Username** dan **Password** yang salah

- [ ] Sistem dapat me -*generate* token JWT yang berisi **ID** dan **Username** yang terdaftar (***payload***)

  

## 3. Update Password User

  

- [ ] User memasukkan **Username** dan **Password** serta **Password Baru** yang akan di daftarkan

- [ ] Sistem akan memeriksa jika **Username** yang di input terdaftar pada database

- [ ] Sistem akan memeriksa jika **Password** yang di input merupakan password yang dengan yang terdapat pada database

- [ ] Sistem akan melakukan enkripsi untuk **Password Baru** jika **Username** dan Password merupakan data yang terdaftar pada database

- [ ] Sistem akan menyimpan **Password Baru** kedalam data **Username** yang diinput kedalam database

- [ ] Sistem akan memberikan peringatan jika **Username** dan atau Password yang diinput tidak terdaftar didalam database
- [ ] Sistem akan memeriksa jika **Password Baru** yang didaftar merupakan string kosong atau whitespaces

  

## 4. Find User by ID

  

- [ ] User memasukkan **ID** yang ingin dicari didalam sistem dengan token yang sudah digenerate untuk login
	> **Note :** Fitur ini untuk mengecek saja ID dari user yang sudah terdaftar, **MUNGKIN** lebih cocok untuk sisi Admin

- [ ] Sistem dapat menampilkan **ID** yang sesuai dengan permintaan User berdasarkan dari token yang di generate

- [ ] Sistem akan memberikan peringatan jika **ID** yang diminta tidak terdapat pada sitem
	> **Note :** Hal ini terjadi berdasrkan token yang di input

  

## 5. Find All Registered User

  

- [ ] User melakukan pencarian terhadap seluruh User yang terdaftar pada sistem

- [ ] Sistem menampilkan seluruh User yang terdaftar beserta **ID** dan **Username**

  

## 6. Delete User

  

- [ ] User memasukkan **Username** dan **Password** untuk menghapus data user yang tersimpan di database

- [ ] Sistem memeriksa **Username** yang dimasukkan oleh User dengan **Username** yang terdaftar di database

- [ ] Jika sistem telah mem-*validasi*  **Username**, maka sistem kemudian akan memeriksa **Password**

- [ ] Sistem akan memeriksa jika **Password** yang dimasukkan oleh user terdaftar pada database

- [ ] Sistem akan menghapus data user jika proses **Username** dan **Password** sudah melewati tahap validasi

- [ ] Sistem akan memberikan peringatan jika **Username** dan atau **Password** yang dimasukkan User tidak terdaftar pada database

  
  

# Revisi

>  **Note:** cantumkan hal-hal yang perlu diperbaiki atau ditambah dari seluruh proses yang dibuat pada Sistem CRUD

-  ### Hal yang harus diperhatikan

- [ ] Apakah pada saat **Sign Up** user dapet memasukkan **Username** dengan string dan **Password** kosong?

- [ ] Apakah dari *payload* yang di *generate* dari token dapat digunakan untuk proses selain **GET** data User saja?
- [ ] Apakah saat merubah **Password Baru**, input yang diberikan dapat berupa string kosong atau whitespace?
- [ ] Bagaimana **JIKA** input **Username** dan **Password** yang di input untuk **Sign Up** merupakan kumpulan angka saja (integer)?
