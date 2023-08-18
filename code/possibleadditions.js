function kSumSubset(numArray, k) {
    numArray = numArray.filter(value => 
    Number.isInteger(value)
    );
    if(numArray.length == 0){return false;}
    if(numArray.length == 1){if(numArray[0] === k){return false;}else{return false;}}
    if(numArray.length == 2){if(numArray[0] + numArray[1] === k) {return true;}else{return false;}}
    if(numArray.length == 3){if(numArray[0] + numArray[1] === k || numArray[0] + numArray[1] + numArray[2] === k || numArray[2] + numArray[1] === k || numArray[2] + numArray[0] === k){return true;}else{return false;}}
    for(let node1 = 0; node1 < numArray.length; node1++){
        for(let node2=node1+1; node2 < numArray.length; node2++){
            for(let node3=node2+1; node3 < numArray.length; node3++){
                if(numArray[node1] + numArray[node2] === k || numArray[node1] + numArray[node2] + numArray[node3] === k || numArray[node2] + numArray[node3] === k||numArray[node1] + numArray[node3] === k) return true;
            }
        }
    }
    return false;
}
console.log(kSumSubset([2,4,6,8],11));