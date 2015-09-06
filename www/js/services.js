/**
* services Module
*
* Description
* All necessary functions and local storage needed for account information
*/
angular.module('services', ['dependencies','ngCordova','ionic']).

factory('$account', function($localStorage,$http,$core,$ionicPopup, $ionicPlatform){

	var obj={};

	function storeCredentials(credentials){
		obj.user = credentials.user;
		$localStorage.setObject('credentials',credentials);
		$http.post($core.APILocation,{JSON:1,action:'user_profile'}).success(function(data){
			console.log('getting user_profile: response= '+data);
			$localStorage.setObject('user_profile',data);
		});
	};

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
				$http.post($core.APILocation,{JSON:1,action:'login',user:cred.user,password:cred.password},{timeout:5000}).success(function(data){
					successCallback();
					if(data !=1){
					$ionicPopup.alert({
						title: '連接錯誤' ,
						template: '連接錯誤。您只能使用這個應用程序的離線功能。'
					});
					errorCallback();
					}
				})
			}
		});
	});
	};

	obj.update_profile = function(user, password ,email, callback)
	{
		console.log(user,password,email);
		$http.get($core.APILocation ,{params:{ public:true, action:'update_profile', email:email, password:password}}).success(function(data){
			callback(data);
		});
		storeCredentials({user:user,password:password});
	}

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

.factory('$questionContents',function($http,$ionicLoading,$stateParams,$core,$state,$ionicPopup){

	var obj ={};

	obj.getContentByID = function(questionID, callback)
	{  
		var rating_displayed=['U','1','2','3','4','5','5*','5**'];
	    $http.get($core.APILocation ,{params:{ public:true, action:'get_question_by_id', id:questionID}}).success(function(data){
	      // console.log(data);

	      if(data != null) 
	      {
	      	data.rating_assoc = angular.fromJson(data.rating);
	        data.comment_assoc = angular.fromJson(data.comment);
	        data.speaker_assoc = angular.fromJson(data.speaker);
	        data.profile_assoc = angular.fromJson(data.speaker_profile);
	      	angular.forEach(data.comment_assoc,function(value,key1){
	          angular.forEach(value.comment,function(comment,key2){
	            data.comment_assoc[key1].comment[key2]=data.comment_assoc[key1].comment[key2].replace(/\\n/g,"\n");
	          });
	        });
	        // console.log(data.comment_assoc, data.comment);
	        console.log(data.rating_assoc,data.rating);
	        angular.forEach(data.profile_assoc,function(value){
	          value=value.replace(/\n/g,"\n");
	        });

	        var speaker_rating_average = [0,0,0,0]; var count=0;
	        angular.forEach(data.rating_assoc,function(rating,key){

	          speaker_rating_average[0] += rating.rating[0];
	          speaker_rating_average[1] += rating.rating[1];
	          speaker_rating_average[2] += rating.rating[2];
	          speaker_rating_average[3] += rating.rating[3];
	          count++;
	        });

	        data.rate = [];
	        if(count!=0){
	        speaker_rating_average[0] /= count;data.rate[0] = rating_displayed[ speaker_rating_average[0] - 1];
	        speaker_rating_average[1] /= count;data.rate[1] = rating_displayed[speaker_rating_average[1] - 1];
	        speaker_rating_average[2] /= count;data.rate[2] = rating_displayed[speaker_rating_average[2] - 1];
	        speaker_rating_average[3] /= count;data.rate[3] = rating_displayed[speaker_rating_average[3] - 1];
	        }
	        data.speaker_rating_average = speaker_rating_average;
	      }
	      else data = [];


	      callback(data);
	  });
	};

	return obj;
})
;


