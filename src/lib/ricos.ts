type RicosNode = {
  type: string;
  nodes?: RicosNode[];
  textData?: { text?: string };
  headingData?: { level?: number };
};

function escape(s: string): string {
  return s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
}

function renderInline(nodes: RicosNode[] = []): string {
  return nodes.map(n => {
    if (n.type === 'TEXT') return escape(n.textData?.text ?? '');
    return renderInline(n.nodes);
  }).join('');
}

export function ricosToHtml(content: { nodes?: RicosNode[] } | null | undefined): string {
  if (!content?.nodes) return '';
  return content.nodes.map(n => {
    switch (n.type) {
      case 'PARAGRAPH':
        return `<p>${renderInline(n.nodes)}</p>`;
      case 'HEADING': {
        const level = Math.min(Math.max(n.headingData?.level ?? 2, 2), 4);
        return `<h${level}>${renderInline(n.nodes)}</h${level}>`;
      }
      case 'BLOCKQUOTE':
        return `<blockquote>${ricosToHtml({ nodes: n.nodes })}</blockquote>`;
      case 'BULLETED_LIST':
        return `<ul>${(n.nodes ?? []).map(li => `<li>${ricosToHtml({ nodes: li.nodes })}</li>`).join('')}</ul>`;
      case 'ORDERED_LIST':
        return `<ol>${(n.nodes ?? []).map(li => `<li>${ricosToHtml({ nodes: li.nodes })}</li>`).join('')}</ol>`;
      default:
        return renderInline(n.nodes);
    }
  }).join('\n');
}
