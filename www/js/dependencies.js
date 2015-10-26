

angular.module('dependencies',['ionic','ngCordova'])
.factory('$core', function ($ionicPlatform,$ionicPopup, $rootScope) {
    var obj={};
    obj.APILocation = 'http://exam.lixiapps.com/api/api';
    //obj.APILocation = 'debug.php';

    obj.checkNetwork = function(success_callback){
        $ionicPlatform.ready(function() 
        {
            // console.log(JSON.stringify(window.Connection),JSON.stringify(navigator.connection));
            if(window.Connection) 
            {
                if(navigator.connection.type !== Connection.NONE) 
                {
                    success_callback();
                }
                else
                {
                    $ionicPopup.alert({
                        title: "網絡連接",
                        content: "這個功能需要網絡連接。請連接網絡後重試。"
                    })
                }
            }
        });
    };

    obj.isIOS = function(callback)
    {
        if($rootScope.isIOS) 
            {
                // console.log('isIOS');
                callback();
            }
    };

    obj.isAndroid = function(callback)
    {
        if($rootScope.isAndroid) {
            // console.log('isAndroid');
            callback();
        }
    };

    return obj;
})

.run(function($http) {
    delete $http.defaults.headers.common['X-Requested-With'];
    $http.defaults.headers.common.crossDomain = true;
    $http.defaults.withCredentials = true;

    // Use x-www-form-urlencoded Content-Type
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    /**
    * The workhorse; converts an object to x-www-form-urlencoded serialization.
    * @param {Object} obj
    * @return {String}
    */
    var param = function(obj) {
    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

    for(name in obj) {
      value = obj[name];

      if(value instanceof Array) {
        for(i=0; i<value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value instanceof Object) {
        for(subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value !== undefined && value !== null)
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }

    return query.length ? query.substr(0, query.length - 1) : query;
    };

    // Override $http service's default transformRequest
    $http.defaults.transformRequest = [function(data) {
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];

})

.factory('$localStorage', ['$window', function($window) {
    // console.log(JSON.stringify($window.localStorage));
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);

