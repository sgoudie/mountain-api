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
  const mountainId = event.pathParameters.id

  connectToDatabase()
    .then(async () => {
      const mountain = await Mountain.findOne({ _id: mountainId }, { __v: 0 })
      if (mountain === null) {
        callback(null, failure({
          status: false,
          error: `No mountain found for ${mountainId}`
        }))
      } else {
        const data = mountain.toJSON()
        callback(null, success({
          object: 'mountain',
          method: 'GET',
          url: event.path,
          data
        }))
      }
    })
    .catch(err => {
      console.log(err)
      callback(null, failure({
        status: false,
        error: err.message
      }))
    })
}
