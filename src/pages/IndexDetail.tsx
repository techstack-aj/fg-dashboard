import React from 'react';
// TODO: Importiere useParams und useNavigate von 'react-router-dom'
// TODO: Importiere useIndices aus dem Store, um Daten zu laden

const IndexDetail: React.FC = () => {
  // TODO: Hole die ID aus der URL mit useParams()
  // const { id } = useParams();

  // TODO: Finde den Index im Store
  // const { items } = useIndices();
  // const index = items.find(...)

  // TODO: Wenn kein Index gefunden wurde, zeige eine Fehlermeldung oder leite um

  return (
    <div style={{ padding: '2rem' }}>
      {/* TODO: Zeige Details zum Index an (Name, Wert, etc.) */}
      <h1>Detailansicht Template</h1>
      
      {/* TODO: Füge einen "Zurück" Button hinzu, der useNavigate nutzt */}
    </div>
  );
};

export default IndexDetail;
