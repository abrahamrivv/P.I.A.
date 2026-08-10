const SHEET_NAME = "Leads";

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error(`No existe la hoja ${SHEET_NAME}`);

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
