var token = '';

$.ajax({
  url: "https://api.github.com/users/fraziermork/repos" + "?per_page=5&sort=updated",
  type: "GET",
  headers:{
    'Authorization': 'token ' + token
  },
  success: function(data, message, xhr){
    console.log('data is');
    console.log(data);
    console.log('message is');
    console.log(message);
    console.log('xhr is ');
    console.log(xhr);
  }
});
