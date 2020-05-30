
## Installation

1. Get the backend running first, to do that, clone this repo:

   ```
   git clone https://github.com/tope-olajide/Journary-backend.git
   cd Journary-backend
   ```

   Then follow the instructions [here](https://github.com/tope-olajide/Journary-backend#readme) to get the backend server up and running. After that:

1. Install [`node`](https://nodejs.org/en/download/), version 12 or greater

3) Clone this repo and cd into it

   ```
   git clone https://github.com/tope-olajide/journary-frontend.git
   cd journary-frontend
   ```

4) Install all dependencies

   ```
   npm install
   ```

5) navigate to `src/utils/baseUrl.js` and change the baseUrl from 'https://journary.cleverapps.io' to 'http://localhost:8080'`

6) Start the app by running:

   ```
   npm start
   ```

7) Once the server is running, Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Features

1. Create an account with fulname, username, email and password.
2. Sign in with username or email and password
3. Create a new dairy entry
4. Modify an entry
4. Encrypts diary before saving
5. Set and automatically send Email Reminder
6. Select from 5 different theme colors
7. Set dairy to private or public
8. Delete an entry
9. Get all public entries
10. Get all private entries
11. Add Pictures to entries
12. Easy to use WYSIWYG editor
13. Update user's profile
14. Picture Gallery
## Built With

- [NodeJS](https://nodejs.org/en/) - A Javascript runtime built on chrome V8 engine that uses an event-driven non-blocking I/O model that makes it lightweight and efficient.
- [React](https://www.reactjs.org/) - A JavaScript library for building user interfaces by Facebook.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Contributing
If you are interested in contributing to development of this project, follow the instructions below to contribute.

* Fork the repository

* Make your change

* Commit your change to your forked repository

* Provide a detailed commit description

* Raise a pull request against the master branch

#### Can I clone this application for personal use?

    Yes!. This application is licensed under MIT, and it's open for
    everybody

## Author

- **Temitope David Olajide** - Fullstack Developer.

## Acknowledgments

- ReactJS
- Cloudinary