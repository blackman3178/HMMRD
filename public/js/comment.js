const commentFormHandler = async function(event) {
    event.preventDefault();
  
    const drink_id = document.querySelector('.inputDrinkId').value;
    const comment = document.querySelector('textarea[name="comment-body"]').value;
  
  
    if (comment) {
      await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({
          drink_id,
          comment
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("HERE IS A CONSOLE LOG!!!!", drink_id);
  
      document.location.reload();
    }
  };
  
  document
    .querySelector('#new-comment-form')
    .addEventListener('submit', commentFormHandler);