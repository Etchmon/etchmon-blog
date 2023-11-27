document.querySelectorAll('.delete-post').forEach(function(button) {
  button.addEventListener('click', function(e) {
    const postId = e.target.id;
    fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      // Handle response here
      location.reload();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  });
});