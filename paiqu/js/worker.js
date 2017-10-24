importScripts('libs/gif/LZWEncoder.js', 'libs/gif/NeuQuant.js', 'libs/gif/GIFEncoder.js'); /* imports three scripts */

self.onmessage = function(event) {
    //console.log("message!");
    //alert("message");
    //self.postMessage(event.data);
    //return;
    var frame_index,
        frame_length,
        height,
        width,
        delay,
        imageData; //get it from onmessage

    frame_index = event.data["frame_index"];
    frame_length = event.data["frame_length"];

    imageData = event.data["imageData"];
    delay = event.data["delay"];

    var encoder = new GIFEncoder(); //create a new GIFEncoder for every new job
    encoder.setRepeat(0); //0  -> loop forever
    //1+ -> loop n times then stop
    encoder.setQuality(1);
    encoder.setDelay(delay); //go to next frame every n milliseconds

    if (frame_index == 0) {

        encoder.start();
    } else {
        //alert();
        encoder.cont();
        encoder.setProperties(true, false); //started, firstFrame
    }

    encoder.addFrame(imageData, true);
    if (frame_length == frame_index) {
        encoder.finish();
    }
    self.postMessage({
        "frame_index": frame_index,
        "frame_data": encoder.stream().getData()
    }) //on the page, search for the GIF89a to see the frame_index
};