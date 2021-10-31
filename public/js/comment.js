const commentFormHandler = async function(event) {
    event.preventDefault();
  
    const drink_Id = document.querySelector('input[name="post-id"]').value;
    const comment = document.querySelector('textarea[name="comment-body"]').value;
  
    if (body) {
      await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({
          drink_Id,
          comment
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      document.location.reload();
    }
  };
  
  document
    .querySelector('#new-comment-form')
    .addEventListener('submit', commentFormHandler);