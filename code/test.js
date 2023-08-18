function countdown(num) {
    let evenarr = [];
    for(var i = num; i > 0; i=i-3){
    if(i==num) i=i-3;
    if(i%2==0 && !i==0){
    evenarr.push(i);
    }
    }
    if(evenarr.length < 1) return 'integer[0]'
    return evenarr.sort(function(a,b){return a-b})
  }
  console.log(countdown(50))