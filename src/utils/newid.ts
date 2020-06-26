let idCounter = 1234;

function newId() {
  idCounter++;
  return `specialId${String(idCounter)}`;
}

export default newId;
