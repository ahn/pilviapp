Pilviapp
--------

Node + Express + Angular + PostgreSQL

Angular-sovellus on kansiossa `client`.

Tiedosto `app.js` määrittelee Node+Express -sovelluksen.
Express-reittejä määritellään tiedostoissa `api.js` ja `auth.js`.
Jälkimmäisessä autentikointiin liittyviä reittejä.

Sequelize-tietokantamallit ovat hakemistossa `models`.

Asennetaan riippuvuudet

    npm install


Sovellus käynnistetään komennolla

    npm start


Tietokannat saa alustettua + tyhjättyä komennolla

    ./bin/reset-dbs

