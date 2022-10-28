<h1 align="center">
SaveTo bot
</h1>
<br>

<p align="center">A Twitter bot which sends your favorite tweets to your telegram account if you mention it under a tweet.</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License MIT">
  </a>
</p>

<hr />

### Getting started

- In your terminal, run the steps:

> `git clone https://github.com/SaveToBot/SaveToBot.git`

> `cd SaveToBot`

- Create .env like .env.example file and adjust keys 

- Run database migrates and seeds 

> `npx knex migrate:latest`

> `npx knex seed:run`

- Run

> `yarn` or `npm install` **for install the dependencies**.

> `yarn start:dev` or `npm run start:dev` for dev mode

> `yarn start` or `npm start` for production mode



You can see dependencies in `package.json` file.

### - LICENSE

This project is licensed under the MIT License - see the <a href="https://opensource.org/licenses/MIT" target="_blank">LICENSE</a> page for details.