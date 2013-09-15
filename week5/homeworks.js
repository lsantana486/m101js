//Homework 5.2

db.zip.aggregate([{$match:{"state":{$in:["CA","NY"]}}},{$group:{_id:{state:"$state",city:"$city"},pop:{$sum:"$pop"}}},{$match:{pop:{$gte:25000}}},{$group:{_id:1,avg_pop:{$avg:"$pop"}}}])

//Homework 5.3

db.grades.aggregate([{$unwind: "$scores"},{$match: {"scores.type":{"$in":["homework","exam"]}}},{$group: {_id:{"class":"$class_id","student_id":"$student_id"},"average":{$avg:"$scores.score"}}},{$group: {_id:{'class':"$_id.class"}, class_average:{$avg:"$average"}}},{$sort: {"class_average":1}}])

//Homework 5.4

db.zip.aggregate([{$project: {first_char: {$substr : ["$city",0,1]},city:1,pop:1,code:"$_id"}},{$match:{"first_char":{$in:["0","1","2","3","4","5","6","7","8","9"]}}},{$group:{_id:"results",total:{$sum:"$pop"}}}])
