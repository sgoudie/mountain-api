import { connectToDatabase } from '../../libs/mongodb-lib'
import { success, failure } from '../../libs/response-lib'
import Mountain from '../../models/Mountain'

export function main (event, context, callback) {
  /** Immediate response for WarmUP plugin */
  if (event.source === 'serverless-plugin-warmup') {
    console.log('WarmUP - Lambda is warm!')
    return callback(null, 'Lambda is warm!')
  }
  context.callbackWaitsForEmptyEventLoop = false

  connectToDatabase()
    .then(async () => {
      const params = {}
      const projection = {}

      if (event.queryStringParameters) {
        const { region } = event.queryStringParameters
        if (region) {
          params.region = region
          projection.region = region
        }
      }
      // We remove the __v field as it's not needed by the user
      const fields = { __v: 0 }
      const mountains = await Mountain.find(projection, fields).lean()

      callback(null, success({
        object: 'list',
        method: 'GET',
        url: event.path,
        params,
        count: mountains.length,
        data: mountains
      }))
    })
    .catch(err => {
      console.log(err)
      callback(null, failure({
        status: false,
        error: err.message
      }))
    })
}
