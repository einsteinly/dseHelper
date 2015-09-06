angular.module('controllers', ['ionic','dependencies','services','ngCordova'])


.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicLoading,$http, $ionicPopup, $core, $account, $rootScope) {

  $scope.player = $rootScope.player;

  $scope.user = $account.user;
  if (!$scope.$$phase) $scope.$apply();

  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    // console.log('Doing login', $scope.loginData);
    $ionicLoading.show({
      template: '<i class="fa fa-spinner fa-pulse"></i> 連接中...'
    });

    $http.post($core.APILocation,{JSON:1,action:'login',user:$scope.loginData.username,password:$scope.loginData.password})
    .success(function(data,status,headers,config){
        // console.log(data);
        $ionicLoading.hide();

        if(data!=1) $ionicPopup.alert({
            title: '無法登陸' ,
            template: '請重新輸入帳戶密碼.'
        });
        if(data == 1)
          {
            $account.storeCredentials({user:$scope.loginData.username,password:$scope.loginData.password});
            $scope.user = $scope.loginData.username;
            $scope.closeLogin();
            if (!$scope.$$phase) $scope.$apply();
          }
        });
  };

  $scope.signout = function(){
    $ionicPopup.confirm({
      title: '登出',
      template: "確認登出?"
    }).then(function(response) {
      if(response){
      $account.signout();
      $scope.user = null;
      if (!$scope.$$phase) $scope.$apply();
    }
    });
}

})



.controller('ProfileCtrl',function($scope,$account, $ionicPopup, $ionicLoading){
  $scope.user_profile = $account.user_profile;
  $scope.user = $account.user;
  $scope.user_input = {};

  $ionicLoading.show({
    template: "正在登錄到服務器..."
  });
  $account.login( function(){
    $ionicLoading.hide();
  }, function(){
    $ionicPopup.alert({
      title: '確認',
      template: '連接錯誤。請檢查您的網絡連接。'
    });
  });
  $scope.submit = function() 
  {
    $ionicPopup.confirm({
      title: '確認',
      template: '確定要提交嗎？'
    }).then(function(response){
      if(response)
      {
        if($scope.user_input.email != '' && $scope.user_input.password != '' && $scope.user_input.password == $scope.user_input.password2 ) 
        {
            $ionicLoading.show({
            template: "正在連接。。。"
            });
            $account.update_profile($scope.user,$scope.user_input.password, $scope.user_input.email, function(data){
            if(data) 
              {
                $ionicLoading.hide();
                $ionicPopup.alert({
                  title: '成功',
                  template: '信息更新成功'
                });
              }
            else $ionicPopup.alert({
              title: '錯誤',
              template: '連接錯誤。請檢查您的網絡連接。'
            });
          });
        }
        else {$ionicPopup.alert({
          title: '錯誤',
          template: '密碼不匹配或郵箱為空'
        });}
      }
    });
  };
})

.controller('browseController', function($scope,$http,$core,$ionicLoading){
  $core.checkNetwork(function(){
  $ionicLoading.show({
      template: "<i class='fa fa-pulse fa-spinner'></i> 加載中..."
    });
    
    $http.get($core.APILocation ,{params:{ public:true, action:'get_questions'}}).success(function(data){
      // console.log(data);

      // for(var i=2010;i<2015;i++)
      // {
      //   if(data[String(i)] != null)
      //   $scope['n'+String(i)] = data[String(i)].length;
      //   else $scope['n'+String(i)]=0;
      // }
      $scope.groupCount = {};  //discussion_type=true
      $scope.individualCount = {};
      angular.forEach(data, function(questions, year){
        $scope.groupCount[year]=0;
        $scope.individualCount[year]=0;
        angular.forEach(questions, function(question, key){
          if(question.discussion_type == 1) $scope.groupCount[year]++;
          else $scope.individualCount[year]++;
        });
      });
      // console.log(JSON.stringify($scope.count));
      $ionicLoading.hide();
    });
  });
})

.controller('browseYearController', function($scope,$http,$core,$stateParams,$ionicLoading){
  $scope.year = $stateParams.year;
  $scope.category = $stateParams.category;
  var category = $scope.category;
  var category_displayed = ['個人討論','小組討論'];
  $scope.category_displayed = category_displayed[$scope.category];

  // if(category) $scope.backgroundStyle = 'background:url( resources/img/group.jpg); background-repeat: no-repeat; background-size: 100%';
  // else $scope.backgroundStyle = 'background:url( resources/img/individual.jpg); background-repeat: no-repeat; background-size: 100%';
  $scope.refresh = function()
  {
    $ionicLoading.show({
        template: "<i class='fa fa-pulse fa-spinner'></i> 加載中..."
      });
      
    $http.get($core.APILocation ,{params:{ public:true, action:'get_questions'}}).success(function(data){
      // console.log(JSON.stringify(data));

      if(data[$stateParams.year] != null)
      $scope.questions = data[$stateParams.year];
      else $scope.questions=[];
      
      angular.forEach($scope.questions,function(question,key){
        // console.log('entered iteration loop', key,question);
        if(question.discussion_type == $scope.category)
        {
          question.rating_assoc = angular.fromJson(question.rating);
          question.comment_assoc = angular.fromJson(question.comment);
          if(question.rating_assoc != null)
          question.rating_count = question.rating_assoc.length;
          else question.rating_count = 0;

          if(question.comment_assoc != null)
          question.comment_count = question.comment_assoc.length;
          else question.comment_count = 0;
        }
        else
        {
          $scope.questions.splice(key,1);
        }
        });

      $ionicLoading.hide();
      $scope.$broadcast('scroll.refreshComplete');
    });
  }
  $scope.refresh();
  
})


.controller('browseQuestionsController', function($scope,$stateParams,$http,$core,$ionicLoading,$sce,$state, $ionicPopup, $file, $account, $ionicModal, $ionicActionSheet, $questionContents, $localStorage){

  $scope.category = $stateParams.category;
  $scope.year = $stateParams.year;
  $scope.questionID = $stateParams.questionID;  


  $scope.trustSrc = function(src) {
    // console.log(src);
    return $sce.trustAsResourceUrl(src);
  };

  $scope.refresh = function(){
    // $scope.max = 8;
    // $scope.rate = [];
    
    $ionicLoading.show({
          template: "<i class='fa fa-pulse fa-spinner'></i> 加載中..."
        });
    $questionContents.getContentByID($stateParams.questionID, function(data)
      {
        $scope.question = data;
        $scope.rate = data.rate;
        $scope.transcript_html = data.transcript_html;
        
        // console.log($scope.html_url);
        if(!$scope.$$phase) $scope.$apply();
        $ionicLoading.hide();
        // console.log('speaker_rating_average:\n',$scope.rate);
        $scope.$broadcast('scroll.refreshComplete');
      });
    
  };
  
  $scope.refresh();

  $scope.download = function(){
    $ionicPopup.confirm({
      title: "下載",
      template: "確認下載 MP3 和 PDF 文件?"
    }).then(function(response){
      var mp3_url = "http://exam.lixiapps.com/api/mp3/"+$scope.question.mp3_name;
      var pdf_url = "http://exam.lixiapps.com/api/pdf/"+$scope.question.pdf_name;
      var html_url = "http://exam.lixiapps.com/api/html/"+$scope.question.html_name;
      if(response) 
      {
        var filename = $scope.year+'_'+$scope.question.question + ".mp3";
        var message = '<i class="fa fa-spinner fa-pulse"></i> 下載 MP3 文件中...<br> <p ng-if= "fileProgress != false"> {{fileProgress}} % 已下載 </p> <button class="button button-block button-light" ng-click="hide()">隱藏</button> ';
        $file.download(mp3_url,filename,"Downloads",$scope,message,function(){
          //Callback from the previous download
          var filename = $scope.year+'_'+$scope.question.question + ".pdf";
          var message = '<i class="fa fa-spinner fa-pulse"></i> 下載 PDF 文件中...<br> <p ng-if= "fileProgress != false"> {{fileProgress}} % 已下載 </p> <button class="button button-block button-light" ng-click="hide()">隱藏</button> ';
          $file.download(pdf_url,filename,"Downloads/Transcripts",$scope,message,function(){
            $localStorage.set($scope.year+'_'+$scope.question.question,$scope.transcript_html);
            // console.log('saving transcript_html',$scope.year+'_'+$scope.question.question,$scope.transcript_html);
            $ionicPopup.alert({
                                title: "下載成功",
                                template: "PDF 和 MP3 文件已成功下载。"
                              });
            
          });
        });
      }
    });
  };


  $ionicModal.fromTemplateUrl("templates/add_comment.html", {scope:$scope,animation:'slide-in-up'}).then(function(modal){
    $scope.modalComment = modal;
  });

  $scope.closeComment = function() {$scope.modalComment.hide();};

  $scope.commentShow = function() {

    if($account.user != null)
    {
      $scope.modalComment.show();
    }
    else {
      $ionicPopup.confirm({
        title: "請登入",
        template: "只有已註冊老師才可以評論. 如果你已經註冊, 請按 'OK' 鍵前往登錄介面. "
      }).then(function(response){
        if(response) $scope.$parent.login();
      });
    }
  };

  $scope.comment={};
  $scope.comment.rating=[];
  $scope.rating_displayed=['U','1','2','3','4','5','5*','5**'];

  $scope.rateClicked = function(index)
  {
    $scope.hideActionSheet = $ionicActionSheet.show({
      buttons: [
      {text: "U"},
      {text: "1"},
      {text: "2"},
      {text: "3"},
      {text: "4"},
      {text: "5"},
      {text: "5*"},
      {text: "5**"}
      ],
      titleText: "評分",
      cancelText: "取消",
      cancel: function (){},
      buttonClicked: function (clickedIndex) {
        // console.log('index ',index,'clickedIndex',clickedIndex);
        $scope.comment.rating[index] = clickedIndex+1;
        return true;
      }
    });
  };

  $scope.submitComment = function(){
    $ionicPopup.confirm({
      title: "提交評論",
      template: "確認提交?"
    }).then(function(response){
      if(response)
      {
        var username = $account.user;
        // console.log("http get info: " + username, JSON.stringify($scope.comment));
        $http.get($core.APILocation,{params:{public:true, action:'insert_comment',id:$stateParams.questionID, comment1:$scope.comment.comment[0],comment2:$scope.comment.comment[1],comment3:$scope.comment.comment[2],comment4:$scope.comment.comment[3],rating1:$scope.comment.rating[0],rating2:$scope.comment.rating[1],rating3:$scope.comment.rating[2],rating4:$scope.comment.rating[3], user: username }}).success(function(data){
          // console.log(data);
          $ionicPopup.alert({
            title: '成功',
            template: "你的評論已被成功上載."
          });
          $scope.closeComment();
          $scope.refresh();
          $scope.$parent.refresh();
        });
      }
    });
  };

})

.controller('downloadBrowseController', 
  function($window, $ionicPlatform, $rootScope, $scope, $ionicScrollDelegate, AudioSvc, $ionicModal, $file, $core, $localStorage) {
    $scope.files = [];
 
    $scope.hide = $rootScope.hide;

    //Create the Downloads folder if it does not exist
    $file.initDownloadDirectory();

    $scope.refresh = function() {
      getFileSystem();
      $scope.$broadcast('scroll.refreshComplete');
    }
    
    function hasExtension(fileName) {
        var exts = ['.mp3', '.m4a', '.ogg', '.mp4', '.aac','pdf'];
        return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
      }
 
    function processEntries(entries, arr) {

      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];

        // do not push/show hidden files or folders
        if (e.name.indexOf('.') !== 0) {
          arr.push({
            id: i + 1,
            name: e.name,
            isUpNav: false,
            isDirectory: e.isDirectory,
            nativeURL: e.nativeURL,
            fullPath: e.fullPath
          });
        }
      }
      return arr;
    };

    $ionicModal.fromTemplateUrl('templates/player.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $rootScope.hidePlayer = function() {
      $scope.modal.hide();
    };
 
    $rootScope.player = function() {
      $scope.modal.show();
    };

    $scope.open_transcript = function(transcript_path){
      $file.openPDF(transcript_path,function(){},function(){});
    };
    
    $scope.player = $rootScope.player;
    $scope.hidePlayer = $rootScope.hidePlayer;
    function getFileSystem(callback)
    {
      $rootScope.show('正在打開文件夾,請稍後...');
      $window.requestFileSystem($window.LocalFileSystem.PERSISTENT, 0, function(fs) {
          //console.log("fs", JSON.stringify(fs));
          
          var directoryReader = fs.root.createReader();
 
          directoryReader.readEntries(function(entries) {
              var arr = [];
              processEntries(entries, arr); // arr is pass by refrence
              $scope.files = arr;
              //Get into the Downloads folder if it exists, which should be the case whenever one downloads any file.
              //console.log('files object= ',JSON.stringify(arr));
              angular.forEach(arr, function(file,key){
                //console.log('Iterating over files--file.name= ', file.name);
                if(file.name == 'Downloads') 
                {
                  $scope.showSubDirs(file);
                  //console.log('Downloads file: ', JSON.stringify(file));
                }
              });
              $rootScope.hide();
            },
            function(error) {
              console.log(error);
            });
        },
        function(error) {
          console.log(error);
        });
    }

    $ionicPlatform.ready(function() {

      $scope.showSubDirs = function(file) {
 
        if (file.isDirectory || file.isUpNav) {
          if (file.isUpNav) {
            processFile(file.nativeURL.replace(file.actualName + '/', ''));
          } else {
            processFile(file.nativeURL);
          }
        } else {

          //Using relative path instead
          //ONLY RELATIVE PATHS WORK IN IOS!!!
          if($rootScope.isIOS)
            var downloads_dir = "../Documents/Downloads/";

          //THE FOLLOWING IS FOR ANDROID
          if($rootScope.isAndroid)
            var downloads_dir = file.nativeURL.replace(file.name,'');

          if (hasExtension(file.name)) {
            // console.log(JSON.stringify(file));
            if (file.name.indexOf('.pdf')>0)
            {
              //$file.openPDF(downloads_dir + file.name,function(){},function(){});
              $file.openPDF(file.nativeURL.replace('file://',''));
            }
            /*
            else if (file.name.indexOf('.mp4') > 0) {
              // Stop the audio player before starting the video
              $scope.stopAudio();
              VideoPlayer.play(file.nativeURL);
            }*/
            else {
              fsResolver(file.nativeURL, function(fs) {
                // console.log('fs ',JSON.stringify(fs),'audio file',JSON.stringify(file));
                // Play the selected file

                AudioSvc.playAudio(downloads_dir+file.name, function(a, b) {
                  //console.log(a, b, angular.toJson(file));
                  $scope.position = Math.ceil(a / b * 100);
                  if (a < 0) {
                    $scope.stopAudio();
                  }
                  if (!$scope.$$phase) $scope.$apply();
                });
                
                //$scope.transcript_path = downloads_dir + "Transcripts/" + file.name.replace('.mp3','.pdf');
                $scope.transcript_path = file.nativeURL.replace('file://','').replace('Downloads','Downloads/Transcripts').replace('.mp3','.pdf');
                $scope.transcript_html = $localStorage.get(file.name.replace('.mp3',''),'Transcript not found');
                // console.log(file.name.replace('.mp3',''));
                // console.log($scope.transcript_path);
                $scope.loaded = true;
                $scope.isPlaying = true;
                $scope.name = file.name;
                $scope.path = file.fullPath;
 
                // show the player
                $scope.player();
 
                $scope.pauseAudio = function() {
                  AudioSvc.pauseAudio();
                  $scope.isPlaying = false;
                  if (!$scope.$$phase) $scope.$apply();
                };
                $scope.resumeAudio = function() {
                  AudioSvc.resumeAudio();
                  $scope.isPlaying = true;
                  if (!$scope.$$phase) $scope.$apply();
                };
                $scope.stopAudio = function() {
                  AudioSvc.stopAudio();
                  $scope.loaded = false;
                  $scope.isPlaying = false;
                  if (!$scope.$$phase) $scope.$apply();
                };
 
              });
            }
          } else {
            $rootScope.toggle('對不起,我們無法打开此文件 :/', 2000);
          }
 
        }
 
      }
 
      function fsResolver(url, callback) {
        $window.resolveLocalFileSystemURL(url, callback);
      }
 
      function processFile(url) {
        fsResolver(url, function(fs) {
          //console.log(fs);
          var directoryReader = fs.createReader();
 
          directoryReader.readEntries(function(entries) {
              if (entries.length > 0) {
                var arr = [];
                // push the path to go one level up
                if (fs.fullPath !== '/Downloads/') {
                //DEBUG MODE TO SHOW ALL FILES
                //if (fs.fullPath !== '/') {
                  arr.push({
                    id: 0,
                    name: '.. 返回',
                    actualName: fs.name,
                    isDirectory: false,
                    isUpNav: true,
                    nativeURL: fs.nativeURL,
                    fullPath: fs.fullPath
                  });
                }
                processEntries(entries, arr);
                $scope.$apply(function() {
                  $scope.files = arr;
                });
 
                $ionicScrollDelegate.scrollTop();
              } else {
                $rootScope.toggle(fs.name + ' 文件夾為空', 2000);
              }
            },
            function(error) {
              console.log(error);
            });
        });
      }
      $scope.refresh();
  });//ionicPlatform.ready
})  //Controller

.controller('browseCandidateController', function($scope,$stateParams,$http,$core,$ionicLoading,$state, $ionicPopup, $questionContents){
  $scope.candidate_displayed = ['A','B','C','D'];
  $scope.candidate = $stateParams.candidate;
  $scope.rating_displayed=['U','1','2','3','4','5','5*','5**'];
  // console.log($scope.candidate);
  $scope.refresh = function(){
    // $scope.max = 8;
    // $scope.rate = [];
    $scope.year = $stateParams.year;
    $scope.questionID = $stateParams.questionID;  
    $ionicLoading.show({
          template: "<i class='fa fa-pulse fa-spinner'></i> 加載中..."
        });
    $questionContents.getContentByID($stateParams.questionID, function(data)
      {
        $scope.question = data;
        $scope.rate = data.rate;
        
        if(!$scope.$$phase) $scope.$apply();
        $ionicLoading.hide();
        // console.log('speaker_rating_average:\n',$scope.rate);
        $scope.$broadcast('scroll.refreshComplete');

      });
    
  };
  $scope.refresh();
})
;




