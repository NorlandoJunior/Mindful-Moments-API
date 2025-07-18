const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mindful Moments API',
      version: '1.0.0',
      description: 'API para app Mindful Moments',
    },
    servers: [
      {
        url: 'https://mindful-moments-api.onrender.com/',  
  },
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = { swaggerUi, swaggerSpec };
