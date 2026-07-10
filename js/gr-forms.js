/* Invio dei form senza lasciare la pagina.
   Abilita l'AJAX su ogni <form data-ajax-endpoint="...">.
   Senza JS il form fa il POST classico e _next porta a grazie.html. */
(function () {
  if (!window.fetch) return;

  function labelOf(btn) { return btn.tagName === 'INPUT' ? btn.value : btn.textContent; }
  function setLabel(btn, text) {
    if (btn.tagName === 'INPUT') btn.value = text; else btn.textContent = text;
  }

  function enhance(form) {
    var endpoint = form.getAttribute('data-ajax-endpoint');
    var button = form.querySelector('[type="submit"]');
    if (!endpoint || !button) return;

    var status = form.querySelector('[data-form-status]');
    if (!status) {
      status = document.createElement('p');
      status.setAttribute('data-form-status', '');
      status.className = 'gr-status';
      form.appendChild(status);
    }
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    status.hidden = true;

    var idle = labelOf(button);
    var okMsg = form.getAttribute('data-ok-message') || 'Messaggio inviato. Ti rispondiamo presto.';

    function show(msg, kind) {
      status.textContent = msg;
      status.className = 'gr-status is-' + kind;
      status.hidden = false;
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (button.disabled) return;

      var data = new FormData(form);
      data.delete('_next');    // solo per il fallback senza JS
      data.delete('_captcha');

      button.disabled = true;
      setLabel(button, 'Invio in corso…');
      status.hidden = true;

      fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
        .then(function (res) {
          return res.json().catch(function () { return {}; })
            .then(function (body) { return { ok: res.ok, body: body }; });
        })
        .then(function (r) {
          // formspree: res.ok  |  formsubmit: body.success === "true"
          var sent = r.ok && r.body.success !== 'false' && r.body.success !== false;
          if (!sent) {
            var errs = r.body && r.body.errors;
            throw new Error(
              errs && errs.length
                ? errs.map(function (e) { return e.message; }).join('. ')
                : (r.body && r.body.message) || 'Non siamo riusciti a inviare il messaggio.'
            );
          }
          form.reset();
          show(okMsg, 'ok');
          setLabel(button, 'Inviato');
        })
        .catch(function (err) {
          show(err.message + ' Scrivici a info@gorahstudio.com e ci pensiamo noi.', 'ko');
          button.disabled = false;
          setLabel(button, idle);
        });
    });
  }

  var forms = document.querySelectorAll('form[data-ajax-endpoint]');
  for (var i = 0; i < forms.length; i++) enhance(forms[i]);
})();
