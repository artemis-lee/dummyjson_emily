const search = document.getElementById('search');
const autocomplete = document.getElementById('autocomplete');
const repos = document.getElementById('repos');

let timeout;
search.addEventListener('input', function() {
    clearTimeout(timeout);
    const query = this.value.trim();
            
    if (!query) {
        autocomplete.style.display = 'none';
        return;
        }

        timeout = setTimeout(() => {
            fetch(`https://api.github.com/search/repositories?q=${query}&per_page=5`)
            .then(response => {
                if (!response.ok) throw new Error('Network error');
                    return response.json();
                })
            .then(data => {
                showAutocomplete(data.items);
                })
            .catch(error => {
                console.error('Error:', error);
                autocomplete.style.display = 'none';
                });
            }, 300);
        });


function showAutocomplete(items) {
    autocomplete.innerHTML = '';
            
    if (items && items.length > 0) {
        items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'autocomplete-item';
        div.textContent = item.full_name;
        div.onclick = () => addRepo(item);
        autocomplete.appendChild(div);
    });
        autocomplete.style.display = 'block';
        } else {
                autocomplete.style.display = 'none';
            }
        }

function addRepo(repo) {
    const repoDiv = document.createElement('div');
    repoDiv.className = 'repo-item';
    repoDiv.innerHTML = `
        <div class="repo-info">
        <div class="repo-name">${repo.name}</div>
        <div class="repo-meta">
            <span>Owner: ${repo.owner.login}</span>
            <span>Stars: ${repo.stargazers_count}</span>
                    </div>
            </div>
            <span class="remove-btn" onclick="this.parentElement.remove()">✕</span>
            `;
            repos.appendChild(repoDiv);
            search.value = '';
            autocomplete.style.display = 'none';
        }

document.addEventListener('click', function(e) {
    if (e.target !== search && !autocomplete.contains(e.target)) {
    autocomplete.style.display = 'none';
            }
    });