var generate = function(numRows) {
    const pascalsArr = [];
    let rowCounter = 0;

    //i is the row you're on
    //rowCounter is the num of that row

    for (let i = 0; i <= numRows; i++) {
        let rowToPush = [];
        if (i === 0) rowToPush.push(1);
        //previous row's i and i - 1 added together
        while (rowCounter >= 0 && i > 0) {
            let previousRow = pascalsArr[i - 1];
            if (previousRow[rowCounter - 1] === undefined) {
                rowToPush.push(1);
            } else if (previousRow[rowCounter] === undefined) {
                rowToPush.push(1);
            } else {
                rowToPush.push(previousRow[rowCounter] + previousRow[rowCounter - 1])
            }

            rowCounter--;
        }

        pascalsArr.push(rowToPush);
        rowCounter = i + 1;
    }
    return pascalsArr;
};

console.log(generate(5));
// Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]