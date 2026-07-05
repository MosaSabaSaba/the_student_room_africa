function showTab(id, btn) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    btn.classList.add('active');
}

(function buildOriginDiagram() {
const svg = document.getElementById('origin-svg');
const W = 520, H = 520;
const ox = 260, oy = 260, sc = 40;

function px(x) { return ox + x * sc; }
function py(y) { return oy - y * sc; }

const triangles = {
    '90cw':  { orig: [[2,3],[4,1],[1,1]], img: [[3,-2],[1,-4],[1,-1]], label: "90° clockwise → (x,y) → (y,−x)", color: '#00e5b0' },
    '90acw': { orig: [[2,3],[4,1],[1,1]], img: [[-3,2],[-1,4],[-1,1]], label: "90° anticlockwise → (x,y) → (−y,x)", color: '#00e5b0' },
    '180':   { orig: [[2,3],[4,1],[1,1]], img: [[-2,-3],[-4,-1],[-1,-1]], label: "180° → (x,y) → (−x,−y)", color: '#ffcc44' },
    '270cw': { orig: [[2,3],[4,1],[1,1]], img: [[-3,2],[-1,4],[-1,1]], label: "270° clockwise = 90° anticlockwise → (x,y) → (−y,x)", color: '#f06292' },
};

const labels = ['P','Q','R'];

function draw(key) {
    const d = triangles[key];
    let g = `<defs>
        <marker id="axo" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#ffffff"/>
        </marker>
    </defs>`;

    // grid
    g += `<g stroke='#ffff' stroke-width='0.5'>`;
    for (let x = 0; x <= 12; x++) g += `<line class="grid-line" x1='${20+x*40}' y1='20' x2='${20+x*40}' y2='500'/>`;
    for (let y = 0; y <= 12; y++) g += `<line class="grid-line" x1='20' y1='${20+y*40}' x2='500' y2='${20+y*40}'/>`;
    g += `</g>`;

    // axes
    g += `<line x1='16' y1='${oy}' x2='504' y2='${oy}' stroke='#ffff' stroke-width='1.3' marker-end='url(#axo)'/>`;
    g += `<line x1='${ox}' y1='504' x2='${ox}' y2='14' stroke='#ffff' stroke-width='1.3' marker-end='url(#axo)'/>`;

    // numbers
    g += `<g fill='#ffff' font-size='11' text-anchor='middle'>`;
    for (let i = -5; i <= 5; i++) if (i !== 0) {
    g += `<text x='${px(i)}' y='${oy + 14}'>${i}</text>`;
    g += `<text x='${ox - 14}' y='${py(i) + 4}'>${i}</text>`;
    }
    g += `</g>`;

    // original
    const op = d.orig;
    g += `<polygon points='${op.map(p => px(p[0])+','+py(p[1])).join(' ')}' fill='rgba(91,163,245,0.18)' stroke='#5ba3f5' stroke-width='2'/>`;
    op.forEach((p, i) => {
    g += `<circle cx='${px(p[0])}' cy='${py(p[1])}' r='4' fill='#5ba3f5'/>`;
    g += `<text x='${px(p[0])+8}' y='${py(p[1])-6}' fill='#5ba3f5' font-size='13' font-weight='600'>${labels[i]}(${p[0]},${p[1]})</text>`;
    });

    // image
    const ip = d.img;
    g += `<polygon points='${ip.map(p => px(p[0])+','+py(p[1])).join(' ')}' fill='rgba(${d.color === '#00e5b0' ? '0,229,176' : d.color === '#ffcc44' ? '255,204,68' : '240,98,146'},0.12)' stroke='${d.color}' stroke-width='2' stroke-dasharray='7,3'/>`;
    ip.forEach((p, i) => {
    g += `<circle cx='${px(p[0])}' cy='${py(p[1])}' r='4' fill='${d.color}'/>`;
    g += `<text x='${px(p[0])+8}' y='${py(p[1])-6}' fill='${d.color}' font-size='13' font-weight='600'>${labels[i]}′(${p[0]},${p[1]})</text>`;
    });

    // origin dot
    g += `<circle cx='${ox}' cy='${oy}' r='5' fill='#ffcc44'/><text x='${ox+7}' y='${oy-6}' fill='#ffcc44' font-size='11'>(0,0)</text>`;

    svg.innerHTML = g;
    document.getElementById('origin-caption').textContent = `Triangle PQR (blue) → P′Q′R′ (image) — ${d.label}`;
}

document.getElementById('sel-angle').addEventListener('change', e => draw(e.target.value));
draw('90cw');
})();