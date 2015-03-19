#!/usr/bin/env python3

from housepy import config, log
from pymongo import MongoClient, GEOSPHERE, ASCENDING

mongo = config['mongo']
client = MongoClient(mongo['host'], mongo['port'])
db = client[mongo['database']]

try:
    db.features.create_index("properties.expedition")
    db.features.create_index("properties.t_utc")
    db.features.create_index([("geometry", GEOSPHERE)])
except Exception as e:
    log.error(log.exc(e))

"""

# embedded field
db.people.createIndex( { "address.zipcode": 1 } )

# multi field (sort order matters)
db.products.createIndex( { "item": 1, "stock": 1 } )

http://docs.mongodb.org/manual/core/index-compound/
http://docs.mongodb.org/manual/core/index-intersection/

what's the advantage of compound indexes over single indexes?
seems to be little, in this case

indexes
- expedition
- t_utc
- coordinates

//

db.collection.createIndex( { <location field> : "2dsphere" } )
db.collection.createIndex( { geometry : "2dsphere" } )

//

db.<collection>.find( { <location field> :
                         { $near :
                           { $geometry :
                              { type : "Point" ,
                                coordinates : [ <longitude> , <latitude> ] } ,
                             $maxDistance : <distance in meters>
                      } } } )


Mongo started allowing altitude in the coordinates field 6 days ago

//

so what does a query on a property look like?

features = db.features.find({'properties.expedition': "okavango_15", 'properties.Person': "Brian"}).sort('t_utc')

posts.find({"date": {"$lt": d}}).sort("author").explain()["cursor"]





"""