export async function stream(req, res) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.flushHeaders?.();
  for (let i=1;i<=5;i++) {
    res.write(`data: ${JSON.stringify({ tick: i })}\n\n`);
    await new Promise(r => setTimeout(r, 1000));
  }
  res.end();
}
