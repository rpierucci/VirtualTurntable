//variables
var track = [], artist = [], title = [], album = [], year = [], tracknum = [], art = [];
var artStatus = 0;
var savedStatus;


//Plays audio from currenttracks list, update art and now playing
function playTrack(src, num) {
	var audio = document.getElementById("myAudio");
	var source = document.getElementById("mp3Source");
	var imgtag = art[num];
	if (artStatus == 0) {
		if (imgtag) {
			var base64String = "";
			for (var i = 0; i < imgtag.data.length; i++) {
				base64String += String.fromCharCode(imgtag.data[i]);
			}
			var base64 = "data:" + imgtag.format + ";base64," +
			window.btoa(base64String);
			document.getElementById('albumArt').setAttribute('src',base64);
		} else {
			document.getElementById('albumArt').style.display = "none";
		}
	} else if (artStatus == 1) {
		albumArt.src = savedStatus;
		albumArt.className = "";
		artStatus = 0;
		if (imgtag) {
			var base64String = "";
			for (var i = 0; i < imgtag.data.length; i++) {
				base64String += String.fromCharCode(imgtag.data[i]);
			}
			var base64 = "data:" + imgtag.format + ";base64," +
			window.btoa(base64String);
			document.getElementById('albumArt').setAttribute('src',base64);
		} else {
			document.getElementById('albumArt').style.display = "none";
		}
	}
		
	source.src = src;
	audio.load();
	audio.play();
}

//Tags tracks
function tagTracks(list) {
	for(var i=0; i < listLength; i++) {
		loadFile(list[i], i);
	}
	setTimeout(function() {
	var htmltag = "<div class=\"container\"><table class=\"table table-hover table-sm\" style=\"border-spacing: 0px;\"><thead><tr><th width=\"50px\">Track</th><th width=\"250px\">Song Title</th><th width=\"201px\">Artist</th><th width=\"200px\">Album</th><th width=\"50px\">Year</th></tr></thead><tbody>";
	for (var i=0; i < listLength; i++) {
		htmltag += "<tr onclick=\"playTrack(trackList[" + i + "].webkitRelativePath, " + i + ");\"><td width =\"51px\">" + track[i] + "</td><td width=\"251px\">" + title[i] + "</td><td width=\"201px\">" + artist[i] + "</td><td width=\"201px\">" + album[i] + "</td><td width=\"51px\">" + year[i] + "</td></tr>";
	}
	htmltag += "</tbody></table></div>";
	document.getElementById("currenttracks").innerHTML = htmltag;
}, 2000);
}

//Clear Tracklist
function clearTracks(list) {
	location.reload();
}

function bgcolor(num) {
	var player = document.getElementById("playerbody");
	if (num == 1) {
		player.style.background = "linear-gradient(#AFACAC,#636363,#767676)";
	} else if (num == 2) {
		player.style.background = "linear-gradient(#0D98D8,#75B6D5,#005555)";
	} else if (num == 3) {
		player.style.background = "linear-gradient(#182a74,#7687df,#b36501,#b36501)";
	} else if (num == 4) {
		player.style.background = "linear-gradient(orange, green)";
	} else if (num == 5) {
		player.style.background = "linear-gradient(red, lightgray)";
	} else if (num == 6) {
		player.style.background = "linear-gradient(yellow, indigo)";
	} else if (num == 7) {
		player.style.background = "linear-gradient(#4072ef,#265ae0)";
	} else if (num == 8) {
		player.style.background = "linear-gradient(#bf42f4,#a82cdd,#a36dba)";
	}
}

//Swap to CD/Vinyl Image
function mediaSwitch() {
	var art = document.getElementById("albumArt");
	if (artStatus == 0) {   // Album art is shown
		savedStatus = document.getElementById("albumArt").src;
		art.src = "img/front2.png";
		art.className = "media";
		artStatus = 1;
	} else if (artStatus == 1) {
		art.src = savedStatus;
		art.className = "";
		artStatus = 0;
	}
}
	
//Scripts for tagreader
function loadFile(input, num) {
    var file = input,
    url = file.urn || file.name;
    ID3.loadTags(url, function() {
		showTags(url, num);
    }, {
        tags: ["title","artist","album","picture","track","year"],
    dataReader: ID3.FileAPIReader(file)
    });
}

function showTags(url, num) {
    var tags = ID3.getAllTags(url);
    console.log(tags);
    artist[num] = tags.artist;
    album[num] = tags.album;
    track[num] = tags.track;
    title[num] = tags.title;
    year[num] = tags.year;
    art[num] = tags.picture;
    console.log(tags.picture);
    var image = tags.picture;
    if (image) {
        var base64String = "";
        for (var i = 0; i < image.data.length; i++) {
            base64String += String.fromCharCode(image.data[i]);
        }
        var base64 = "data:" + image.format + ";base64," +
        window.btoa(base64String);
        document.getElementById('picture').setAttribute('src',base64);
    } else {
        document.getElementById('picture').style.display = "none";
    }
}

$(document).ready(function(){
    $(".fadejq").hide(0).delay(500).fadeIn(3000)
});
