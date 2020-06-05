# Lesson 1

* #### Create a new Typescript `NodeTS/Express` project:
  1. `yarn init -y`
     * Initializes a new NodeJS project
  2. `yarn add express`
  3. `yarn add -D ts-node`
       * It's adding the executable that start the project/script with **.ts** extension, otherwise, if was a **.js**, use:
         * `node <<script_name.js>>`
       * *How to use:*
         * `yarn ts-node <<script_name.ts>>`
  4. `yarn add -D typescript`
  5. `yarn tsc --init`

# Lesson 2

* #### NodeTS:
  * enable body with json:
     ```js
    import express from 'express';
    
    const app = express();
    app.use(express.json());
    ```