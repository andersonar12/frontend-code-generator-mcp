import { CSSUtilitiesArgs, MCPResponse } from "../utils/types.js";

export class CSSGenerator {
  private static utilities: Record<string, string> = {
    flexbox: `/* 🔧 Flexbox Utilities */
.flex { display: flex; }
.flex-col { flex-direction: column; }
.flex-row { flex-direction: row; }
.items-center { align-items: center; }
.items-start { align-items: flex-start; }
.items-end { align-items: flex-end; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.justify-around { justify-content: space-around; }
.flex-wrap { flex-wrap: wrap; }
.flex-nowrap { flex-wrap: nowrap; }
.flex-1 { flex: 1; }
.gap-1 { gap: 0.25rem; }
.gap-2 { gap: 0.5rem; }
.gap-4 { gap: 1rem; }`,

    grid: `/* 📊 Grid Utilities */
.grid { display: grid; }
.grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
.col-span-1 { grid-column: span 1; }
.col-span-2 { grid-column: span 2; }
.col-span-3 { grid-column: span 3; }
.gap-1 { gap: 0.25rem; }
.gap-2 { gap: 0.5rem; }
.gap-4 { gap: 1rem; }`,

    buttons: `/* 🔘 Button Utilities */
.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}
.btn-primary:hover { background-color: #0056b3; }

.btn-secondary {
  background-color: #6c757d;
  color: white;
}
.btn-secondary:hover { background-color: #545b62; }

.btn-success {
  background-color: #28a745;
  color: white;
}
.btn-success:hover { background-color: #1e7e34; }

.btn-danger {
  background-color: #dc3545;
  color: white;
}
.btn-danger:hover { background-color: #c82333; }

.btn-outline {
  background-color: transparent;
  border: 2px solid #007bff;
  color: #007bff;
}
.btn-outline:hover {
  background-color: #007bff;
  color: white;
}

.btn-sm { padding: 0.25rem 0.5rem; font-size: 0.875rem; }
.btn-lg { padding: 0.75rem 1.5rem; font-size: 1.125rem; }`,

    cards: `/* 🃏 Card Utilities */
.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: box-shadow 0.2s;
}

.card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.card-header {
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
  background-color: #f8f9fa;
}

.card-body {
  padding: 1rem;
}

.card-footer {
  padding: 1rem;
  border-top: 1px solid #e9ecef;
  background-color: #f8f9fa;
}

.card-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: bold;
}

.card-text {
  margin: 0 0 1rem 0;
  color: #6c757d;
}`,
  };

  static generateUtilities(args: CSSUtilitiesArgs): MCPResponse {
    const { type } = args;

    const css = this.utilities[type] || "Tipo de utilidad no encontrado";
    const result = `📁 **${type}-utilities.css**\n\`\`\`css\n${css}\n\`\`\``;

    return {
      content: [{ type: "text", text: result }],
    };
  }
}
