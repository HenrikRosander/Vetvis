"use strict";

let clicks = 0;
let points = [];

function updateTransferFunction(gl, transferFunction) {
  // Create a new array that holds the values for the transfer function.  The width of 256
  // is also hard-coded further down where the transferFunctionTexture OpenGL object is
  // created, so if you want to change it here, you have to change it there as well.  We
  // multiply the value by 4 as we have RGBA for each pixel.
  // Also we created the transfer function texture using the UNSIGNED_BYTE type, which
  // means that every value in the transfer function has to be between [0, 255]

  // This data should, at the end of your code, contain the information for the transfer
  // function.  Each value is stored sequentially (RGBA,RGBA,RGBA,...) for 256 values,
  // which get mapped to [0, 1] by OpenGL
  let data = new Uint8Array(256 * 4);
  ////////////////////////////////////////////////////////////////////////////////////////
  /// Beginning of the provided transfer function

  // The provided transfer function that you'll replace with your own solution is a
  // relatively simple ramp with the first 50 values being set to 0 to reduce the noise in
  // the image.  The remainder of the ramp is just using different angles for the color
  // components

  for (let i = 1*4+50; i < 256 * 4; i += 4) {
    data[i] = 0;
    data[i + 1] = 0;
    data[i + 2] = 0;
    data[i + 3] = 0;
  }


  if(points.length > 2)
  {
    console.log(points.length);
    //console.log(points[1],points[2]);
    console.log(Math.floor(points[1][0]*1024.0/600.0), Math.floor(points[2][0]*1024.0/600.0));

    for (let i = Math.floor(points[1][0]*1024.0/600.0); i < Math.floor(points[2][0]*1024.0/600.0); i += Math.floor(1024.0/600.0)) {

      console.log(i);

      data[i] = i/4;
      data[i + 1] = i/4;
      data[i + 2] = i/4;
      data[i + 3] = 155;
    }
  }




  /// End of the provided transfer function
  ////////////////////////////////////////////////////////////////////////////////////////

  // @TODO:  Replace the transfer function specification above with your own transfer
  //         function editor result

  // Upload the new data to the texture
  console.log(117, "Updating the transfer function texture");
  gl.bindTexture(gl.TEXTURE_2D, transferFunction);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 256, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
}


//==========================Create the canvas========================
function setup() {
  //Canvas for transferFunction

  let cnv = createCanvas(600, 400);
  cnv.position(655, 15);
  background(153);
  stroke('black');
  strokeWeight(2);
  line(0, width, 0, 0);
  line(width, height, -width, height);

}

//========================================On click function==============
function mouseClicked() {

  if(clicks == 0) // Sätta ut första punkten
  {
    updateline(mouseX,mouseY);
  }

  for( let i = 0; i < points.length; i++) //Kolla om punkten redan finns
  {
    if(points[i][0] == mouseX && points[i][1] == mouseY)
    {
      if(clicks != 0)
      {
        console.log("Du clicka på samma punkt!");
        //Göra något eftersom vi klickat på samma punkt
        break;
      }
    }
    if(i == points.length-1) //Om inte, lägg in punkten
    {
      updateline(mouseX,mouseY);
      triggerTransferFunctionUpdate();
      break;
    }
  }
  //mouseY = Math.abs(400-mouseY);
  clicks++;
}

function mouseDragged() {

}

//========================================updateline ==============
function updateline(x_Chord,y_Chord){
        //y_Chord = y_Chord+400;
        if(mouseX > 0.0 && mouseX < 600.0 && mouseY > 0.0 && mouseY < 400.0)
        {
          points.push([x_Chord, y_Chord]);
          points = points.sort(function(a,b){ //sort the points
          return(a[0] > b[0] ? 1:-1);
          });

          if (clicks == 0){
            stroke(255,0,0);
            noSmooth();
            strokeWeight(6);
            line(0,400,points[0][0],points[0][1]);
            line(points[0][0],points[0][1],600,400);
          }
          if (clicks  >= 1) { //clears the canvas
            clear();
            let cnv = createCanvas(600, 400);
            cnv.position(655, 15);
            background(153);
            stroke('black');
            strokeWeight(2);
            line(0, width, 0, 0);
            line(width, height, -width, height);
            stroke(255,0,0);
            noSmooth();
            strokeWeight(6);
            line(0,400,points[0][0],points[0][1]);
            for (let i = 0; i < points.length-1; i++) {
              line(points[i][0], points[i][1], points[i+1][0],points[i+1][1]);
            }
            line(points[points.length-1][0],points[points.length-1][1], 600,400);

              // div2 = createDiv(line(0,0,dummy[0],dummy[1]), line(dummy[0],dummy[1], dummy[2],dummy[3]),line(dummy[2],dummy[3], dummy[4],dummy[5]),line( dummy[4],dummy[5], 600,0));
              // div2.remove();
            }
            stroke(0,255,0);
            noSmooth();
            strokeWeight(6);
          }
}
