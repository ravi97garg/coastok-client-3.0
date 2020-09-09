URL = window.URL || window.webkitURL;

var gumStream; 						//stream from getUserMedia()
var rec; 							//Recorder.js object
var input; 							//MediaStreamAudioSourceNode we'll be recording

// shim for AudioContext when it's not avb.
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext //audio context to help us record

function startRecording() {

  /*
      Simple constraints object, for more advanced audio features see
      https://addpipe.com/blog/audio-constraints-getusermedia/
  */

  var constraints = { audio: true, video:false }

  /*
     Disable the record button until we get a success or fail from getUserMedia()
 */

  $("#recordButton").hide();
  $("#stopButton").show();
  $("#pauseButton").show();

  /*
      We're using the standard promise based getUserMedia()
      https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
  */

  navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {

    /*
        create an audio context after getUserMedia is called
        sampleRate might change after getUserMedia is called, like it does on macOS when recording through AirPods
        the sampleRate defaults to the one set in your OS for your playback device
    */
    audioContext = new AudioContext();

    //update the format
    // document.getElementById("formats").innerHTML="Format: 1 channel pcm @ "+audioContext.sampleRate/1000+"kHz"

    /*  assign to gumStream for later use  */
    gumStream = stream;

    /* use the stream */
    input = audioContext.createMediaStreamSource(stream);

    /*
        Create the Recorder object and configure to record mono sound (1 channel)
        Recording 2 channels  will double the file size
    */
    rec = new Recorder(input,{numChannels:1})

    //start the recording process
    rec.record()

  }).catch(function(err) {
    console.log(err);
  });
}


function pauseRecording(){
  if (rec.recording){
    //pause
    rec.stop();
    $("#pauseButton").text("Resume");
  }else{
    //resume
    rec.record()
    $("#pauseButton").text("Pause");

  }
}

function stopRecording(filename) {

  //disable the stop button, enable the record too allow for new recordings
  $("#recordButton").show();
  $("#stopButton").hide();
  $("#pauseButton").hide().text("Pause");

  //tell the recorder to stop the recording
  rec.stop();

  //stop microphone access
  gumStream.getAudioTracks()[0].stop();

  //create the wav blob and pass it on to createDownloadLink
  rec.exportWAV(function(blob) {
    createDownloadLink(blob, filename)
  });
}

function createDownloadLink(blob, filename) {

  var url = URL.createObjectURL(blob);
  var downloadLink;

  //name of .wav file to use during upload and download (without extendion)
  // var filename = new Date().toISOString();

  //add controls to the <audio> element
  var au = $('<audio/>')
    .attr("controls", "true")
    .attr("src", url);

  var div = $('<div/>')
    .append(au)
    .addClass("recording")

  var fd = new FormData();
  fd.append("file", blob, filename+".wav");
  // div.appendChild(document.createTextNode (" "))//add a space in between
  // div.appendChild(upload)//add the upload link to div
  div.append($('<button/>')
    .text("Upload")
    .addClass("btn btn-primary")
    .click(function (){
      var button = $(this);
      $.ajax({
        type: "POST",
        url: `http://3.6.160.77:8080/api/v1/upload`,
        cors: true ,
        contentType: false,
        processData: false,
        secure: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        beforeSend: function (xhr) {
          xhr.setRequestHeader ("access_token", localStorage.getItem('token'));
        },
        data: fd,
        success: function(response)
        {
          downloadLink = response.data.path;
          setTimeout(function (){
            this.ansFile = downloadLink
          });
          $(button).remove();
          $('#recordButton').hide();
          $('#pauseButton').hide();
          $('#stopButton').hide();
        },
        error: function (err) {
          alert(JSON.stringify(err));
        },
      });
    }))

  //add the div element to the ol
  // recordingWrapper.replaceWith(div);
  $('#recording-wrapper .recording').replaceWith(div);
  return downloadLink;
}