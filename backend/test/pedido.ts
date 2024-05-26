import express from 'express';
import pedidoRoutes from './routes/pedidoRoutes';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(pedidoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
