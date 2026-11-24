document.getElementById('loadBtn').addEventListener('click', loadPosts);
async function loadPosts() { 
    const content = document.getElementById('content');
    const btn = document.getElementById('loadBtn');
    btn.disabled = true;
    content.innerHTML = '<p>Загрузка...</p>';
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
        if (!response.ok) throw new Error('Ошибка сети');
        const posts = await response.json();
        renderPosts(posts);
    } catch (error) {
        content.innerHTML = `<p style="color: red;">Ошибка: ${error.message}</p>`;
    } finally {
        btn.disabled = false;
    }
}
function renderPosts(posts) {
    const content = document.getElementById('content');
    content.innerHTML = ''; 

    posts.forEach(({ title, body }) => {
        const card = document.createElement('article');
        card.className = 'post-card';
        card.innerHTML = `
            <h3>${title}</h3>
            <p>${body}</p>
        `;
        content.appendChild(card);
    });
}