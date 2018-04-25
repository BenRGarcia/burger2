# Burger2

> A Full-Stack Node/Express.js app made with [Handlebars](https://handlebarsjs.com/) and [Sequelize](http://docs.sequelizejs.com/)

Click [here](https://calm-stream-32059.herokuapp.com/) to see the deployed app on Heroku

## Description

CRUD operations:

1. Users add their name and a burger they'd like to eat
2. Users can "eat" burgers after they are added
3. Users can see all burgers in the database whether "eaten" or not
4. Users can delete all burgers and names in the database

### Creating a Burger

![create-burger](https://user-images.githubusercontent.com/26657982/39256015-da1b4422-487b-11e8-9cc9-15563d5c34f8.gif)

### Eating a Burger

![eat-burger](https://user-images.githubusercontent.com/26657982/39256019-da3cf040-487b-11e8-8032-458653ee622f.gif)

### Deleting All Burgers and Customer Data

![delete-burger](https://user-images.githubusercontent.com/26657982/39256018-da2c8246-487b-11e8-90dc-1f189d1e838f.gif)

### Code Snippets

In `/models/burger.js`, table definition with data validation and foreign key association

```js
module.exports = (sequelize, DataTypes) => {

  // Define model (DB table)
  const Burger = sequelize.define("Burger", {
    burger_name: {
      type: DataTypes.STRING,
      notNull: true,
      validate: {
        len: [1,64],
        is: /[\w ]/g  // A-Z, a-z, 0-9, or a space
      }
    },
    is_devoured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, { 
    timestamps: false,
    underscored: true
  });

  // Define association
  Burger.associate = models => {
    models.Burger.belongsTo(models.Customer);
  };

  // Return Burgers object
  return Burger;
};
```

In `/routes/burgers.js`, POST request creates new Burger with Customer association

```js
// Define methods for PATH '/api/burgers'
apiRouter.route('/')

  // Create new burger (and customer if not yet in DB)
  .post((req, res, next) => {
    // Parse out data from request body
    const customer_name = req.body.customer_name;
    const burger_name = req.body.burger_name;
    // Create new burger with association to customer id
    models.Burger.create({
        burger_name,
        Customer: { customer_name }
      },{
        include: [{
          association: models.Burger.belongsTo(models.Customer)
        }]
      })
      // Send response to client
      .then(() => res.status(201).send())
      .catch(err => {
        console.error(err);
        res.status(500).send();
      });
  })
```