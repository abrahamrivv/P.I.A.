const HEADERS = [
  "Fecha", "Nombre", "Apellidos", "Correo empresarial", "Rol", "País",
  "Teléfono", "Tamaño de empresa", "Empresa", "LinkedIn", "Cohort",
  "Cómo nos conoció", "Mayor reto operativo",
];

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) throw new Error("Este script debe crearse desde Leads PIA");
  const sheet = spreadsheet.getSheets()[0];

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }

  sheet.appendRow([
    data.fecha || new Date().toISOString(),
    data.nombre || "",
    data.apellidos || "",
    data.correo || "",
    data.rol || "",
    data.pais || "",
    data.telefono || "",
    data.tamano || "",
    data.empresa || "",
    data.linkedin || "",
    data.nivel || "",
    data.origen || "",
    data.reto || "",
  ]);

  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
