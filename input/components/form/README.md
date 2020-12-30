# Form

## Usage

Requires loading, submitted, submitCallback, and valid props to handle state.

* loading: whether the submit callback is still waiting a response. Set to true in the submitCallback and then false on response regardless of if the request was successful.
* submitted: whether or not the submit button has already been clicked. Set to true after the submitCallback HTTP request returns a response.
* submitCallback: function to call on submit. All form field values should be handled as state in the parent of the Form component. 
* valid: whether or not the submit button should be disabled.

Requires form fields as children.
