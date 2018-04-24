// Document on ready
$(function() {

  /**
   *  Add new burger
   */
  // On form submission...
  $('.container').on('submit', '#form-add', e => {
    // ...prevent default reloading of page
    e.preventDefault();
    // Get input from DOM
    let burger_name = $('#burger').val().trim();
    let burger = { burger_name };
    // Remove DOM element input value
    $('#burger').val("");
    // Send POST request
    $.post('/burgers', burger)
      // On success, reload page
      .then(res => window.location.reload(true))
      .catch(err => console.error(err));
  });

  /**
   *  Eat burger
   */
  // On click...
  $('.container').on('click', '.devour', e => {
    // Get input from DOM
    let burger = { burger_name: $(e.target).data("burger") };
    // Send PUT request
    $.ajax({
      method: "PUT",
      url: "/burgers",
      data: burger
    })
      // On success, reload page
      .then(res => window.location.reload(true))
      .catch(err => console.error(err));
  })

  /**
   *  Delete all burgers
   */
  // On click...
  $('.container').on('click', '#delete-burgers', e => {
    // Send DELETE request
    $.ajax({
      method: "DELETE",
      url: "/burgers"
    })
      // On success, reload page
      .then(res => window.location.reload(true))
      .catch(err => console.error(err));
  })
});
