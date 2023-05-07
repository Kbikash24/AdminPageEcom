axios.get("https://crudcrud.com/api/3fd301e97ea14eb3a04225e10f32385b/appointmentData")
  .then(response => {
    const appointments = response.data;
    const tableBody = document.getElementById('appointment-table-body');

    // Populate table with appointment data
    appointments.forEach(appointment => {
      const row = tableBody.insertRow();
      row.dataset.appointmentId = appointment._id; // Add appointment ID as data attribute
      row.innerHTML = `
        <td>${appointment.name}</td>
        <td>${appointment.category ? appointment.category :''}</td>
        
        <td>INR ${appointment.Price}</td>
        <td>
          <button class="btn btn-sm btn-outline-danger delete-button">Delete</button>
        </td>
      `;
    });
  })
  .catch(error => {
    console.log(error);
  });

const form = document.getElementById('appointment-form');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent form from submitting normally

  // Get form data
  const formData = new FormData(form);

  // Create object from form data
  const appointment = Object.fromEntries(formData.entries());

  // Set the Category field to the selected value from the dropdown
  appointment.category = document.getElementById('category').value;

  // Send appointment data to API
  axios.post("https://crudcrud.com/api/3fd301e97ea14eb3a04225e10f32385b/appointmentData", appointment)
    .then(response => {
      console.log(response);
      alert('Product Listed successfully!');

      // Add appointment data to table
      const tableBody = document.getElementById('appointment-table-body');

      const row = tableBody.insertRow();
      row.dataset.appointmentId = response.data._id; // Use the appointment ID returned by the API
      row.innerHTML = `
        <td>${appointment.name}</td>
        <td>${appointment.category ? appointment.category : ''}</td>
        <td>${appointment.Price}</td>
        <td>
          <button class="btn btn-sm btn-outline-danger delete-button">Delete</button>
        </td>
      `;

      // Reset form
      form.reset();
    })
    .catch(error => {
      console.log(error);
      alert('Error listing Product');
    });
});
const tableBody = document.getElementById('appointment-table-body');

tableBody.addEventListener('click', (event) => {
  const target = event.target;

  // Handle delete button click
  if (target.classList.contains('delete-button')) {
    const row = target.closest('tr');
    const appointmentId = row.dataset.appointmentId;

    // Send delete request to API
    const deleteUrl = `https://crudcrud.com/api/3fd301e97ea14eb3a04225e10f32385b/appointmentData/${appointmentId}`;
    axios.delete(deleteUrl)
      .then(response => {
        console.log('Delete response:', response);
        alert('Appointment deleted successfully!');
        // Remove appointment from table
        row.remove();
      })
      .catch(error => {
        console.log('Delete error:', error);
        alert('Error deleting appointment');
      });
  }
});