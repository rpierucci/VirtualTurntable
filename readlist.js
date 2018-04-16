var trackList =  {};
var listLength = 0;

//reads directories
document.getElementById("tracklist").addEventListener("change", function(event) {
  let output = document.getElementById("listing");
  let files = event.target.files;
  for (let i=0; i<files.length; i++) {
    let item = document.createElement("li");
    trackList[i] = files[i];
    listLength++;
    item.innerHTML = files[i].webkitRelativePath;
    output.appendChild(item);
  };
  tagTracks(trackList);
}, false);
