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
    let customer_name = $('#customer').val().trim();
    let burger = { burger_name, customer_name };
    // Remove DOM element input value
    $('#burger').val("");
    $('#customer').val("");
    // Send POST request
    $.post('/api/burgers', burger)
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
    let burger = {id: $(e.target).data("burger")};
    // Send PUT request
    $.ajax({
      method: "PUT",
      url: "/api/burgers",
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
      url: "/api/burgers"
    })
      // On success, reload page
      .then(res => window.location.reload(true))
      .catch(err => console.error(err));
  })
});
