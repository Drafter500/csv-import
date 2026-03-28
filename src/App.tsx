import CsvImporter from './components/csv-importer.tsx';
import { Box } from '@mui/material';


function App() {
  return (
    <Box sx={{ p: 3, maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <CsvImporter />
    </Box>
  )
}

export default App
