function fibonacci(num){
    let x = 0;
    let y = 1;
    let fibArray = [x, y];

    for(let i = 2; i <= num; i++){
        let z = x + y;
        fibArray.push(z);
        x = y;
        y = z;
    }
    return fibArray;
}