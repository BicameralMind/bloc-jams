 var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
 };

 var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
 };

 var albumFloyd = {
     title: 'The Dark Side of the Moon',
     artist: 'Pink Floyd',
     label: 'Harvest',
     year: '1973',
     albumArtUrl: 'assets/images/album_covers/darkside.jpeg',
     songs: [
         { title: 'Speak to Me', duration: '1:30' },
         { title: 'Breathe', duration: '2:43' },
         { title: 'On the Run', duration: '3:30'},
         { title: 'Time', duration: '6:53' },
         { title: 'The Great Gig in the Sky', duration: '4:15'}
     ]
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
        var songNumber = $(this).attr('data-song-number');

	    if (currentlyPlayingSong !== null) {
		// Revert to song number for currently playing song because user started playing new song.
		  var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
		  currentlyPlayingCell.html(currentlyPlayingSong);
	   }  
	   if (currentlyPlayingSong !== songNumber) {
		  // Switch from Play -> Pause button to indicate new song is playing.
		  $(this).html(pauseButtonTemplate);
		  currentlyPlayingSong = songNumber;
	   } else if (currentlyPlayingSong === songNumber) {
		  // Switch from Pause -> Play button to pause currently playing song.
           $(this).html(playButtonTemplate);
           currentlyPlayingSong = null;
	   }
     };
     
     var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(playButtonTemplate);
        }
    };

    var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(songNumber);
        }
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

//store state of playing songs
var currentlyPlayingSong = null;
 
// window.onload = function() {
$(document).ready(function() {    
     
     setCurrentAlbum(albumFloyd);
    
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