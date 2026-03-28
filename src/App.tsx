import CsvImporter from './components/csv-importer.tsx';
import { Box, styled } from '@mui/material';


function App() {
  return (
    <AppContainer>
      <CsvImporter />
    </AppContainer>
  )
}

const AppContainer = styled(Box)({
  padding: 24,
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  boxSizing: 'border-box',
});

export default App
