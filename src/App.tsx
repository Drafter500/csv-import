import CsvImporter from './components/csv-importer.tsx';
import { Box } from '@mui/material';


function App() {
  return (
    <Box sx={{ p: 3, maxWidth: '1200px', margin: '0 auto' }}>
      <CsvImporter />
    </Box>
  )
}

export default App
