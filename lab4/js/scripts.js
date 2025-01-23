/**
 * Скрипт загрузки данных о качествах пользователя с сервера и отображения их в таблице.
 * Ожидает загрузки DOM, выполняет fetch-запрос к серверу и обрабатывает данные.
 */
document.addEventListener('DOMContentLoaded', function() {
  /**
   * Запрашиваем данные с mock JSON-сервера.
   */
  fetch('http://localhost:3001/qualities')
    .then(response => {
      /**
       * Проверяем, успешно ли получен ответ от сервера.
       * Если статус ответа не в диапазоне 200-299, выбрасываем ошибку.
       */
      if (!response.ok) {
        throw new Error('Ошибка сети: не удалось получить данные');
      }
      return response.json(); // Преобразуем ответ сервера из JSON в объект
    })
    .then(data => {
      /**
       * Находим таблицу профиля и добавляем в неё загруженные данные.
       */
      const tableBody = document.querySelector('.profile table tbody');
      
      data.forEach(quality => {
        // Создаем новую строку таблицы
        const row = document.createElement('tr');
        const qualityCell = document.createElement('td');
        const descriptionCell = document.createElement('td');

        // Заполняем ячейки текстом из полученных данных
        qualityCell.textContent = quality.quality;
        descriptionCell.textContent = quality.description;

        // Добавляем ячейки в строку
        row.appendChild(qualityCell);
        row.appendChild(descriptionCell);
        
        // Добавляем строку в тело таблицы
        tableBody.appendChild(row);
      });
    })
    .catch(error => {
      /**
       * В случае ошибки выводим сообщение в консоль и информируем пользователя в таблице.
       */
      console.error('Ошибка при загрузке данных:', error);
      const tableBody = document.querySelector('.profile table tbody');
      const errorRow = document.createElement('tr');
      const errorCell = document.createElement('td');
      
      errorCell.setAttribute('colspan', '2'); // Объединяем ячейки в строке
      errorCell.textContent = 'Ошибка загрузки данных. Попробуйте позже.';
      errorRow.appendChild(errorCell);
      tableBody.appendChild(errorRow);
    });
});
