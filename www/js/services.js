/**
* services Module
*
* Description
* All necessary functions and local storage needed for account information
*/
angular.module('services', ['dependencies','ngCordova','ionic']).

factory('$account', function($localStorage,$http,$core,$ionicPopup, $ionicPlatform){

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
	$ionicPlatform.ready(function() 
	{
		$core.checkNetwork(function()
		{
			if($localStorage.getObject('credentials')!==null)
			{
				var cred = $localStorage.getObject('credentials');
				console.log(JSON.stringify(cred));
				$http.post($core.APILocation,{JSON:1,action:'login',user:cred.user,password:cred.password}).success(function(data){
					successCallback();
					if(data !=1){
					$ionicPopup.alert({
						title: '連接錯誤' ,
						template: '连接错误。您只能使用这个应用程序的离线功能。'
					});
					errorCallback();
					}
				})
			}
		});
	});
	};

	obj.user_profile = $localStorage.getObject('user_profile');

	if($localStorage.getObject('credentials')!= null)
	{
	obj.user = $localStorage.getObject('credentials').user;
	}

	return obj;
})

.factory('$file',function( $timeout, $cordovaFileTransfer, $ionicLoading,$ionicPopup, $window, $ionicPlatform, $cordovaFileOpener2) {

	var obj = {};

	obj.initDownloadDirectory = function(){
		$ionicPlatform.ready(function() {
		window.requestFileSystem($window.LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
		    fileSystem.root.getDirectory(
		        "Downloads",
		        {
		            create: true
		        });
		    fileSystem.root.getDirectory(
		        "Downloads/Transcripts",
		        {
		            create: true
		        });
			});
		});//Platform.ready
    };

	obj.download = function(url,filename,targetDirectory,$scope,template,successCallback)
	{
		filename = filename.replace(/ /g,'_');
		$ionicLoading.show({
		template: template,
		scope:$scope
		});
		window.requestFileSystem($window.LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
		    fileSystem.root.getDirectory(
		        targetDirectory,
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
		                            successCallback();
		                        },
		                        function(error) {
		                            $ionicLoading.hide();
		                            $ionicPopup.alert({
		                            	title: '錯誤',
		                            	template: "程序在执行下载时出错 -> " + error.source
		                            });
		                        },
		                        false
		                    );
		                    fileTransfer.onprogress = function(progressEvent) {
		                    	//console.log('fileTransfer progress: '+ angular.toJson(progressEvent) );
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
	};

	obj.openPDF = function(location, successCallback, errorCallback)
	{
		$ionicPlatform.ready(function() {
		console.log('Opening PDF: location = ' + location);
		$cordovaFileOpener2.open(
		    location,
		    'application/pdf'
		  ).then(function() {
		      // file opened successfully
		      if(successCallback != null)
		      successCallback();
		  }, function(err) {
		      // An error occurred. Show a message to the user
		      console.log(JSON.stringify(err));
		      if(errorCallback != null)
		      errorCallback();
		  });
		});
	};
	
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


