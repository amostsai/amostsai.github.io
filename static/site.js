(function () {
  const btn = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');

  if (btn && menu) {
    btn.addEventListener('click', function () {
      menu.classList.toggle('hidden');
    });
  }

  const yearNode = document.getElementById('year');
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  const countNodes = document.querySelectorAll('.countup');
  countNodes.forEach((node) => {
    const target = Number(node.dataset.target || 0);
    const suffix = node.dataset.suffix || '';
    let n = 0;
    const step = Math.max(1, Math.ceil(target / 28));
    const tick = () => {
      n += step;
      if (n >= target) {
        node.textContent = `${target}${suffix}`;
      } else {
        node.textContent = `${n}${suffix}`;
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
  });

  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const endpoint = form.dataset.endpoint;

      if (!endpoint || endpoint.includes('YOUR-WORKER-URL')) {
        if (status) {
          status.textContent = '尚未設定送出端點，請先部署中繼 API。';
          status.className = 'text-xs text-rose-600';
        }
        return;
      }

      const payload = {
        name: document.getElementById('name')?.value?.trim() || '',
        email: document.getElementById('email')?.value?.trim() || '',
        phone: document.getElementById('phone')?.value?.trim() || '',
        message: document.getElementById('message')?.value?.trim() || '',
        source: window.location.href,
        submittedAt: new Date().toISOString()
      };

      try {
        if (status) {
          status.textContent = '送出中...';
          status.className = 'text-xs text-slate-500';
        }

        const resp = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!resp.ok) throw new Error('request failed');

        form.reset();
        if (status) {
          status.textContent = '已成功送出，我們會盡快與您聯繫。';
          status.className = 'text-xs text-emerald-600';
        }
      } catch (err) {
        if (status) {
          status.textContent = '送出失敗，請稍後再試或改用 LINE 聯繫。';
          status.className = 'text-xs text-rose-600';
        }
      }
    });
  }
})();
