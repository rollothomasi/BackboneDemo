obj =
    name: "Sam"
    donkeys: true
    getName: () ->
        @name

console.log(obj.getName())

arr = "abcdefghijklmnopqrstuvwxyz"

for i in arr by 3
    console.log i

myfunc = (name, @family) ->
    @


