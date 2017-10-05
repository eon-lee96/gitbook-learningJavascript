function test(a) {
    console.log(a)
    return false
}
var arr = []
var result = arr.every(test)
console.log(result)