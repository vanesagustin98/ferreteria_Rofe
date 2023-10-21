export default function handler(req, res) {
    if (req.method === 'POST') {
      
      const { producto, cantidad, total, detalleVenta } = req.body;
  
      if (!producto || !cantidad || !total || !detalleVenta) {
        return res.status(400).json({ error: 'Por favor, complete todos los campos.' });
      }
  
      return res.status(201).json({ message: 'Venta registrada exitosamente.' });
    } else {
      return res.status(405).json({ error: 'Método no permitido' });
    }
  }
  