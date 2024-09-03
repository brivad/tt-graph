import { useState, useCallback } from 'react';
import {
  Camera,
  Settings,
  HelpCircle,
  Search,
  Save,
  Undo,
  Redo,
} from 'lucide-react';
import ForceGraph3D from 'react-force-graph-3d';

const TiroTiroGraf = () => {
  const [selectedMenu, setSelectedMenu] = useState('Home');

  const menuItems = [
    { name: 'Home', icon: <Camera size={24} /> },
    { name: 'I miei Grafi', icon: <Camera size={24} /> },
    { name: 'Nuovo Grafo', icon: <Camera size={24} /> },
    { name: 'Importa Documento', icon: <Camera size={24} /> },
    { name: 'Impostazioni', icon: <Settings size={24} /> },
    { name: 'Aiuto', icon: <HelpCircle size={24} /> },
  ];

  // Dati del grafo di default che rappresenta la struttura dell'app
  const graphData = {
    nodes: [
      { id: 'TiroTiroGraf', group: 1 },
      { id: 'Interfaccia', group: 2 },
      { id: 'Visualizzazione', group: 3 },
      { id: 'Modifica', group: 4 },
      { id: 'Analisi', group: 5 },
      { id: 'Importazione', group: 6 },
      { id: 'Esportazione', group: 7 },
    ],
    links: [
      { source: 'TiroTiroGraf', target: 'Interfaccia' },
      { source: 'TiroTiroGraf', target: 'Visualizzazione' },
      { source: 'TiroTiroGraf', target: 'Modifica' },
      { source: 'TiroTiroGraf', target: 'Analisi' },
      { source: 'Interfaccia', target: 'Visualizzazione' },
      { source: 'Interfaccia', target: 'Modifica' },
      { source: 'Interfaccia', target: 'Importazione' },
      { source: 'Interfaccia', target: 'Esportazione' },
      { source: 'Visualizzazione', target: 'Analisi' },
      { source: 'Modifica', target: 'Analisi' },
    ],
  };

  const handleNodeClick = useCallback((node: any) => {
    // Qui puoi aggiungere la logica per gestire il click su un nodo
    console.log('Clicked node:', node);
  }, []);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Left Column - Navigation */}
      <div className="w-1/5 bg-gray-800 p-4">
        {menuItems.map((item) => (
          <button
            key={item.name}
            className={`flex items-center w-full p-2 mb-2 ${
              selectedMenu === item.name ? 'bg-blue-600' : 'hover:bg-gray-700'
            }`}
            onClick={() => setSelectedMenu(item.name)}
          >
            {item.icon}
            <span className="ml-2">{item.name}</span>
          </button>
        ))}
      </div>

      {/* Central Column - Main Content */}
      <div className="w-3/5 p-4">
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <Search className="mr-2" />
            <input
              type="text"
              placeholder="Cerca..."
              className="bg-gray-700 p-2 rounded"
            />
          </div>
          <div>
            <button className="bg-blue-500 p-2 rounded mr-2">
              <Save size={20} />
            </button>
            <button className="bg-gray-700 p-2 rounded mr-2">
              <Undo size={20} />
            </button>
            <button className="bg-gray-700 p-2 rounded">
              <Redo size={20} />
            </button>
          </div>
        </div>
        <div className="bg-gray-800 h-[calc(100%-4rem)] rounded overflow-hidden">
          <ForceGraph3D
            graphData={graphData}
            nodeLabel="id"
            nodeColor={(node) => {
              const colors = [
                '#ff4b4b',
                '#4bff4b',
                '#4b4bff',
                '#ffff4b',
                '#ff4bff',
                '#4bffff',
                '#ffffff',
              ];
              return colors[node.group - 1];
            }}
            linkColor={() => '#ffffff'}
            backgroundColor="#1f2937"
            onNodeClick={handleNodeClick}
          />
        </div>
      </div>

      {/* Right Column - Tools */}
      <div className="w-1/5 bg-gray-800 p-4">
        <h2 className="text-xl mb-4">Strumenti</h2>
        <div className="mb-4">
          <h3 className="mb-2">Modifica Nodi/Archi</h3>
          <button className="bg-blue-500 p-2 rounded w-full mb-2">
            Aggiungi Nodo
          </button>
          <button className="bg-red-500 p-2 rounded w-full">
            Rimuovi Nodo
          </button>
        </div>
        <div className="mb-4">
          <h3 className="mb-2">Carica/Unisci File</h3>
          <button className="bg-green-500 p-2 rounded w-full">
            Carica Documento
          </button>
        </div>
        <div>
          <h3 className="mb-2">Esporta Grafo</h3>
          <select className="bg-gray-700 p-2 rounded w-full">
            <option>PDF</option>
            <option>PNG</option>
            <option>SVG</option>
            <option>JSON</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TiroTiroGraf;
