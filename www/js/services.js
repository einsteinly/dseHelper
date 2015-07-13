/**
* services Module
*
* Description
* All necessary functions and local storage needed for account information
*/
angular.module('services', ['dependencies','ngCordova']).

factory('$account', function($localStorage,$http,$core,$ionicPopup){

	var obj={};

	obj.storeCredentials = function(credentials){
		obj.user = credentials.user;
		$localStorage.setObject('credentials',credentials);
		$http.post($core.APILocation,{JSON:1,action:'user_profile'}).success(function(data){
			console.log('getting user_profile: response= '+data);
			$localStorage.setObject('user_profile',data);
		});
	};

	obj.signout = function(){
		obj.user = null;
		$localStorage.set('credentials',null);
		$localStorage.set('user_profile',null);
		obj.user_profile = $localStorage.getObject('user_profile');
		$http.post($core.APILocation,{JSON:1,action:'logout'});
	}

	obj.login = function(successCallback,errorCallback){
		if($localStorage.getObject('credentials')!==null)
		{
			var cred = $localStorage.getObject('credentials');
			$http.post($core.APILocation,{JSON:1,action:'login',user:cred.user,password:cred.password},{timeout: 5000}).error(function(){
				$ionicPopup.alert({
					title: 'Connection Error' ,
					template: 'An error has occurred when we are trying to connect to our servers. You can only use the off line features of this app.'
				});
				errorCallback();
			}).success(function(){successCallback();});
		}
	}

	obj.user_profile = $localStorage.getObject('user_profile');

	if($localStorage.getObject('credentials')!= null)
	{
	obj.user = $localStorage.getObject('credentials').user;
	}

	return obj;
})

.factory('$file',function( $timeout, $cordovaFileTransfer, $ionicLoading,$ionicPopup, $window, $ionicPlatform) {

	var obj = {};

	obj.initDownloadDirectory = function(){
		$ionicPlatform.ready(function() {
		window.requestFileSystem($window.LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
		    fileSystem.root.getDirectory(
		        "Downloads",
		        {
		            create: true
		        })
			});
		});//Platform.ready
    };

	obj.download = function(url,filename,$scope)
	{
		filename = filename.replace(/ /g,'_');
		$ionicLoading.show({
		template: '<i class="fa fa-spinner fa-pulse"></i> Downloading...<br> <p ng-if= "fileProgress != false"> {{fileProgress}} % Completed </p> <button class="button button-block button-light" ng-click="hide()">Hide</button> ',
		scope:$scope
		});
		window.requestFileSystem($window.LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
		    fileSystem.root.getDirectory(
		        "Downloads",
		        {
		            create: true
		        },
		        function(directoryEntry) {
		            directoryEntry.getFile(
		                filename, 
		                {
		                    create: true, 
		                    exclusive: false
		                }, 
		                function gotFileEntry(fileEntry) {
		                    var p = fileEntry.toURL();
		                    fileEntry.remove();
		                    fileTransfer = new FileTransfer();
		                    fileTransfer.download(
		                        encodeURI(url),
		                        p,
		                        function(entry) {
		                        	console.log('Downloaded file. Entry URL: '+entry.toURL());
		                            $ionicLoading.hide();
		                            $scope[filename] = entry.toURL();
		                        },
		                        function(error) {
		                            $ionicLoading.hide();
		                            $ionicPopup.alert({
		                            	title: 'Error',
		                            	template: "Download Error Source -> " + error.source
		                            });
		                        },
		                        false
		                    );
		                    fileTransfer.onprogress = function(progressEvent) {
		                    	console.log('fileTransfer progress: '+ angular.toJson(progressEvent) );
							    if (progressEvent.lengthComputable) {
							      $scope.fileProgress = Math.floor( 100 * (progressEvent.loaded / progressEvent.total) );
							      if (!$scope.$$phase) $scope.$apply();
							    }
							    else $scope.fileProgress=progressEvent.loaded;
							};
		                }, 
		                function() {
		                    $ionicLoading.hide();
		                    console.log("Get file failed");
		                }
		            );
		        }
		    );
		},
		function() {
		    $ionicLoading.hide();
		    console.log("Request for filesystem failed");
		});
	}

	return obj;
})

.factory('AudioSvc', [function() {
 
  var AudioSvc = {
    my_media: null,
    mediaTimer: null,
    playAudio: function(src, cb) {
      var self = this;
 
      // stop playing, if playing
      self.stopAudio();
 
      self.my_media = new Media(src, onSuccess, onError);
      self.my_media.play();
 
      if (self.mediaTimer == null) {
        self.mediaTimer = setInterval(function() {
          self.my_media.getCurrentPosition(
            function(position) {
              cb(position, self.my_media.getDuration());
            },
            function(e) {
              console.log("Error getting pos=" + e);
            }
          );
        }, 1000);
      }
 
      function onSuccess() {
        console.log("playAudio():Audio Success");
      }
 
      // onError Callback
      //
      function onError(error) {
        // alert('code: ' + error.code + '\n' +
        //     'message: ' + error.message + '\n');
 
        // we forcefully stop
 
      }
 
    },
 
    resumeAudio: function() {
      var self = this;
      if (self.my_media) {
        self.my_media.play();
      }
    },
    pauseAudio: function() {
      var self = this;
      if (self.my_media) {
        self.my_media.pause();
      }
    },
    stopAudio: function() {
      var self = this;
      if (self.my_media) {
        self.my_media.stop();
      }
      if (self.mediaTimer) {
        clearInterval(self.mediaTimer);
        self.mediaTimer = null;
      }
    }
 
  };
 
  return AudioSvc;
}])
;


