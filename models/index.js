import Sequelize from 'sequelize';

// Setup Sequelize
const sequelize = new Sequelize('blockx-dex', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: Sequelize.Op,
  define: {
    underscored: true,
  },
});

// Import Models
const models = {
  User: sequelize.import('./user'),
  Order: sequelize.import('./order'),
  Product: sequelize.import('./product'),
  Stock: sequelize.import('./stock'),
};

// Loop Through Models and set up Associations
Object.keys(models).forEach(modelName => {
  // Set up Associations for Model if it has Associate method
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;