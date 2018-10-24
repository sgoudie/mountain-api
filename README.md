# 🏔 Mountain API

A simple [Serverless](https://serverless.com/) API example, using MongoDB and AWS.

#### Offline Setup
- Follow the instructions in `env.example` and add a MongoDB connection string
- Run `npm install`
- Run `npm run sls-offline`

## Model
```js
// MOUNTAIN
{
  created: Number,
  updated: Number,
  name: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true,
    enum: ['England', 'N.Ireland', 'Scotland', 'Wales']
  },
  county: String,
  height: {
    metres: Number,
    feet: Number
  },
  prominence: {
    metres: Number,
    feet: Number
  },
  os_grid_ref: String,
  classification: [String]
}
```

## Example endpoints
`POST /mountains`
`PUT /mountains/:id`
`GET /mountains`
`GET /mountains?region=<REGION>`
`GET /mountains/:id`
`DELETE /mountains/:id`


## Offline Example
```js
// POST http://localhost:3000/mountains
// x-api-key set in the header
{
	"name": "Snowdon",
	"region": "Wales",
	"county": "Gwynedd",
	"height": {
		"metres": 1085,
		"feet": 3560
	},
	"prominence": {
		"metres": 1039,
		"feet": 3409
	},
	"os_grid_ref": "SH609543",
	"classification": ["Ma", "F", "Sim", "Hew", "N", "CoH", "CoU", "CoA"]
}
/*=>
{
	"object": "mountain",
	"method": "POST",
	"url": "/mountains",
	"data": {
		"classification": [
			"Ma",
			"F",
			"Sim",
			"Hew",
			"N",
			"CoH",
			"CoU",
			"CoA"
		],
		"_id": "5bd076a346941d76ecc3e08e",
		"name": "Snowdon",
		"region": "Wales",
		"county": "Gwynedd",
		"height": {
			"metres": 1085,
			"feet": 3560
		},
		"prominence": {
			"metres": 1039,
			"feet": 3409
		},
		"os_grid_ref": "SH609543",
		"created": 1540388514813,
		"updated": 1540388514813,
		"__v": 0
	}
}
*/
```

## Further resources
- [Serverless docs](https://serverless.com/framework/docs/)
- [Serverless Stack](https://serverless-stack.com)

---

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)
