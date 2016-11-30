import harvester from './link-harvester';

const fileReader = new FileReader();
const harvestedLinks = document.querySelector('#harvested-links');
const area = document.querySelector('#area');

fileReader.onload = (event) => {
  area.value = event.target.result
};

function parseFile(event) {
  fileReader.readAsText(event.target.files[0]);
}

function displayLinks() {
  harvestedLinks.innerHTML = '';
  const links = harvester(area.value);

  if (links.links) {
    links.links.forEach((link) => {
      const li = document.createElement('LI');
      li.innerHTML = `${link.linkText} - URL: ${link.url}`;
      harvestedLinks.appendChild(li);
    });
  }
  if (links.emailAddresses) {
    links.emailAddresses.forEach((email) => {
      const li = document.createElement('LI');
      li.innerHTML = `${email}`;
      harvestedLinks.appendChild(li);
    });
  }
  harvestedLinks.parentNode.style.display = 'block';
}

document.querySelector('#file').addEventListener('change', parseFile);
document.querySelector('#harvest').addEventListener('click', displayLinks);
