const { createController } = require('awilix-router-core')

const consultControllers = (createBaseUserService) => ({
  createUSer: async (req, res, next) => {
    try {
      await createBaseUserService.createBaseUser()
      res.send({ message: 'User created', status: 200, date: new Date() })
    } catch (error) {
      next(error)
    }
  },
})

module.exports = createController(consultControllers)
  .prefix('/setup-user')
  .all('', 'createUSer')
