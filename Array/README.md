# 前言

数组的学习

# 一些概念与理解

> 数组元素可以使任意类型的，并且同一个数组中的不同元素也可能是不同的类型。数组的元素甚至可能是对象或其他数组

>JavaScript数组的索引是基于零的32位数值，第一个元素的索引位为0，最大可能的索引为4294967294 {2(32)-2}，最大能容纳4294967295。

> JavaScript数组是动态的：根据需要它们会增长或缩减，并且在创建数组时无须声明一个固定的大小或者数组大小变化时无须重新分配空间

> JavaScript数组可能是稀疏的：数组索引不一定要连续的，他们之间可以有空缺。每个JavaScript数组都有一个length属性。针对非稀疏数组，该属性就是数组元素的个数。针对稀疏数组，lenght比所有元素的索引要大

```javascript
var arr = [1, 2, 3]
arr[6] = 1
console.log(arr.length) //7
```

> JavaScript数组是JavaScript对象的特殊形式，数组索引实际上和碰巧是整数的属性名差不多。
>
> 请记住，数组是对象的特殊形式。使用方括号访问数组元素就像用方括号访问对象的属性一样。JavaScript将指定的数字索引转换成字符串，然后将其作为属性名来使用。
>
> 数组的特别之处在于，当使用小于2的32次方的非负整数作为属性名时数组会自动维护其length属性。
>
> 清晰地区分数组的索引和对象的属性名是非常有用，所有的索引都是属性名，但只有在0~2的32次方-1之间的整数才是索引。所有的数组都是对象，可以为其创建任意名字的属性。但如果使用的属性是数组的索引，数组的特殊行为就是将根据需要更新他们的length属性。

也就是说。。可以有这样的代码

```javascript
var arr=[1,2,3]
arr[-1]=0
console.log(arr) //(3) [1, 2, 3, -1: 0]
```

但这时候的`-1`并不是索引，因为规定了索引只能是非负整数。只能说这是数组的一个属性。`foreach`遍历的时候不能取到，`for-in能取到，`for-of`不能取到。

```javascript
arr[1]==arr['1']
arr[1.000]==arr[1] //true
```

如果方括号里面的内容是恰好等于整数的浮点数，则会转成整数当成索引，而不是转成字符串当属性名

> 既然数组是对象，那么它们可以从原型中继承元素。在EcmaScript 5中，数组可以定义元素的getter和setter方法。如果一个数组确实继承了元素或使用了元素的getter和setter方法，你应该期望它使用非优化的代码路径。

# 数组创建

## 字面量法

```javascript
var arr=[]
var arr1=[1,2,3]
var arr2=[,,]
```

第三行的写法在一般浏览器会生成有两个`undefined`元素的数组。最后一个`,`会被忽略，而在`ie8`及以下是三个。**所以字面量法创建的话最后不要逗号结尾！**

## 构造函数法

```javascript
var arr=new Array() 
var arr1=new Array(5) //(5) [undefined × 5]
var arr2=new Array("1",2,3)
```

构造函数接收的参数如果是单一整型，就是生成长度为参数的空素组，每个元素为`undefined`。



# 数组的属性

最关键的属性就是`lenght`长度了。

> 每个数组都有一个length属性，就是这个属性使其区别于常规的JavaScript对象。
>
> 数组的length属性很有特点——它不是只读的。
>
> 如果为一个数组元素赋值，它的索引i大于或等于现有素组的长度时，length属性得值将设置为i+1
>
> 如果设置length属性为一个小于当前长度的非负整数n时，当前数组中那些索引值大于或等于n的元素将从中删除。
>
> 还可以将数组的length属性值设置为大于其当前的长度。实际上这不会向数组中添加新的元素，它只是在数组尾部创建一个空的区域。

```javascript
var arr=[1,2,3,4]
arr[7]=7;
arr.length //8
arr.length=3
arr //(3) [1, 2, 3]
arr.length=8
arr //(8) [1, 2, 3, undefined × 5]
```

> 在ECMAScript 5中，可以用Object.defineProperty()让数组的length属性变成只读的。
>
> 如果让一个数组元素不能配置，就不能删除它。如果不能删除它就，length就不能设置为小于不可配置元素的索引值

JavaScript的数组元素可以是不连续的，稀疏的。前面的理论知识可得知，如果存在不连续部分，不连续的元素会被赋undefined，那有了undefined何来不连续的说法呢？我的理解就是不连续指的是索引不连续。

我们通过`in`和`Object.keys`来看看

```javascript
var arr=[,,3]
arr //[undefined × 2, 3]
Object.keys(arr) //["2"]
0 in arr //false
1 in arr //false
2 in arr //true
```



# 数组方法

## 不改变原数组的

### concat

创建并返回一个新数组，如果参数是数组，会把数组分解成元素。但多维数组只进行一次扁平化。

```javascript
var a=[1,2,3]
arr1=a.concat(4,5) // [1, 2, 3, 4, 5]
arr2=a.concat([4,5])//[1, 2, 3, 4, 5]
arr3=a.concat([4,5],[6,7])]//[1, 2, 3, 4, 5, 6, 7]
arr4=a.concat(4,[5,[6,7]])//[1, 2, 3, 4, 5, [6,7]]
```

EcmaScript 3定义

***

### includes

确定数组是否包含某个元素，根据需要返回true或false。

除接收`search element`外还接收一个从数组某个位置开始检索的`from index`

如果`from index`大于等于数组长度，直接返回`false`而不会检索数组

如果是负数，会检索整个数组。

```javascript
var arr=[1,2,3]
result1=arr.includes(2) //true
result2=arr.includes(2,3) //false
```

EcmaScript 2016定义

***

### indexOf

使用严格等式（与===或三等于运算符使用的相同方法）将搜索元素与数组的元素进行比较。

同样接收`search element`跟`from index`两个参数

如能搜索返回对应元素索引，不存在则返回-1

返回的是第一次出现的索引

```javascript
var array = [2, 9, 9];
array.indexOf(2);     // 0
array.indexOf(7);     // -1
```

EcmaScript 5定义

***

### join

将数组中所有元素都转化为字符串拼接在一起，返回最后生成的字符串。可以指定一个可选的字符串在生成的字符串中来分隔数组的各个元素。如果不指定分隔符，默认使用逗号。

```javascript
var a=[1,2,3]
a.join() //"1,2,3"
a.join(" ")//"1 2 3"
var a2=new Array(5)
a2.join("-") //----

```

EcmaScript 3定义

***

### lastIndexOf

类似indexOf，只是返回的是最后一次出现，不存在也是返回-1

```javascript
var numbers = [2, 5, 9, 2];
numbers.lastIndexOf(2); // 3
numbers.lastIndexOf(7); // -1
```

***

### slice

返回数组的一个片段。

如果接收的是两个整数参数，则返回的数组包含了一个参数指定的位置和所有到但不包含第二个参数指定的位置间的所有数组元素，`array.slice(n,m)`则是取`[n,m)`

```javascript
var arr = ['1', '2', '3', '4', '5'];
var arr2 = arr1.slice(1, 3);//['2,3']
```

如果是一个参数，那就是从这个参数到数组结束

```javascript
var arr = ['1', '2', '3', '4', '5'];
var arr2 = arr1.slice(1);//['2,3,4,5']
```

如果参数时负数，那么是从最后一项倒数回来，-1就是最后一项，-2就是倒数第二项

```javascript
var arr=[1,2,3,4,5]
var arr2=arr.slice(2,-1)//[3,4]
```

如果没有参数，这是对整个数组做操作，看似类似复制，打我觉得应该不能说是复制

```javascript
var arr=[1,2,3,4]
arr.slice() //1,2,3,4
var obj={n:1}
var arr2=[obj,2,3]
arr3=arr2.slice()
obj.n=2
arr3[0] //{n:2}
```

也就是只能说会引用了那一段的数组

EcamScript 3定义

***

### toString

将数组元素变成字符串，类似`join(',')`

```javascript
var arr=[1,2,3]
arr.toString() //"1,2,3"
```

***

## 改变原数组的方法

### copyWithin

将数组的一部分浅复制到同一个数组中的另一个位置，并返回它，而不修改它的大小

接收三个参数，第一个参数是目标位置`target`，就是复制的数组从哪开始放，第二个参数是`start`，复制目标的开始(包括)，第三个参数是`end`，复制目标的结束(不包括)

如果`start`和`end`都为空，则是复制一整个数组。

如果要要插入的长度已经大于现有长度，则超出部分忽略。

```javascript
[1, 2, 3, 4, 5].copyWithin(0, 3, 4); // [4, 2, 3, 4, 5]
[1, 2, 3, 4, 5].copyWithin(3, 2, 4); // [4, 2, 3, 4, 5]
```

个人感觉这个方法可能对于`ArrayBuffer`会更有用点

ECMAScript 2015

***

### 

# 常见问题


