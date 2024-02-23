const certificationStates = {
  Aprobado: 5,
  PendienteDeAprobacion: 3,
  Rechazado: 7,
  Anulado: 6
};

const getDescription = (state) => {
  switch (state) {
    case certificationStates.Aprobado:
      return "Aprobado";
    case certificationStates.PendienteDeAprobacion:
      return "Pendiente de aprobación";
    case certificationStates.Rechazado:
      return "Rechazado";
    case certificationStates.Anulado:
      return "Anulado";
    default:
      return "";
  }
}

const getStatus = (status) => {
  switch (status) {
    case "03":
      return certificationStates.PendienteDeAprobacion;
    case "05":
      return certificationStates.Aprobado;
    case "06":
      return certificationStates.Anulado;
    case "07":
      return certificationStates.Rechazado;
    default:
      return 0;
  }
}

module.exports = { certificationStates, getDescription, getStatus}