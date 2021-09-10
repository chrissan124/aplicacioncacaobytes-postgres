const { createController } = require('awilix-router-core')
const NotFoundError = require('../../common/controllers/error-handling/NotFoundError')
const paginateRequest = require('../../common/controllers/pagination/paginateRequest')
const paginateResponse = require('../../common/controllers/pagination/paginateResponse')

const consultControllers = (getTemplatesService) => ({
  getTemplates: async (req, res, next) => {
    try {
      const paging = paginateRequest(req)
      const result = await getTemplatesService.getTemplates(paging)
      paginateResponse(req, res, result)
    } catch (error) {
      next(error)
    }
  },
  getTemplate: async (req, res, next) => {
    try {
      const id = req.params.id
      const result = await getTemplatesService.getTemplate(id)
      if (result) res.send(result)
      else next(NotFoundError(`contrac template ${id}`))
    } catch (error) {
      next(error)
    }
  },
})

module.exports = createController(consultControllers)
  .prefix('/api/contract-templates')
  .get('', 'getTemplates')
