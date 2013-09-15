//Homework 5.2

db.zip.aggregate([{$match:{"state":{$in:["CA","NY"]}}},{$group:{_id:{state:"$state",city:"$city"},pop:{$sum:"$pop"}}},{$match:{pop:{$gte:25000}}},{$group:{_id:1,avg_pop:{$avg:"$pop"}}}])

//Homework 5.3

db.grades.aggregate([{$unwind: "$scores"},{$match: {"scores.type":{"$in":["homework","exam"]}}},{$group: {_id:{"class":"$class_id","student_id":"$student_id"},"average":{$avg:"$scores.score"}}},{$group: {_id:{'class':"$_id.class"}, class_average:{$avg:"$average"}}},{$sort: {"class_average":1}}])

