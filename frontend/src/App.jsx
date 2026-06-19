import { useState } from 'react';

export default function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    lower: true,
    upper: true,
    digits: true,
    symbols: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generatePassword = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Mapeo dinámico de los parámetros que espera el controlador de Java
      const queryParams = new URLSearchParams({
        length: length,
        lower: options.lower,
        upper: options.upper,
        digits: options.digits,
        symbols: options.symbols
      });

      const response = await fetch(`http://localhost:8080/api/passwords/generate?${queryParams}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ocurrió un error inesperado');
      }

      setPassword(data.password);
    } catch (err) {
      setError(err.message);
      setPassword('');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (password) {
      await navigator.clipboard.writeText(password);
      alert('¡Contraseña copiada al portapapeles!');
    }
  };

  const handleCheckbox = (e) => {
    setOptions({ ...options, [e.target.name]: e.target.checked });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-md border border-gray-700">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Generador Seguro (API REST)</h1>
        
        {/* Pantalla de visualización */}
        <div className="bg-gray-900 rounded-lg p-4 mb-2 flex justify-between items-center border border-gray-600 min-h-[64px]">
          <span className={`font-mono text-xl tracking-wider break-all ${password ? 'text-emerald-400' : 'text-gray-500'}`}>
            {loading ? 'Generando...' : password || 'Haz clic en generar...'}
          </span>
          {password && !loading && (
            <button 
              onClick={copyToClipboard}
              className="ml-4 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 text-sm rounded transition-colors whitespace-nowrap"
            >
              Copiar
            </button>
          )}
        </div>

        {/* Control de errores de validación de la API */}
        <div className="h-6 mb-4">
          {error && <p className="text-red-400 text-sm font-medium">{error}</p>}
        </div>

        {/* Deslizador de longitud */}
        <div className="mb-6">
          <label className="text-gray-300 flex justify-between mb-2">
            <span>Longitud de la clave</span>
            <span className="font-bold text-emerald-400">{length} caracteres</span>
          </label>
          <input 
            type="range" 
            min="8" max="64" 
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-emerald-500 bg-gray-700 h-2 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Casillas de selección */}
        <div className="space-y-3 mb-8">
          {[
            { label: 'Incluir Minúsculas (a-z)', name: 'lower' },
            { label: 'Incluir Mayúsculas (A-Z)', name: 'upper' },
            { label: 'Incluir Números (0-9)', name: 'digits' },
            { label: 'Incluir Símbolos (!@#$)', name: 'symbols' }
          ].map((opt) => (
            <label key={opt.name} className="flex items-center space-x-3 text-gray-300 cursor-pointer select-none">
              <input 
                type="checkbox" 
                name={opt.name}
                checked={options[opt.name]}
                onChange={handleCheckbox}
                className="w-5 h-5 rounded border-gray-600 text-emerald-500 focus:ring-emerald-500 bg-gray-700 focus:ring-offset-gray-800"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>

        {/* Botón de acción */}
        <button 
          onClick={generatePassword}
          disabled={loading}
          className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-700 text-gray-900 font-bold py-3 px-4 rounded-lg transition-colors duration-200 uppercase tracking-wider text-sm"
        >
          {loading ? 'Conectando con Servidor...' : 'Generar Contraseña'}
        </button>
      </div>
    </div>
  );
}