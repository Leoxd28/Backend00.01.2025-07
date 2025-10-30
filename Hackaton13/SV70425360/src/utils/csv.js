import { Readable } from 'stream';
export function streamCSV(res, rows, headers) {
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="export.csv"');
  const head = headers.join(',') + '\n';
  const body = rows.map(r => headers.map(h => JSON.stringify(r[h] ?? '')).join(',')).join('\n') + '\n';
  const stream = Readable.from(head + body);
  stream.pipe(res);
}
