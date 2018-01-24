
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve('This is my data')
    // resolve({
    //   name: 'Ali',
    //   age: 34
    // })
    reject('Something went wrong')
  }, 5000)
})
console.log('before')

promise.then((data) => {
  console.log('1', data)
}).catch((error) => {
  console.log('error', error)
})

console.log('after')
