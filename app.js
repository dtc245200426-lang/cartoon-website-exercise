const films = [
    { id: 'shoes', title: 'Heo Peppa – Giày mới', youtube: 'N89AJ_cZq8U', channel: 'Heo Peppa Tiếng Việt – Chính Thức', description: 'Peppa và đôi giày mới. Video tiếng Việt được nhúng từ kênh chính thức. Chọn các phim bên trái để chuyển video.', updated: 3 },
    { id: 'peppa', title: 'Heo Peppa – Hoạt hình tiếng Việt', youtube: 'jTh2HlDNAJ0', channel: 'Heo Peppa Tiếng Việt – Chính Thức', description: 'Cùng xem những câu chuyện của Peppa và gia đình bằng tiếng Việt từ kênh chính thức.', updated: 2 },
    { id: 'bunny', title: 'Big Buck Bunny – Chú thỏ vui nhộn', video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', channel: 'Blender Foundation · Phim mẫu không lời', description: 'Phim hoạt hình mẫu không lời, dùng thẻ video HTML5 với các nút điều khiển, toàn màn hình và tải theo nhu cầu.', updated: 1 }
];
let saved = {};
try { saved = JSON.parse(localStorage.getItem('cartoon-state') || '{}') || {}; } catch (_) {}
const favorites = new Set(Array.isArray(saved.favorites) ? saved.favorites : []);
const views = saved.views && typeof saved.views === 'object' ? saved.views : {};
let selected = films[0];
let filter = 'all';
const list = document.getElementById('video-list');
const favorite = document.getElementById('favorite');
function persist() {
    try { localStorage.setItem('cartoon-state', JSON.stringify({ favorites: [...favorites], views })); } catch (_) {}
}
function normalize(text) { return text.toLocaleLowerCase('vi').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd'); }
function renderList() {
    const query = normalize(document.getElementById('search').value.trim());
    const visible = films.filter(f => normalize(f.title).includes(query) && (filter !== 'favorites' || favorites.has(f.id)));
    const popular = document.getElementById('sort').value === 'views';
    visible.sort((a, b) => popular ? (views[b.id] || 0) - (views[a.id] || 0) || b.updated - a.updated : b.updated - a.updated);
    list.replaceChildren();
    visible.forEach(film => {
        const button = document.createElement('button');
        button.className = 'card' + (film.id === selected.id ? ' selected' : '');
        button.setAttribute('aria-pressed', String(film.id === selected.id));
        const image = document.createElement('img');
        image.src = film.youtube ? `https://i.ytimg.com/vi/${film.youtube}/hqdefault.jpg` : 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg';
        image.alt = film.title;
        image.loading = 'lazy';
        const title = document.createElement('strong'); title.textContent = film.title;
        const meta = document.createElement('small'); meta.textContent = `${film.channel} · ${views[film.id] || 0} lượt chọn trên thiết bị này`;
        button.append(image, title, meta);
        button.addEventListener('click', () => selectFilm(film, true));
        list.append(button);
    });
    document.getElementById('empty').hidden = visible.length > 0;
}
function renderFavorite() {
    const active = favorites.has(selected.id);
    favorite.textContent = active ? '♥ Đã yêu thích' : '♡ Yêu thích';
    favorite.setAttribute('aria-pressed', String(active));
}
function selectFilm(film, count = false) {
    selected = film;
    if (count) { views[film.id] = (views[film.id] || 0) + 1; persist(); }
    const player = document.getElementById('player');
    const oldVideo = player.querySelector('video'); if (oldVideo) oldVideo.pause();
    player.replaceChildren();
    if (film.youtube) {
        const frame = document.createElement('iframe');
        frame.src = `https://www.youtube-nocookie.com/embed/${film.youtube}?rel=0`;
        frame.title = film.title;
        frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        frame.allowFullscreen = true;
        frame.referrerPolicy = 'strict-origin-when-cross-origin';
        player.append(frame);
    } else {
        const video = document.createElement('video');
        video.controls = true; video.preload = 'metadata'; video.playsInline = true;
        video.poster = 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg';
        const source = document.createElement('source'); source.src = film.video; source.type = 'video/mp4';
        video.append(source, document.createTextNode('Trình duyệt không hỗ trợ video HTML5.'));
        player.append(video);
    }
    document.getElementById('video-title').textContent = film.title;
    document.getElementById('channel').textContent = film.channel;
    document.getElementById('description').textContent = film.description;
    document.getElementById('source').href = film.youtube ? `https://www.youtube.com/watch?v=${film.youtube}` : film.video;
    renderFavorite(); renderList();
}
favorite.addEventListener('click', () => {
    if (favorites.has(selected.id)) favorites.delete(selected.id); else favorites.add(selected.id);
    persist(); renderFavorite(); renderList();
});
document.getElementById('search').addEventListener('input', renderList);
document.getElementById('sort').addEventListener('change', renderList);
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(item => item.classList.toggle('active', item === button));
    const info = document.getElementById('info');
    info.hidden = filter !== 'characters' && filter !== 'about';
    info.textContent = filter === 'characters' ? 'Nhân vật: Peppa, George, bố mẹ Peppa và chú thỏ Big Buck Bunny.' : 'Trang bài tập tổng hợp video từ nguồn gốc. Trang không đặt quảng cáo; quảng cáo và chất lượng của video YouTube do nền tảng quyết định. Lượt xem là số lần chọn trên thiết bị này, không phải thống kê YouTube.';
    renderList();
}));
selectFilm(selected);
