$('.email-form').on('submit', function(e) {
  e.preventDefault();
  var form = $('#email-form');
  
  var body = form.find('textarea').val();
  var subject = form.find('input[name="email-subject"]').val();
  var sender = form.find('input[name="sender-name"]').val() ? form.find('input[name="sender-name"]').val() + ' <' + form.find('input[name="sender-email"]').val() + '>' : form.find('input[name="sender-email"]').val(); 
  
  if(!body || !subject || !sender){
    form.find('.email-fail-alert').show();
    return;
  }
  
  var emailSendObj = {
    subject: subject,
    html: body, 
    from: sender
  };
  
  console.log(emailSendObj);
  
  $.ajax({
    url: '/email',
    method: 'POST',
    data: emailSendObj,
    success: function(data, status, xhr){
      console.log('success posting data', data, status, xhr);
      form.find('.email-success-alert').show();
    },
    error: function(err){
      console.log('Error posting data', err);
    }
  });

});
