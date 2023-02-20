module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Actors', [{
      firstName: 'John',
      lastName: 'Shinha',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Actors', null, {});
  }
};