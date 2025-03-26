/**
 * Загружает данные о качествах пользователя с сервера и отображает их в таблице.
 * Ожидает загрузки DOM перед выполнением.
 */
document.addEventListener('DOMContentLoaded', function () {
    /**
     * Отправляет запрос на сервер для получения данных о качествах.
     */
    fetch('http://localhost:3001/qualities')
      .then(response => {
        // Проверяем успешность запроса
        if (!response.ok) {
          throw new Error('Ошибка сети: не удалось получить данные');
        }
        return response.json();
      })
      .then(data => {
        /**
         * Находит таблицу качеств и заполняет её загруженными данными.
         */
        const tableBody = document.querySelector('.profile__qualities tbody');
  
        // Создаём фрагмент для временного хранения строк
        const fragment = document.createDocumentFragment();
  
        data.forEach(quality => {
          const row = document.createElement('tr');
          const qualityCell = document.createElement('td');
          const descriptionCell = document.createElement('td');
  
          qualityCell.textContent = quality.quality;
          descriptionCell.textContent = quality.description;
  
          row.appendChild(qualityCell);
          row.appendChild(descriptionCell);
          fragment.appendChild(row); // Добавляем строку во фрагмент
        });
  
        tableBody.appendChild(fragment); // Вставляем всё одной операцией
      })
      .catch(error => {
        /**
         * Обрабатывает ошибку загрузки данных, отображает сообщение об ошибке.
         */
        console.error('Ошибка при загрузке данных:', error);
        const tableBody = document.querySelector('.profile__qualities tbody');
        const errorRow = document.createElement('tr');
        const errorCell = document.createElement('td');
  
        errorCell.setAttribute('colspan', '2');
        errorCell.textContent = 'Ошибка загрузки данных. Попробуйте позже.';
  
        errorRow.appendChild(errorCell);
        tableBody.appendChild(errorRow);
      });
  });
  