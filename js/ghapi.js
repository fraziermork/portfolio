(function(module){
  ghApi = {};
  // ghApi.nameArray = [];


  ghApi.getMostRecentRepos = function(callback){
    $.ajax({
      url: '/github/users/fraziermork/repos' +
            '?sort=pushed'
    }).done(function(data, message, xhr){
      console.log(data);
      callback();
    });
  };

  ghApi.getRepo = function(repoName, callback){
    $.ajax({
      url: '/github/repos/fraziermork/'
      + repoName
    }).done(function(data, message, xhr){
      console.log(data);
      callback(data);
    });
  };

  ghApi.queryMe = function(callback){
    $.ajax({
      url: '/github/users/fraziermork'
    }).done(function(data, message, xhr){
      console.log(data);
      callback(data);
    });
  };


  module.ghApi = ghApi;
})(window);
