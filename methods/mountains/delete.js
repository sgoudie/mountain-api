import { connectToDatabase } from '../../libs/mongodb-lib';
import { success, failure } from '../../libs/response-lib';
import Mountain from '../../models/Mountain';

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
      const mountain = await Mountain.findOneAndRemove({_id: mountainId });
      if (mountain === null) {
        callback(null, failure({
          status: false,
          error: `No mountain found for ${mountainId}`,
        }))
      } else {
        callback(null, success(`Deleted mountain ${mountainId}`));
      }
    })
    .catch(err => {
      console.log(err);
      callback(null, failure({
        status: false,
        error: err.message,
      }))
    });
}
