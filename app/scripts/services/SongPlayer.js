(function() {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};

        var currentAlbum = Fixtures.getAlbum();

        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
/**
* @desc Active song object from list of songs
* @type {Object}
*/
        SongPlayer.currentSong = null;
        /**
 * @desc Buzz object audio file
 * @type {Object}
 */
        var currentBuzzObject = null;
        /**
 * @function setSong
 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
 * @param {Object} song
 */
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentSong = song;
        };

        /**
* @function playSong
* @desc Plays currentBuzzObject and sets property of the song object to true
* @param {Object} song
*/
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        }

        /**
* @function SongPlayer.play
* @desc Plays currentBuzzObject if currentBuzzObject is not the same as song object. Also plays currentBuzzObject if currentBuzzObject is the same as song object and currentBuzzObject is paused, and sets property of the song object to true
* @param {Object} song
*/       
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (currentSong !== song) {
                setSong(song);
                currentBuzzObject.play();  
            } else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    currentBuzzObject.play();
                    song.playing = true;
                }
            }  
        };

        /**
* @function SongPlayer.pause
* @desc pauses currentBuzzObject and sets property of the song Object to false
* @param {Object} song
*/
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
 SongPlayer.previous = function() {
     var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     currentSongIndex--;
     
     if (currentSongIndex < 0) {
         currentBuzzObject.stop();
         SongPlayer.currentSong.playing = null;
     } else {
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
     }
 };
        return SongPlayer;
    

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();