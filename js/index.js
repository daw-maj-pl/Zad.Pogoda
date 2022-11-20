const weekdayFormat = new Intl.DateTimeFormat('pl', { weekday: 'short' });
const dateFormat = new Intl.DateTimeFormat('pl', { dateStyle: 'short' });
const timeFormat = new Intl.DateTimeFormat('pl', { timeStyle: 'short' });

document.getElementById('cities').addEventListener('change', e => {
  const cityName = e.target.value;

  fetch(`https://hide-api-key.onrender.com/api/search?q=${cityName}`)
    .then(resp => resp.json())
    .then(data => {
      if (document.getElementById('tab')) {
        document
          .getElementById('output')
          .removeChild(document.getElementById('tab'));
      }
      const tab = document.createElement('table');
      tab.id = 'tab';

      const trDate = tab.appendChild(document.createElement('tr'));
      const trTemp = tab.appendChild(document.createElement('tr'));
      const trImg = tab.appendChild(document.createElement('tr'));
      const trDescription = tab.appendChild(document.createElement('tr'));

      const timestamps = data.results.list;

      timestamps.forEach(timestamp => {
        const th = document.createElement('th');
        const date = new Date(timestamp.dt_txt);
        th.innerText = `${weekdayFormat.format(date)}\n${dateFormat.format(
          date
        )}\n${timeFormat.format(date)}`;
        trDate.appendChild(th);
      });

      timestamps.forEach(timestamp => {
        const td = document.createElement('td');
        td.innerText = `${Math.round(timestamp.main.temp)}°C`;
        trTemp.appendChild(td);
      });

      timestamps.forEach(timestamp => {
        const td = document.createElement('td');
        const img = document.createElement('img');
        img.src = `http://openweathermap.org/img/wn/${timestamp.weather[0].icon}@2x.png`;
        td.appendChild(img);
        trImg.appendChild(td);
      });

      timestamps.forEach(timestamp => {
        const td = document.createElement('td');
        td.innerText = timestamp.weather[0].description;
        trDescription.appendChild(td);
      });

      document.getElementById('output').appendChild(tab);
    });
});
