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
 
     return template;
 };

// select elements that we want to populate with text dynamically
var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

 var setCurrentAlbum = function(album) {
     
 
     // assign values to each part of the album (text, images)
     albumTitle.firstChild.nodeValue = album.title;
     albumArtist.firstChild.nodeValue = album.artist;
     albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
     albumImage.setAttribute('src', album.albumArtUrl);
 
     // clear contents of album song list container
     albumSongList.innerHTML = '';
 
     // build list of songs from album Javascript object
     for (var i = 0; i < album.songs.length; i++) {
         albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
     }
 };

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

//Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
 
 window.onload = function() {
     setCurrentAlbum(albumFloyd);
     
     songListContainer.addEventListener('mouseover', function(event){
         //console.log(event.target);
         
         //only target individual song rows during event delegation
         if (event.target.parentElement.className === 'album-view-song-item'){
             // Change the content from the number to the play button's HTML
             event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
         }
     })
     
     for (var i = 0; i < songRows.length; i++){
         songRows[i].addEventListener('mouseleave', function(event){
             //revert the content back to the number
             this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');
         })
     }
     
     var albums = [albumPicasso, albumMarconi, albumFloyd];
     var index = 0;
     
     albumImage.addEventListener("click", function(event){
         setCurrentAlbum(albums[index]);
         index++;
         if (index == albums.length){
             index = 0;
         }
     });
 };