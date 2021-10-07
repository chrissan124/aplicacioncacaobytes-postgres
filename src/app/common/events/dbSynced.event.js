const setPermissions = require('../../role/permission/persistence/permission.config')
const setRoles = require('../../role/permission/persistence/role_permission.config')

function registerEvent(bus, container) {
  const event = 'dbSynced'

  const apiDb = container.resolve('apiDb')
  bus.register(event, () => {
    setPermissions(apiDb, apiDb.models.Permission).then(() => {
      setRoles(apiDb)
    })
  })
}
module.exports = registerEvent
