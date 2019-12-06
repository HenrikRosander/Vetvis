"use strict";

let clicks = 0;
let points = [];
let xstep = 256*4/600.0;
let ystep = 255.0/400.0;

let r = 0;
let g = 0;
let b = 0;

let input, button, greeting, reset, start_point;
let data = new Uint8Array(256 * 4);
let currentColor = [0,0,0];

function updateTransferFunction(gl, transferFunction) {

if(start_point.value() <= points.length)
{
  for(let j = 1; j < points.length; j++)
  {
    let yval = Math.abs(400-points[j-1][1]); // Få rätt värde på y eftersom det börjar på 400 i origo
    let yval_next = Math.abs(400-points[j][1]);
    let xval = points[j-1][0];
    let xval_next = points[j][0];
    let k = yval; // Lutning av y
    let inc = Math.abs(yval-yval_next)/Math.floor(255/600*(xval_next-xval)); // hur mycket y ska incrementeras (beror på lutningen)
    let pos = 0;

    // let x_start = Math.floor(xval*xstep);
    // let x_end = Math.floor(xval_next*xstep);
    //let last_point = Math.floor(points[points.length-1][0] * xstep);
    //
    // if(x_start % 4 == 0){pos = 0;} // För att kompensera på vart man börjar
    // if(x_start % 4 == 1){pos = 3;}
    // if(x_start % 4 == 2){pos = 2;}
    // if(x_start % 4 == 3){pos = 1;}


    let x_start = Math.floor(255*(points[j-1][0]/600))*4;
    let x_end = Math.floor(255*(points[j][0]/600))*4;
    currentColor = [r,g,b];

      let step =  (x_end-x_start)/4;
      let stepR = (points[j][2][0]-points[j-1][2][0])/step; // R
      let stepG = (points[j][2][1]-points[j-1][2][1])/step; // G
      let stepB = (points[j][2][2]-points[j-1][2][2])/step; // B
      let inc_color = 0;

    for(let i = x_start; i <= x_end; i += 4)
    {
          data[i] = points[j-1][2][0] + inc_color * stepR; // R
          data[i + 1] = points[j-1][2][1] + inc_color * stepG; // G
          data[i + 2] = points[j-1][2][2] + inc_color * stepB; // B

          inc_color++;

      if(yval < yval_next) // Om nästa punkt har högre yvärde
      {
        data[i + 3] = k * ystep; // Alpha
        k += inc;
      }
      else if(yval > yval_next)
      { // Om nästa punkt har lägre
        data[i + 3] = k * ystep;
        k -= inc;
      }
      else{
        data[i + 3] = k * ystep;
      } // Om de har samma y-värde
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
}

function createNewPoint(p)
{
  let newPoint = point(points[p][0], points[p][1]);
  stroke(r,g,b);
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


//===================Create the input/button =========================
input = createInput();
input.position(800, 450);

start_point = createInput();
start_point.position(800, 480);
start_point.size(25, 20);

button = createButton('submit');
button.position(input.x + input.width, 450);
button.mousePressed(colorChange);

//greeting = createElement('h2', 'what is your name?');
//greeting.position(600, 440);

//textAlign(CENTER);
//textSize(50);
}



function keyPressed(){
  if(keyCode === ENTER){colorChange();}
  if(keyCode === ESCAPE){resetCanvas();}
}

function resetCanvas(){
  points = [];
  clicks = 0;
  r = 0; g = 0; b = 0;
  clear();
  let cnv = createCanvas(600, 400);
  cnv.position(655, 15);
  background(153);
  stroke('black');
  strokeWeight(2);
  line(0, width, 0, 0);
  line(width, height, -width, height);
  data = new Uint8Array(256 * 4);
  triggerTransferFunctionUpdate();


}

//========================================On click function==============
function mouseClicked() {

if(mouseX <= 600 && mouseY <= 400)
{
  if(clicks == 0) // Sätta ut första punkten
  {
    updateline(mouseX,mouseY, [0,0,0]);
  }

  for( let i = 0; i < points.length; i++) //Kolla om punkten redan finns
  {
    if(points[i][0] == mouseX && points[i][1] == mouseY)
    {
      if(clicks != 0)
      {
        break; // Du klicka på samma punkt.
      }
    }
    if(i == points.length-1) //Om inte, lägg in punkten
    {
      updateline(mouseX,mouseY, [0,0,0]);
      triggerTransferFunctionUpdate();
      break;
    }
  }
  //mouseY = Math.abs(400-mouseY);
  clicks++;
}

}

function colorChange() {

  let color_ = input.value().split(" ");
  r = +color_[0];
  g = +color_[1];
  b = +color_[2];

  let i = start_point.value();

if(i < points.length)
{
  points[i][2][0] = r; // R
  points[i][2][1] = g; // G
  points[i][2][2] = b; // B
  createNewPoint(i);
}
  triggerTransferFunctionUpdate();
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
            stroke(0,0,0);
            noSmooth();
            strokeWeight(2);
            line(points[0][0],400,points[0][0],points[0][1]);
            line(points[0][0],points[0][1],points[0][0],400);
            stroke('white');
            strokeWeight(10);

            point(points[0][0],points[0][1]);
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
            stroke(0,0,0);
            noSmooth();
            strokeWeight(2);
            line(points[0][0],400,points[0][0],points[0][1]);

            for (let i = 0; i < points.length-1; i++) {
              stroke(0,0,0);
              noSmooth();
              strokeWeight(2);
              let k1 = line(points[i][0], points[i][1], points[i+1][0],points[i+1][1]);
              stroke('white');
              strokeWeight(10);
              let k2 = point(points[i][0], points[i][1]);

            }
            stroke(0,0,0);
            noSmooth();
            strokeWeight(2);
            line(points[points.length-1][0],points[points.length-1][1], points[points.length-1][0],400);
            stroke('white');
            strokeWeight(10);
            let k2 = point(points[points.length-1][0],points[points.length-1][1]);


              // div2 = createDiv(line(0,0,dummy[0],dummy[1]), line(dummy[0],dummy[1], dummy[2],dummy[3]),line(dummy[2],dummy[3], dummy[4],dummy[5]),line( dummy[4],dummy[5], 600,0));
              // div2.remove();
            }

          }
}
