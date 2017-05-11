var setSong = function(songNumber) {
  currentlyPlayingSongNumber = parseInt(songNumber);
      currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
}; 

var getSongNumberCell = function(number) {
    return $('.song-item-number[data-song-number="' + number + '"]');
};


var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     //return template;
     //return $(template);
     var $row = $(template);
     
     var clickHandler = function() {
        var songNumber = parseInt($(this).attr('data-song-number'));

	    if (currentlyPlayingSongNumber !== null) {
		// Revert to song number for currently playing song because user started playing new song.
		  var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
		  currentlyPlayingCell.html(currentlyPlayingSongNumber);
	   }  
	   if (currentlyPlayingSongNumber !== songNumber) {
		  // Switch from Play -> Pause button to indicate new song is playing.
		  $(this).html(pauseButtonTemplate);
		  currentlyPlayingSongNumber = parseInt(songNumber);
          currentSongFromAlbum = currentAlbum.songs[parseInt(songNumber) - 1];
           updatePlayerBarSong();
	   } else if (currentlyPlayingSongNumber === songNumber) {
		  // Switch from Pause -> Play button to pause currently playing song.
           $(this).html(playButtonTemplate);
           $('.main-controls .play-pause').html(playerBarPlayButton);
           currentlyPlayingSongNumber = null;
           currentSongFromAlbum = null;
	   }
     };
     
     var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        }
    };

    var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(songNumber);
        }
        console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
    };
     
     $row.find('.song-item-number').click(clickHandler);
     $row.hover(onHover, offHover);
     return $row;
 };

// select elements that we want to populate with text dynamically
//var albumTitle = document.getElementsByClassName('album-view-title')[0];
//var albumArtist = document.getElementsByClassName('album-view-artist')[0];
//var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
//var albumImage = document.getElementsByClassName('album-cover-art')[0];
//var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

var $albumTitle = $('.album-view-title');
var $albumArtist = $('.album-view-artist');
var $albumReleaseInfo = $('.album-view-release-info');
var $albumImage = $('.album-cover-art');
var $albumSongList = $('.album-view-song-list');


 var setCurrentAlbum = function(album) {
     currentAlbum = album;
     
     
 
     // assign values to each part of the album (text, images)
//     albumTitle.firstChild.nodeValue = album.title;
//     albumArtist.firstChild.nodeValue = album.artist;
//     albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
//     albumImage.setAttribute('src', album.albumArtUrl);
     
     $albumTitle.text(album.title);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);
 
     // clear contents of album song list container
     //albumSongList.innerHTML = '';
     $albumSongList.empty();
 
     // build list of songs from album Javascript object
     for (var i = 0; i < album.songs.length; i++) {
         //albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);

     }
 };

var trackIndex = function(album, song) {
     return album.songs.indexOf(song);
 };

var updatePlayerBarSong = function() {

    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);

};

//var findParentByClassName = function(element, targetClass) {
//    if (element) {
//        if (element.parentElement === null){
//            alert("No parent found");
//        } else {
//            var currentParent = element.parentElement;
//            while (currentParent.className !== targetClass && currentParent.className !== null) {
//            currentParent = currentParent.parentElement;
//            }   
//                if (currentParent.className === null) {
//                    alert("No parent found with that class name");
//                } else {
//                    return currentParent;
//                    }
//        }  
//    }
//};
//
//var getSongItem = function(element) {
//    switch (element.className) {
//        case 'album-song-button':
//        case 'ion-play':
//        case 'ion-pause':
//            return findParentByClassName(element, 'song-item-number');
//        case 'album-view-song-item':
//            return element.querySelector('.song-item-number');
//        case 'song-item-title':
//        case 'song-item-duration':
//            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
//        case 'song-item-number':
//            return element;
//        default:
//            return;
//    }  
//};
//
//var clickHandler = function(targetElement) {
//    var songItem = getSongItem(targetElement);
//    
//    if (currentlyPlayingSong === null) {
//         songItem.innerHTML = pauseButtonTemplate;
//         currentlyPlayingSong = songItem.getAttribute('data-song-number');
//     } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
//         songItem.innerHTML = playButtonTemplate;
//         currentlyPlayingSong = null;
//     } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
//         var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
//         currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
//         songItem.innerHTML = pauseButtonTemplate;
//         currentlyPlayingSong = songItem.getAttribute('data-song-number');
//     }
//};

//elements we'll be adding listeners to
//var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
//var songRows = document.getElementsByClassName('album-view-song-item');

// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

//store state of playing songs

var currentAlbum = null;
var currentlyPlayingSongNumber = null;
 var currentSongFromAlbum = null;

var nextSong = function() {
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _incrementing_ the song here
    currentSongIndex++;

    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }

    // Save the last song number before changing it
    var lastSongNumber = currentlyPlayingSongNumber;

    // Set a new current song
    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    // Update the Player Bar information
    updatePlayerBarSong();

    var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

var previousSong = function() {
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _decrementing_ the index here
    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }

    // Save the last song number before changing it
    var lastSongNumber = currentlyPlayingSongNumber;

    // Set a new current song
    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    // Update the Player Bar information
    updatePlayerBarSong();

    $('.main-controls .play-pause').html(playerBarPauseButton);

    var $previousSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

var $previousButton = $('.main-controls .previous');
 var $nextButton = $('.main-controls .next');
 
// window.onload = function() {
$(document).ready(function() {    
     
     setCurrentAlbum(albumFloyd);
    
    $previousButton.click(previousSong);
     $nextButton.click(nextSong);
    
//    for (var i = 0; i < songRows.length; i++) {
//        songRows[i].addEventListener('click', function(event) {
//            clickHandler(event.target);
//        });
//    }
     
//     songListContainer.addEventListener('mouseover', function(event) {
//         //console.log(event.target);
//         // Only target individual song rows during event delegation
//         if (event.target.parentElement.className === 'album-view-song-item') {
//             // Change the content from the number to the play button's HTML
//             var songItem = getSongItem(event.target);
//
//             if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
//                songItem.innerHTML = playButtonTemplate;
//             }
//         }
//     });
//     
//     for (var i = 0; i < songRows.length; i++) {
//         songRows[i].addEventListener('mouseleave', function(event) {
//              // #1
//             var songItem = getSongItem(event.target);
//             var songItemNumber = songItem.getAttribute('data-song-number');
// 
//             // #2
//             if (songItemNumber !== currentlyPlayingSong) {
//                 songItem.innerHTML = songItemNumber;
//             } 
//         });
//         
//         songRows[i].addEventListener('click', function(event) {
//             // Event handler call
//             clickHandler(event.target);
//         });
//     }
//     
//     var albums = [albumPicasso, albumMarconi, albumFloyd];
//     var index = 0;
//     
//     albumImage.addEventListener("click", function(event){
//         setCurrentAlbum(albums[index]);
//         index++;
//         if (index == albums.length){
//             index = 0;
//         }
//     });
 });