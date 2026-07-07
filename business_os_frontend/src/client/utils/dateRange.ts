export function getDateRangeBounds(range: string): { from: string; to: string } {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const fmt = (d: Date) => d.toISOString().split('T')[0];

  switch (range) {
    case 'this_fiscal_year': {
      const fyStart = month >= 3 ? year : year - 1;
      return { from: `${fyStart}-04-01`, to: `${fyStart + 1}-03-31` };
    }
    case 'last_fiscal_year': {
      const fyStart = (month >= 3 ? year : year - 1) - 1;
      return { from: `${fyStart}-04-01`, to: `${fyStart + 1}-03-31` };
    }
    case 'this_quarter': {
      const qStart = Math.floor(month / 3) * 3;
      return { from: fmt(new Date(year, qStart, 1)), to: fmt(new Date(year, qStart + 3, 0)) };
    }
    case 'this_month':
    default:
      return { from: fmt(new Date(year, month, 1)), to: fmt(new Date(year, month + 1, 0)) };
  }
}