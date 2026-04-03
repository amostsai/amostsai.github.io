export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders()
      });
    }

    if (request.method !== 'POST') {
      return json({ ok: false, error: 'method_not_allowed' }, 405);
    }

    try {
      const body = await request.json();
      const name = safe(body.name);
      const email = safe(body.email);
      const phone = safe(body.phone);
      const message = safe(body.message);
      const source = safe(body.source);
      const submittedAt = safe(body.submittedAt);

      if (!name || !email || !message) {
        return json({ ok: false, error: 'missing_required_fields' }, 400);
      }

      const content = [
        '📩 **官網聯絡表單新訊息**',
        '',
        `**姓名**：${name}`,
        `**電話**：${phone || '（未填）'}`,
        `**Email**：${email}`,
        '',
        '**需求內容**',
        message,
        '',
        `**來源頁面**：${source || '（未知）'}`,
        `**送出時間**：${submittedAt || new Date().toISOString()}`
      ].join('\n');

      const resp = await fetch(env.DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      });

      if (!resp.ok) {
        const t = await resp.text();
        return json({ ok: false, error: 'discord_failed', detail: t.slice(0, 400) }, 502);
      }

      return json({ ok: true }, 200);
    } catch (err) {
      return json({ ok: false, error: 'bad_request' }, 400);
    }
  }
};

function safe(v) {
  if (typeof v !== 'string') return '';
  return v.trim().replace(/\r/g, '').slice(0, 3000);
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
}

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...corsHeaders()
    }
  });
}
