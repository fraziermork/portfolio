$('.email-form').on('submit', function(e) {
  e.preventDefault();
  var form = $('#email-form');
  
  var body = form.find('textarea').val();
  var subject = form.find('input[name="email-subject"]').val();
  var sender = form.find('input[name="sender-name"]').val() ? form.find('input[name="sender-name"]').val() + ' <' + form.find('input[name="sender-email"]').val() + '>' : form.find('input[name="sender-email"]').val(); 
  
  var emailSendObj = {
    subject: subject,
    body: body, 
    from: sender
  };
  console.log(emailSendObj);
  
  // $.ajax({
  //   
  //   
  // });
  
  
});
