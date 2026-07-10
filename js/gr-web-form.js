/* Invio del form Websites senza lasciare la pagina.
   Se JS non gira, il form fa il POST normale e _next riporta a grazie.html. */
(function () {
  var form = document.getElementById('gr-web-form');
  if (!form || !window.fetch) return;

  var status = document.getElementById('gr-web-status');
  var button = form.querySelector('button[type="submit"]');
  var idle = button.textContent;

  function show(msg, kind) {
    status.textContent = msg;
    status.className = 'gr-web__status is-' + kind;
    status.hidden = false;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (button.disabled) return;

    var data = new FormData(form);
    data.delete('_next'); // serve solo al fallback senza JS

    button.disabled = true;
    button.textContent = 'Invio in corso…';
    status.hidden = true;

    fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' }
    })
      .then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (body) {
          return { ok: res.ok, body: body };
        });
      })
      .then(function (r) {
        if (r.ok) {
          form.reset();
          show('Ricevuto. Ti mandiamo l’anteprima entro 48 ore.', 'ok');
          button.textContent = 'Richiesta inviata';
          return;
        }
        var detail = r.body && r.body.errors && r.body.errors.length
          ? r.body.errors.map(function (e) { return e.message; }).join('. ')
          : 'Non siamo riusciti a inviare la richiesta.';
        throw new Error(detail);
      })
      .catch(function (err) {
        show(err.message + ' Scrivici a info@gorah.com e ci pensiamo noi.', 'ko');
        button.disabled = false;
        button.textContent = idle;
      });
  });
})();
