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
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  const mountain = data;
  mountain.created = Date.now();
  mountain.updated = Date.now();

  connectToDatabase()
    .then(async () => {
      const newMountain = await Mountain.create(mountain);
      callback(null, success(newMountain));
    })
    .catch(err => {
      console.log(err);
      callback(null, failure({
        status: false,
        error: err.message
      }))
    });
}
