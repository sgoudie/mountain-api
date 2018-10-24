import { connectToDatabase } from '../../libs/mongodb-lib'
import { success, failure } from '../../libs/response-lib'
import convertObjectToDot from '../../libs/convert-object-to-dot'
import Mountain from '../../models/Mountain'

export function main (event, context, callback) {
  /** Immediate response for WarmUP plugin */
  if (event.source === 'serverless-plugin-warmup') {
    console.log('WarmUP - Lambda is warm!')
    return callback(null, 'Lambda is warm!')
  }
  context.callbackWaitsForEmptyEventLoop = false
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body)
  data.updated = Date.now()

  const mountainId = event.pathParameters.id
  const update = convertObjectToDot(data)

  connectToDatabase()
    .then(async () => {
      const mountain = await Mountain.updateOne({ _id: mountainId }, update)
      callback(null, success(`Updated mountain ${mountain._id}`))
    })
    .catch(err => {
      console.log(err)
      if (err.name && err.name === 'CastError') {
        callback(null, failure({
          status: false,
          error: `No mountain found for ${mountainId}`
        }))
      } else {
        callback(null, failure({
          status: false,
          error: err.message
        }))
      }
    })
}
