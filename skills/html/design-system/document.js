// 用語欄を閉じたときの状態と、印刷前後の折りたたみ状態を扱う。
(() => {
  function initialize() {
    const controls = [...document.querySelectorAll('.mb-glossary-toggle')];

    for (const button of controls) {
      const glossary = document.getElementById(button.getAttribute('aria-controls'));
      if (!glossary) continue;

      function update() {
        button.setAttribute('aria-expanded', String(!glossary.hidden));
        button.textContent = glossary.hidden ? '用語欄を開く' : '用語欄を閉じる';
      }

      // 再読込のたびに、用語欄が開いている状態から始める。
      glossary.hidden = false;
      button.hidden = false;
      update();
      button.addEventListener('click', () => {
        glossary.hidden = !glossary.hidden;
        update();
      });
    }

    function revealAnchor() {
      let id;
      try {
        id = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        return;
      }
      const target = id && document.getElementById(id);
      if (!target) return;
      let changed = false;
      for (let parent = target.parentElement; parent; parent = parent.parentElement) {
        if (parent.matches('details') && !parent.open) {
          parent.open = true;
          changed = true;
        }
      }
      const glossary = target.closest('.mb-glossary');
      if (glossary?.hidden) {
        const button = controls.find(control => control.getAttribute('aria-controls') === glossary.id);
        if (button) {
          button.click();
          changed = true;
        }
      }
      if (changed) target.scrollIntoView();
    }

    window.addEventListener('hashchange', revealAnchor);
    revealAnchor();

    let closedDetails = null;
    window.addEventListener('beforeprint', () => {
      if (closedDetails !== null) return;
      closedDetails = [...document.querySelectorAll('details.mb-details:not([open])')];
      closedDetails.forEach(details => { details.open = true; });
    });
    window.addEventListener('afterprint', () => {
      closedDetails?.forEach(details => { details.open = false; });
      closedDetails = null;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();
