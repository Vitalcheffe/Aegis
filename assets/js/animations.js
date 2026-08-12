/* AEGIS — Light canvas animations
   Navy strokes on transparent bg. Subtle, editorial.
   No neon, no fluo.
*/

(function(){
  // ─── Vector field flow (page headers) ───
  document.querySelectorAll('[data-canvas="vector-field"]').forEach(canvas => {
    const ctx = canvas.getContext('2d');
    let w, h;
    function resize(){
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    const N = 80;
    for(let i=0; i<N; i++){
      particles.push({
        x: Math.random()*w,
        y: Math.random()*h,
        vx:0, vy:0,
        life: Math.random()*100,
        maxLife: 100 + Math.random()*100
      });
    }

    let t = 0;
    function field(x, y){
      const angle = Math.sin(x*0.005 + t*0.3) + Math.cos(y*0.005 + t*0.2);
      return {x: Math.cos(angle)*1.0, y: Math.sin(angle)*1.0};
    }

    function animate(){
      ctx.fillStyle = 'rgba(255,255,255,0.06)';
      ctx.fillRect(0,0,w,h);
      t += 0.01;

      particles.forEach(p => {
        const f = field(p.x, p.y);
        p.vx = p.vx*0.95 + f.x*0.1;
        p.vy = p.vy*0.95 + f.y*0.1;
        const px = p.x, py = p.y;
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        if(p.life > p.maxLife || p.x < 0 || p.x > w || p.y < 0 || p.y > h){
          p.x = Math.random()*w;
          p.y = Math.random()*h;
          p.life = 0;
          p.vx = 0; p.vy = 0;
        }

        const alpha = Math.sin((p.life/p.maxLife)*Math.PI) * 0.25;
        ctx.strokeStyle = `rgba(0,31,63,${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      });
      requestAnimationFrame(animate);
    }
    animate();
  });

  // ─── UKF trajectory mini-animation ───
  document.querySelectorAll('[data-canvas="ukf-mini"]').forEach(canvas => {
    const ctx = canvas.getContext('2d');
    let w, h;
    function resize(){
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    let t = 0;
    const trail = [];
    const measTrail = [];

    function animate(){
      ctx.fillStyle = 'rgba(250,251,252,0.1)';
      ctx.fillRect(0,0,w,h);
      t += 0.02;

      const tx = w * 0.1 + (t * 30) % (w * 0.8);
      const ty = h * 0.5 + Math.sin(t * 0.8) * h * 0.2;

      trail.push({x:tx, y:ty});
      if(trail.length > 80) trail.shift();

      if(t % 0.1 < 0.02){
        measTrail.push({x:tx + (Math.random()-0.5)*15, y:ty + (Math.random()-0.5)*15});
        if(measTrail.length > 40) measTrail.shift();
      }

      // Measurements — muted
      ctx.fillStyle = 'rgba(107,122,141,0.4)';
      measTrail.forEach(m => {
        ctx.beginPath();
        ctx.arc(m.x, m.y, 2, 0, Math.PI*2);
        ctx.fill();
      });

      // True trail — navy
      ctx.strokeStyle = '#001F3F';
      ctx.lineWidth = 2;
      ctx.beginPath();
      trail.forEach((p,i) => {
        if(i===0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();

      // Current position
      ctx.fillStyle = '#001F3F';
      ctx.beginPath();
      ctx.arc(tx, ty, 4, 0, Math.PI*2);
      ctx.fill();

      requestAnimationFrame(animate);
    }
    animate();
  });

  // ─── BFT consensus mini-animation ───
  document.querySelectorAll('[data-canvas="bft-mini"]').forEach(canvas => {
    const ctx = canvas.getContext('2d');
    let w, h;
    function resize(){
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const nodes = [];
    const N = 8;
    for(let i=0; i<N; i++){
      const angle = (i/N) * Math.PI * 2 - Math.PI/2;
      nodes.push({
        x: w/2 + Math.cos(angle) * Math.min(w,h)*0.3,
        y: h/2 + Math.sin(angle) * Math.min(w,h)*0.3,
        type: i < 6 ? 'honest' : 'faulty',
      });
    }

    let t = 0;
    function animate(){
      ctx.fillStyle = 'rgba(250,251,252,0.15)';
      ctx.fillRect(0,0,w,h);
      t += 0.02;

      // Edges
      ctx.strokeStyle = 'rgba(0,31,63,0.12)';
      ctx.lineWidth = 0.5;
      for(let i=0; i<N; i++){
        for(let j=i+1; j<N; j++){
          if(nodes[i].type === 'faulty' && nodes[j].type === 'faulty') continue;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }

      // Animated message
      const msgProgress = (t * 0.5) % 1;
      const senderIdx = Math.floor((t * 0.1) % N);
      const receiverIdx = (senderIdx + 1) % N;
      if(nodes[senderIdx].type !== 'faulty' && nodes[receiverIdx].type !== 'faulty'){
        const mx = nodes[senderIdx].x + (nodes[receiverIdx].x - nodes[senderIdx].x) * msgProgress;
        const my = nodes[senderIdx].y + (nodes[receiverIdx].y - nodes[senderIdx].y) * msgProgress;
        ctx.fillStyle = '#001F3F';
        ctx.beginPath();
        ctx.arc(mx, my, 3, 0, Math.PI*2);
        ctx.fill();
      }

      // Nodes
      nodes.forEach((n, i) => {
        const pulse = 1 + Math.sin(t*2 + i)*0.1;
        const r = (n.type === 'faulty' ? 5 : 7) * pulse;
        ctx.fillStyle = n.type === 'faulty' ? 'rgba(139,26,26,0.4)' : '#001F3F';
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI*2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }
    animate();
  });
})();
