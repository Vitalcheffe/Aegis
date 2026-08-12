/* AEGIS — Shared site behavior
   Nav scroll state, scroll reveal, active link, viz filter.
*/

(function(){
  // ─── Nav scroll state ───
  const nav = document.querySelector('nav');
  // No background change needed — nav is already blur-white

  // ─── Active nav link ───
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if(href === path || (path === '' && href === 'index.html')){
      a.classList.add('active');
    }
  });

  // ─── Mobile nav toggle ───
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if(toggle && links){
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
  }

  // ─── Scroll reveal ───
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:0.12, rootMargin:'0px 0px -60px 0px'});

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ─── Viz gallery filter ───
  const filterBtns = document.querySelectorAll('.filter-btn');
  const vizCards = document.querySelectorAll('.viz-card');
  if(filterBtns.length){
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.cat;
        vizCards.forEach(card => {
          if(cat === 'all' || card.dataset.cat === cat){
            card.style.display = '';
            card.style.opacity = '0';
            setTimeout(() => {
              card.style.transition = 'opacity 0.4s';
              card.style.opacity = '1';
            }, 50);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
})();
