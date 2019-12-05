"use strict";

let clicks = 0;
let points = [];
let xstep = 256*4/600.0;
let ystep = 255.0/400.0;

let r = 0;
let g = 0;
let b = 0;

let input, button, greeting;


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

  let alpha = 0;

  for(let j = 0; j < points.length-1; j++)
  {
    let yval = Math.abs(400-points[j][1]); // Få rätt värde på y eftersom det börjar på 400 i origo
    let yval_next = Math.abs(400-points[j+1][1]);
    let xval = points[j][0];
    let xval_next = points[j+1][0];
    let k = yval; // Lutning av y
    let inc = Math.abs(yval-yval_next)/Math.floor(255/600*(xval_next-xval)); // hur mycket y ska incrementeras (beror på lutningen)
    let pos = 0;

    for (let i = Math.floor(xval*xstep); i < Math.floor(xval_next*xstep); i += 4)
    {
      if(i % 4 == 0){pos = 0;}
      if(i % 4 == 1){pos = 3;}
      if(i % 4 == 2){pos = 2;}
      if(i % 4 == 3){pos = 1;}

      data[pos + i] = r*i/77; // R
      data[pos + i + 1] = g*i/77; // G
      data[pos + i + 2] = b*i/77; // B

      console.log(r*i/77, g*i/77, b*i/77);

      if(yval < yval_next) // Om nästa punkt har högre yvärde
      {
        data[pos + i + 3] = k * ystep; // Alpha
        k += inc;
      }
      else if(yval > yval_next) // Om nästa punkt har lägre
      {
        data[pos + i + 3] = k * ystep;
        k -= inc;
      }
      else // Om de har samma y-värde
      {
        data[pos + i + 3] = k * ystep;
      }
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


//===================Create the input/button canvas=========================
// create canvas
createCanvas(400, 400);

input = createInput();
input.position(800, 450);

button = createButton('submit');
button.position(input.x + input.width, 450);
button.mousePressed(greet);

//greeting = createElement('h2', 'what is your name?');
//greeting.position(600, 440);

//textAlign(CENTER);
//textSize(50);
}

function greet() {

  r = input.value().slice(0,2);
  g = input.value().slice(4,6);
  b = input.value().slice(8,10);

  triggerTransferFunctionUpdate();
  console.log(r);

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
function updateline(x_Chord,y_Chord,c){
        //y_Chord = y_Chord+400;
        if(mouseX > 0.0 && mouseX < 600.0 && mouseY > 0.0 && mouseY < 400.0)
        {
          points.push([x_Chord, y_Chord,c]);
          points = points.sort(function(a,b){ //sort the points
          return(a[0] > b[0] ? 1:-1);
          });

          if (clicks == 0){
            stroke(255,0,0);
            noSmooth();
            strokeWeight(6);
            line(points[0][0],400,points[0][0],points[0][1]);
            line(points[0][0],points[0][1],points[0][0],400);
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
            line(points[0][0],400,points[0][0],points[0][1]);
            for (let i = 0; i < points.length-1; i++) {
              line(points[i][0], points[i][1], points[i+1][0],points[i+1][1]);
            }
            line(points[points.length-1][0],points[points.length-1][1], points[points.length-1][0],400);

              // div2 = createDiv(line(0,0,dummy[0],dummy[1]), line(dummy[0],dummy[1], dummy[2],dummy[3]),line(dummy[2],dummy[3], dummy[4],dummy[5]),line( dummy[4],dummy[5], 600,0));
              // div2.remove();
            }
            stroke(0,255,0);
            noSmooth();
            strokeWeight(6);
          }
}
