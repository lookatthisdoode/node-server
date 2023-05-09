import fs from 'fs'

// READ ASYNC
// function question1For() {
// 	fs.readFile('./stairs.txt', (err, data) => {
// 		console.time('funchallenge1.for')
// 		if(err) {
// 			console.log('eeerrrrorr', err);
// 			return
// 		}

// 		let counter = 0
// 		for (var i = 0; i < data.toString().length; i++) {
// 			data.toString()[i] === '(' 
// 			? counter ++
// 			: counter --

// 			 counter == -1 ? console.log(i) : i
// 		}
// 		console.log(counter)
// 		console.timeEnd('funchallenge1.for')
// 	})
// }





function question1Reduce() {
	fs.readFile('./stairs.txt', (err, data) => {
		console.time('funchallenge1.reduce')
		const directions = data.toString();
		const directionsArray = directions.split('');
		const answer = directionsArray.reduce((acc, curVal) => {
			if (curVal === '(') {
				return acc += 1 
			} else if (curVal === ')') {
				return acc -= 1
			}
		}, 0)
		console.log('floor: ',answer)
		console.timeEnd('funchallenge1.reduce')
	})
}

function question2Some() {
	fs.readFile('./stairs.txt', (err, data) => {
		console.time('funchallenge2.some')
		const directions = data.toString();
		const directionsArray = directions.split('');
		let accumulator = 0
		let counter = 0
		const answer = directionsArray.some((curItem) => {
			if (curItem === '(') {
				accumulator += 1 
			} else if (curItem === ')') {
				accumulator -= 1
			}
			counter ++
			return accumulator < 0;
		})

		console.log('floor: ',counter)
		console.timeEnd('funchallenge2.some')
	})
}

//question1For()
// question1Reduce()
// question2Some()

// so for some reason for is slow hmmm

// READ SYNC
const file = fs.readFileSync('./hello.txt')
console.log('сынк', file.toString())


// APPEND
// fs.appendFile('./hello.txt', ' сига есть?!', err => {
// 	if(err){
// 		console.log(err, 'ошибка')
// 	}
// })


// WRITE
// fs.writeFile('bye.txt', 'Sad to see you go', err => {
// 	console.log(err)
// })

// DELETE
// fs.unlink('./bye.txt', err => {
// 	console.log(err)
// })