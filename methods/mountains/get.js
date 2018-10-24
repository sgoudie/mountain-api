import { connectToDatabase } from '../../libs/mongodb-lib'
import { success, failure } from '../../libs/response-lib'
import { adminCheck } from '../../libs/auth'
import Mountain from '../../models/Mountain'
import Respondent from '../../models/Respondent'

export function main(event, context, callback) {
  /** Immediate response for WarmUP plugin */
  if (event.source === 'serverless-plugin-warmup') {
    console.log('WarmUP - Lambda is warm!')
    return callback(null, 'Lambda is warm!')
  }
  context.callbackWaitsForEmptyEventLoop = false;
  const mountainId = event.pathParameters.id;

  connectToDatabase()
    .then(() => {
      const mountain = await Mountain.findOne({_id: mountainId }, { __v: 0 })
      const data = mountain.toJSON();
      callback(null, success({
        object: 'mountain',
        url: event.path,
        data
      }));
    })
    .catch(err => {
      console.log(err);
      callback(null, failure({
        status: false,
        error: err.message,
      }))
    })
}
