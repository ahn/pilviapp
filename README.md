Pilviapp
--------

Node + Express + Angular + PostgreSQL

Angular-sovellus on kansiossa `client`.

Tiedosto `app.js` määrittelee Node+Express -sovelluksen.
Express-reittejä määritellään tiedostoissa `api.js` ja `auth.js`.
Jälkimmäisessä autentikointiin liittyviä reittejä.

Sequelize-tietokantamallit ovat hakemistossa `models`.

Käyttää oletuksena tietokantaa osoitteessa `postgres://dev:dev@127.0.0.1/database_dev`. (Määritelty tiedostossa `models/index.js`).

## Käyttöönotto

Luo Postgres-tietokanta nimeltä `database_dev` ja käyttäjä nimeltä `dev` salasanalla `dev`.
[Ohjeet PostgreSQL-tietokannan käyttöönottoon Cloud9:ssa.](https://docs.c9.io/docs/setting-up-postgresql)

Asenna riippuvuudet:

    npm install

Käynnistä sovellus:

    npm start

Tietokannat saa alustettua + tyhjättyä komennolla

    ./bin/reset-dbs

