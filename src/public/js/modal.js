$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})

$(document).ready(function () {
  $('#myTabs a').on('click', function (e) {
      e.preventDefault();
      $(this).tab('show');
  });
});