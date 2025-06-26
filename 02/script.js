document.addEventListener('DOMContentLoaded', async () => {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '<div class="loading">Carregando fotos...</div>';

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/photos');
        if (!response.ok) throw new Error('Falha ao carregar dados');
        
        const fotos = await response.json();
        const filtrado = fotos.slice(0, 15);
        
        gallery.innerHTML = '';

        filtrado.forEach(foto => {
            const card = document.createElement('div');
            card.className = 'photo-card';
            card.innerHTML = `
                <img src="${foto.thumbnailUrl}" alt="${foto.title}" class="photo-img">
                <p class="photo-title">${foto.title}</p>
            `;
            gallery.appendChild(card);
        });

    } catch (error) {
        gallery.innerHTML = `<div class="loading">Erro: ${error.message}</div>`;
        console.error('Erro:', error);
    }
});