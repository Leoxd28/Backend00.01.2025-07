export function parsePagination(qs) {
  const page = Math.max(1, parseInt(qs.page ?? '1', 10));
  const pageSize = Math.min(100, Math.max(1, parseInt(qs.pageSize ?? '10', 10)));
  const offset = (page - 1) * pageSize;
  return { page, pageSize, offset, limit: pageSize };
}
