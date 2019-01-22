//function to return 'true' if two rectangles intersect
function intersectRect(r1, r2) {
    return !(r2.left >= r1.right || 
             r2.right <= r1.left || 
             r2.top >= r1.down ||
             r2.down <= r1.top);
  }

//copy an array
function copyArray(matrix) {
    return matrix.map(row => row.slice());
  }