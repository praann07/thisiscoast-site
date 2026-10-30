// Home page behaviour: sticky header, the rider demo, the location-blur demo.
// Nothing here talks to a server. The riders are samples.
(function () {
  'use strict';

  // ---- header gets a background once you scroll ----
  var head = document.getElementById('head');
  function onScroll() { head.classList.toggle('is-stuck', window.scrollY > 24); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- rider demo: pick a rider, send a request, see the number appear ----
  var demo = document.getElementById('demo');
  var riders = Array.prototype.slice.call(demo.querySelectorAll('.rider'));
  var emptyView = demo.querySelector('[data-view="empty"]');
  var detailView = demo.querySelector('[data-view="detail"]');
  var field = function (name) { return detailView.querySelector('[data-f="' + name + '"]'); };
  var timer = null;
  var current = null;

  function setNote(html) {
    var note = field('note');
    note.textContent = '';
    html.forEach(function (part) {
      if (part.strong) {
        var s = document.createElement('strong');
        s.textContent = part.strong;
        note.appendChild(s);
      } else {
        note.appendChild(document.createTextNode(part));
      }
    });
  }

  function show(rider) {
    clearTimeout(timer);
    current = rider;
    var d = rider.dataset;
    riders.forEach(function (r) { r.setAttribute('aria-pressed', String(r === rider)); });
    demo.classList.add('has-pick');
    emptyView.hidden = true;
    detailView.hidden = false;
    field('initial').textContent = d.name.charAt(0);
    field('name').textContent = d.name;
    field('tag').hidden = !d.tag;
    field('to').textContent = d.to;
    field('at').textContent = d.at;
    field('seats').textContent = d.seats;
    setNote(['Chat opens when ' + d.name + ' accepts. Numbers stay private. You settle the fare directly.']);
    var action = field('action');
    action.disabled = false;
    action.className = 'btn btn--teal btn--block';
    action.textContent = 'Request to share ride';
    action.dataset.state = 'idle';
  }

  function reset() {
    clearTimeout(timer);
    current = null;
    riders.forEach(function (r) { r.setAttribute('aria-pressed', 'false'); });
    demo.classList.remove('has-pick');
    detailView.hidden = true;
    emptyView.hidden = false;
  }

  function onAction() {
    var action = field('action');
    var state = action.dataset.state;
    if (state === 'idle' && current) {
      var d = current.dataset;
      action.disabled = true;
      action.textContent = 'Request sent';
      action.dataset.state = 'sending';
      setNote(['Waiting for ' + d.name + ' to reply…']);
      timer = setTimeout(function () {
        setNote([d.name + ' accepted. ', { strong: 'Chat is open.' }, ' Numbers stay private unless someone chooses to share theirs.']);
        action.disabled = false;
        action.className = 'btn btn--line btn--block';
        action.textContent = 'Try another rider';
        action.dataset.state = 'done';
      }, 1300);
    } else if (state === 'done') {
      reset();
    }
  }

  riders.forEach(function (r) { r.addEventListener('click', function () { show(r); }); });
  field('action').addEventListener('click', onAction);

  // ---- blur demo: re-roll a saved position 60 to 180 m from the real one ----
  var saved = document.getElementById('fuzz-saved');
  var read = document.getElementById('fuzz-read');
  var rollBtn = document.getElementById('fuzz-roll');
  var PX_PER_METRE = 92 / 180; // outer ring is 180 m and 92 units wide in the SVG

  function roll() {
    var metres = 60 + Math.random() * 120;
    var angle = Math.random() * Math.PI * 2;
    var r = metres * PX_PER_METRE;
    saved.style.transform = 'translate(' + (Math.cos(angle) * r).toFixed(1) + 'px,' + (Math.sin(angle) * r).toFixed(1) + 'px)';
    read.textContent = 'Saved about ' + Math.round(metres) + ' m from the real spot.';
  }
  rollBtn.addEventListener('click', roll);
  roll();
})();
