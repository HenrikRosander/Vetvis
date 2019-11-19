"use strict";

let points = [];

function addPoints(x,y,c){

points.push([x, y, c]);
triggerTransferFunctionUpdate();

}
function updateTransferFunction(gl, transferFunction) {
//börja med en points där 3 punkter(eller en och sätta resten manuellt) där kantpunkterna är svarta och förskjutna en bit åt sidorna.
  const size = 256;
  let data = new Uint8Array(size * 4);
  let draw_data = [[],[],[],[]];


let damping = parseInt(document.getElementById("mod_damping").value);

// points = [];
// //a spike is made of 3 points next to eachother where the outer are black and the middle is set by user.
//   points.push([parseInt(document.getElementById("mod_x1").value)-damping, 0, [0, 0, 0]]);
//   points.push([parseInt(document.getElementById("mod_x1").value), parseInt(document.getElementById("mod_y1").value), [0, 255, 0]]);
//   points.push([parseInt(document.getElementById("mod_x1").value)+damping, 0, [0, 0, 0]]);
//
//   points.push([parseInt(document.getElementById("mod_x2").value)-damping, 0, [0, 0, 0]]);
//   points.push([parseInt(document.getElementById("mod_x2").value), parseInt(document.getElementById("mod_y2").value), [255, 0, 0]]);
//   points.push([parseInt(document.getElementById("mod_x2").value)+damping, 0, [0, 0, 0]]);
//
//   points.push([parseInt(document.getElementById("mod_x3").value)-damping, 0, [0, 0, 0]]);
//   points.push([parseInt(document.getElementById("mod_x3").value), parseInt(document.getElementById("mod_y3").value), [0, 0, 255]]);
//   points.push([parseInt(document.getElementById("mod_x3").value)+damping, 0, [0, 0, 0]]);
//
//   points.push([parseInt(document.getElementById("mod_x4").value)-damping, 0, [0, 0, 0]]);
//   points.push([parseInt(document.getElementById("mod_x4").value), parseInt(document.getElementById("mod_y4").value), [50, 255, 255]]);
//   points.push([parseInt(document.getElementById("mod_x4").value)+damping, 0, [0, 0, 0]]);



  for (let i = 0; i < size * 4; i += 4) {
      data[i] = 0;
      data[i + 1] = 0;
      data[i + 2] = 0;
      data[i + 3] = 0;
  }


    points = points.sort(function(a,b){
      return (a[0] > b[0] ? 1 : -1);
    });

    console.log("l " +points.length);

  for (let i = 0; i < points.length-1; i++) {
    // get the current and next values
    let start = points[i][0]; //x-start
    let end = points[i+1][0]; //x-end (next points x-value)
    let step = (end - start); //the distance between, so that we know how many

    let i1 = points[i][2][0];
    let i2 = points[i][2][1];
    let i3 = points[i][2][2];
    let a = points[i][1];

    let i11 = points[i+1][2][0];
    let i22 = points[i+1][2][1];
    let i33 = points[i+1][2][2];
    let aa = points[i+1][1];

//interpolate between points and get the colors/alphas
    for (let i = start; i <= end; i++) {
      let t = (i - start) / step

      let k = 4 * i;
      data[k] = (1-t) * i1 + (i11 * t);
      data[k+1] =(1-t) * i2 + (i22 * t);
      data[k+2] =(1-t) * i3 + (i33 * t);
      data[k+3] =(1-t) * a + (aa * t);
    }

  //   let kk = 0;
  //   for (let k = start*4; k <= end*4; k += 4) {
  //     k/4
  //
  //     data[k] = points[i][2][0] - i1 * kk + (i11 * kk);
  //     data[k+1] = points[i][2][1] - i2 * kk + (i22 * kk);
  //     data[k+2] = points[i][2][2] - i3 * kk + (i33 * kk);
  //     data[k+3] = points[i][1] - a * kk + (aa * kk);
  //     kk++;
  // }

}


//graph
  let j = 0;
  for (let i = 0; i < size * 4; i += 4) {
    draw_data[0][j] = data[i];
    draw_data[1][j] = data[i + 1];
    draw_data[2][j] = data[i + 2];
    draw_data[3][j] = data[i + 3];
    j++;
}
//TODO: send color to graph and fill the corresponding spike.
    drawGraph(draw_data, points);


  console.log(117, "Updating the transfer function texture");
  gl.bindTexture(gl.TEXTURE_2D, transferFunction);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, size, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
}
