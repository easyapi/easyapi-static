if ($.cookie("authenticationToken")) {
  $.ajax({
    method: 'GET',
    url: 'https://account-api.easyapi.com/api/account',
    beforeSend: function (request) {
      request.setRequestHeader("Authorization", "Bearer " + ($.cookie("authenticationToken")));
    },
    success: function (data) {
      $("#photo").attr("src", data.photo + "!icon.jpg");
      $("#avatar").removeClass('dis_hide');
      $("#login").addClass('dis_hide');
      $("#console").removeClass('dis_hide');
    }
  });
}
