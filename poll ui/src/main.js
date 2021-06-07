function armstrongNumber(armstrong) {

    let numString = armstrong.toString();

    let total = 0;

    for(let index = 0; index < numString.length; index++)
    {   
        total += cubeValue(+numString[index]);
    }
    return total === armstrong;
}

const cubeValue = num => Math.pow(num, 3);

function matchingBrackets() {
    const closing_brackets = [")", "}", "]"];
    const opening_brackets = ["(", "{", "["];

    const test = ["[", "{", "}", "]"];

    const store = [];
    let track = false;
   
    for(let index = 0; index < test.length; index++) {

        if(opening_brackets.includes(test[index])) {
    
            store.push(test[index]);
            track = false;
        }
        else if (closing_brackets.includes(test[index])) {
    
            const elem = store.pop();
            const newBracketIndex = closing_brackets.indexOf(test[index]);
            
            if(opening_brackets.indexOf(elem) === newBracketIndex) {
                track = true;
            }
            else {
                track = false;
                break;
            }
        }
    }


    track ? console.log("The brackets are matching") : console.log("The brackets are not matching");
}


const decode = randomString => {

    let decodedString = "";
    for(let index = 0; index < randomString.length; index++) {

        let tempValue = +randomString.charCodeAt(index);
        decodedString += convertToChar((tempValue + 1));

    }
    return decodedString;
}

const convertToChar = value => String.fromCharCode(value);

const fixingKeyValuePairs = (object) => {

    let tempObj = {};

    const keys = Object.keys(object);
    const values = Object.values(object);


}

let obj = {name: 1, suname: "Mons"}

console.log(Object.keys(obj))
console.log(Object.values(obj))
