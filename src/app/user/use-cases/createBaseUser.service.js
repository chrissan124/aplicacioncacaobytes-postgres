const { unlink, readFileSync } = require('fs')
const { resolve } = require('path')
const ForbiddenError = require('../../common/controllers/error-handling/forbiddenError')
const logger = require('../../common/controllers/logger/logger')

class createBaseUserService {
  constructor(userRepository, registerUserService, getRolesService) {
    this.userRepository = userRepository
    this.registerUserService = registerUserService
    this.getRolesService = getRolesService
  }
  /*
    This service is meant to be executed only when there's no users created. You'll have to create a user.json file with your user data
  */
  async createBaseUser() {
    let user = undefined
    const path = `${resolve('src')}/user.json`
    try {
      const rawUser = readFileSync(path)
      user = JSON.parse(rawUser)
    } catch (error) {
    } finally {
      try {
        const users = await this.userRepository.getAll({})
        if (users.count > 0) {
          throw new ForbiddenError(`There's already an existent user`)
        }
        if (users.count == 0 && !user) {
          throw new ForbiddenError('Please create a user.js file first')
        }
        const roles = await this.getRolesService.getRoles({ name: 'master' })
        let roleFk
        if (roles.count > 0) {
          roleFk = roles.rows[0].roleId
        }
        await this.registerUserService.registerUser({ ...user, roleFk }, false)
        unlink(path, (err) => {
          if (err) {
            logger.error(`Couldn't delete user.json file [${err.message}]`)
          }
        })
        logger.info('Created base user ' + user.email)
      } catch (error) {
        throw error
      }
    }
  }
}
module.exports = createBaseUserService
