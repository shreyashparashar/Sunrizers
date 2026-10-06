/* Sunrizers Engineers - site scripts (v1.2, 2018) */
(function () {
	// ---- Banner slider ----
	var slides = document.querySelectorAll('#slider .slide');
	var pager = document.querySelector('#slider .pager');
	if (slides.length && pager) {
		var cur = 0, timer;
		for (var i = 0; i < slides.length; i++) {
			var b = document.createElement('button');
			b.type = 'button';
			b.textContent = i + 1;
			b.setAttribute('aria-label', 'Show banner ' + (i + 1));
			(function (n) { b.onclick = function () { show(n); restart(); }; })(i);
			pager.appendChild(b);
		}
		var btns = pager.querySelectorAll('button');
		function show(n) {
			slides[cur].className = 'slide'; btns[cur].className = '';
			cur = n;
			slides[cur].className = 'slide on'; btns[cur].className = 'on';
		}
		function restart() {
			clearInterval(timer);
			timer = setInterval(function () { show((cur + 1) % slides.length); }, 4500);
		}
		show(0); restart();
	}

	// ---- Mobile menu ----
	var tog = document.querySelector('#nav .navtoggle');
	if (tog) {
		tog.onclick = function () {
			var ul = document.querySelector('#nav ul');
			var open = ul.className.indexOf('open') > -1;
			ul.className = open ? '' : 'open';
			tog.setAttribute('aria-expanded', open ? 'false' : 'true');
		};
	}

	// ---- Lightbox ----
	var lb = document.getElementById('lightbox');
	if (lb) {
		var lbImg = lb.querySelector('img'), lbCap = lb.querySelector('span');
		var opener = null;
		document.addEventListener('click', function (e) {
			var t = e.target.closest ? e.target.closest('[data-zoom]') : null;
			if (!t) return;
			e.preventDefault();
			opener = t;
			lbImg.src = t.getAttribute('data-zoom');
			lbImg.alt = t.getAttribute('data-cap') || '';
			lbCap.textContent = t.getAttribute('data-cap') || '';
			lb.className = 'on';
			lb.querySelector('button').focus();
		});
		function closeLb() { lb.className = ''; if (opener && opener.focus) opener.focus(); }
		lb.querySelector('button').onclick = closeLb;
		lb.onclick = function (e) { if (e.target === lb) closeLb(); };
		document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && lb.className === 'on') closeLb(); });
	}

	// ---- Gallery filter tabs ----
	var tabs = document.querySelectorAll('.tabs button');
	for (var t = 0; t < tabs.length; t++) {
		tabs[t].onclick = function () {
			var f = this.getAttribute('data-f');
			for (var k = 0; k < tabs.length; k++) tabs[k].className = '';
			this.className = 'on';
			var items = document.querySelectorAll('.gallery a');
			for (var j = 0; j < items.length; j++) {
				items[j].style.display = (f === 'all' || items[j].getAttribute('data-c') === f) ? '' : 'none';
			}
		};
	}

	// ---- Visitor counter (local only) ----
	var c = document.getElementById('hits');
	if (c) {
		var base = 48213, n = base;
		try {
			n = parseInt(localStorage.getItem('se_hits') || base, 10) + 1;
			localStorage.setItem('se_hits', n);
		} catch (err) { n = base; }
		var s = ('000000' + n).slice(-6), html = '';
		for (var d = 0; d < s.length; d++) html += '<span>' + s.charAt(d) + '</span>';
		c.innerHTML = html;
	}

	// ---- Back to top ----
	var top = document.getElementById('totop');
	if (top) {
		window.addEventListener('scroll', function () { top.className = window.scrollY > 400 ? 'on' : ''; });
	}

	// ---- Enquiry form check ----
	var forms = document.querySelectorAll('form.enq');
	for (var f = 0; f < forms.length; f++) {
		forms[f].onsubmit = function () {
			var req = this.querySelectorAll('[required]');
			for (var r = 0; r < req.length; r++) {
				if (!req[r].value.replace(/\s/g, '')) {
					alert('Please fill: ' + (req[r].getAttribute('data-name') || 'all required fields'));
					req[r].focus();
					return false;
				}
			}
			return true;
		};
	}
})();
