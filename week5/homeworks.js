//Homework 5.2

db.zip.aggregate([{$match:{"state":{$in:["CA","NY"]}}},{$group:{_id:{state:"$state",city:"$city"},pop:{$sum:"$pop"}}},{$match:{pop:{$gte:25000}}},{$group:{_id:1,avg_pop:{$avg:"$pop"}}}])