(function(module){
  ghApi = {};
  // ghApi.nameArray = [];


  ghApi.getMostRecentRepos = function(callback){
    $.ajax({
      url: 'https://api.github.com/users/fraziermork/repos' +
            '?sort=pushed',
      method: 'GET',
      headers: {'Authorization': 'token ' + githubToken},
      success: function(data, message, xhr){
        console.log(data);
        callback();
      },
      error: function(){
        console.log('error making gh ajax call');
      }
    });
  };

  ghApi.getRepo = function(repoName, callback){
    $.ajax({
      url: 'https://api.github.com/repos/fraziermork/'
      + repoName,
      method: 'GET',
      headers: {'Authorization': 'token ' + githubToken},
      success: function(data, message, xhr){
        console.log(data);

        callback(data);
      }
    });
  };

  // ghApi.sortReposByDate = function(repoNameArray){
  //
  //   // $.when()
  // };


  module.ghApi = ghApi;
})(window);
