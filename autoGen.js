let name = []
function generateName(inputName) {
    for (let i = 0; i <= 20; i++) {
        name.push(inputName + i);
        //console.log(name);
    }
    console.log(name);
    //return(name);
}
generateName("Kristoffer Rygaard ");

let price = [];
function generatePrice(inputPrice1, inputPrice2 ) {
    min = Math.ceil(inputPrice1);
    max = Math.floor(inputPrice2);
    return Math.floor(Math.random() * (max - min) - min);
}
generatePrice(100000, 1000000)

function lazyPrice(laziTime, inputPrice1, inputPrice2) {
	for (let i = 1; i < laziTime; i++) {
		generatePrice(inputPrice1, inputPrice2)
		price.push()
	}
}
lazyPrice(6, 100000, 1000000);