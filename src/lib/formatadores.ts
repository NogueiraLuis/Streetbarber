export function formatarDataHora(dataHoraString: string) {
  if (!dataHoraString) return "";

  // Separa "2026-10-25" de "20:50:00"
  const [dataPart, horaPart] = dataHoraString.split("T");
  const [ano, mes, dia] = dataPart.split("-");
  const horaMinuto = horaPart.substring(0, 5); // Pega apenas HH:mm

  return `${dia}/${mes}/${ano} às ${horaMinuto}`;
}