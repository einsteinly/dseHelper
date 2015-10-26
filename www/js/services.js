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

			$localStorage.setObject('user_profile',data);
		});
	};

	obj.storeCredentials = function(credentials){
		obj.user = credentials.user;
		$localStorage.setObject('credentials',credentials);
		$http.post($core.APILocation,{JSON:1,action:'user_profile'}).success(function(data){

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
							    if (progressEvent.lengthComputable) {
							      $scope.fileProgress = Math.floor( 100 * (progressEvent.loaded / progressEvent.total) );
							      if (!$scope.$$phase) $scope.$apply();
							    }
							    else $scope.fileProgress=progressEvent.loaded;
							};
		                }, 
		                function() {
		                    $ionicLoading.hide();
		                }
		            );
		        }
		    );
		},
		function() {
		    $ionicLoading.hide();
		});
	};

	obj.openPDF = function(location, successCallback, errorCallback)
	{
		$ionicPlatform.ready(function() {
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


.factory('$data',function($http, $q){
	var obj={};
	var APILocation = 'http://exam.lixiapps.com/api/api';
  var rating_displayed=['U','1','2','3','4','5','5*','5**'];
  obj.databaseInitialised = false;

  //returning the transformed promise

  obj.get_all_questions = function() 
  {
    if(!obj.databaseInitialised)
    {
      return $http.get(APILocation, {params:{public:true, action:'get_all_questions'}})
      .success(function(data)
      {


        obj.databaseInitialised = true;
        var res = angular.copy(data);
        var res_min = angular.copy(res);

        //minify the database
        angular.forEach(res_min, function(item){
          delete item.transcript_html;
          delete item.speaker_profile;
          delete item.comment;
          delete item.rating;
        });

        //decode the JSON encoded comments and ratings
        angular.forEach(res, function(question, key) {
          question.rating_assoc = angular.copy(angular.fromJson(question.rating));
          question.comment_assoc = angular.copy(angular.fromJson(question.comment));
          question.profile_assoc = angular.copy(angular.fromJson(question.speaker_profile));

          //For proper line breaks
          angular.forEach(question.comment_assoc,function(value,key1){
                angular.forEach(value.comment,function(comment,key2){
                  question.comment_assoc[key1].comment[key2]=question.comment_assoc[key1].comment[key2].replace(/\\n/g,"\n");
                });
              });
          angular.forEach(question.profile_assoc,function(value){
                value=value.replace(/\n/g,"\n");
              });

          //Computing average ratings
          var speaker_rating_average = [0,0,0,0]; var count=0; var average_rating = 1;
          angular.forEach(question.rating_assoc,function(rating,key){

            speaker_rating_average[0] += rating.rating[0];
            speaker_rating_average[1] += rating.rating[1];
            speaker_rating_average[2] += rating.rating[2];
            speaker_rating_average[3] += rating.rating[3];
            count++;
          });

          question.rate = [];
          if(count!=0){
          speaker_rating_average[0] = Math.round( speaker_rating_average[0] / count );question.rate[0] = rating_displayed[ speaker_rating_average[0] - 1];
          speaker_rating_average[1] = Math.round( speaker_rating_average[1] / count );question.rate[1] = rating_displayed[speaker_rating_average[1] - 1];
          speaker_rating_average[2] = Math.round( speaker_rating_average[2] / count );question.rate[2] = rating_displayed[speaker_rating_average[2] - 1];
          speaker_rating_average[3] = Math.round( speaker_rating_average[3] / count );question.rate[3] = rating_displayed[speaker_rating_average[3] - 1];
          average_rating = (speaker_rating_average[0]+speaker_rating_average[1]+speaker_rating_average[2]+speaker_rating_average[3])/4;
          }

          question.speaker_rating_average = speaker_rating_average;
          question.average_rating = Math.round(average_rating);

        });
        
        obj.database = angular.copy(res);
        obj.database_min = angular.copy(res_min);

        //----------------------------------------------------
        // Creating a database with only individual discussions and group discussions
        //----------------------------------------------------

        var database_individual=[];
        angular.forEach(res, function(question,key){
          if(question.discussion_type == false) //individual discussion
          {
            database_individual.push(question);
          }
        });

        obj.database_individual = database_individual;

        var database_group=[];
        angular.forEach(res, function(question,key){
          if(question.discussion_type == true) //group discussion
          {
          	database_group.push(question);
          }
        });
        obj.database_group = database_group;



        //API for getting a question only
        obj.get_question_by_id = function(id) 
        {
          var result;
          angular.forEach(obj.database, function(question,key){

              if(id == question.id) result = angular.copy(question);
            });

          //Query for Conjugate ID if any

          angular.forEach(obj.database_individual, function(question,key){

              if(id == question.id) result.conjugateID = angular.copy(question.conjugateID);
            });


          return result;

        }

      });
    }

    else if(obj.databaseInitialised)
    {

      return $q.when();
    }
  }//obj.get_all_questions = function(){ }
  
  obj.get_all_questions();
  
	return obj;
})


.factory('$sharedContent', function(){

	var sharedContent = {};
	
	return {
		getter: function(key) {
			return sharedContent[String(key)];
		},
		setter: function(key, value) {
			sharedContent[String(key)] = value;
		}
	};
})

.service('ptrService', ['$timeout', '$ionicScrollDelegate', function($timeout, $ionicScrollDelegate) {

  /**
   * Trigger the pull-to-refresh on a specific scroll view delegate handle.
   * @param {string} delegateHandle - The `delegate-handle` assigned to the `ion-content` in the view.
   */
  this.triggerPtr = function(delegateHandle) {

    $timeout(function() {

      var scrollView = $ionicScrollDelegate.$getByHandle(delegateHandle).getScrollView();

      if (!scrollView) return;

      scrollView.__publish(
        scrollView.__scrollLeft, -scrollView.__refreshHeight,
        scrollView.__zoomLevel, true);

      var d = new Date();

      scrollView.refreshStartTime = d.getTime();

      scrollView.__refreshActive = true;
      scrollView.__refreshHidden = false;
      if (scrollView.__refreshShow) {
        scrollView.__refreshShow();
      }
      if (scrollView.__refreshActivate) {
        scrollView.__refreshActivate();
      }
      if (scrollView.__refreshStart) {
        scrollView.__refreshStart();
      }

    });

  }
}])
;



