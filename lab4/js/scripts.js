document.addEventListener('DOMContentLoaded', function() {
  // Запрос данных с mock-json-server
  fetch('http://localhost:3001/qualities')
    .then(response => {
      // Проверка на успешный ответ от сервера
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Преобразуем ответ в JSON
    })
    .then(data => {
      const tableBody = document.querySelector('.profile table tbody'); // Таблица профиля
      data.forEach(quality => {
        const row = document.createElement('tr');
        const qualityCell = document.createElement('td');
        const descriptionCell = document.createElement('td');

        qualityCell.textContent = quality.quality;
        descriptionCell.textContent = quality.description;

        row.appendChild(qualityCell);
        row.appendChild(descriptionCell);
        tableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      // Можем отобразить сообщение об ошибке пользователю
      const tableBody = document.querySelector('.profile table tbody');
      const errorRow = document.createElement('tr');
      const errorCell = document.createElement('td');
      errorCell.setAttribute('colspan', '2');
      errorCell.textContent = 'Failed to load data. Please try again later.';
      errorRow.appendChild(errorCell);
      tableBody.appendChild(errorRow);
    });
});
