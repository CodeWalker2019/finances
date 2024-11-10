import { PieChart } from '@mui/x-charts/PieChart';
import useFinancesPieChartData from '../../hooks/useFinancesPieChartData';
import { valueFormatter } from '../../helpers';

export default function FinancesPieChart() {
  const desktopOS = useFinancesPieChartData()
  
  return (
    <PieChart
      series={[
        {
          data: desktopOS,
          highlightScope: { fade: 'global', highlight: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          valueFormatter,
        },
      ]}
      height={400}
    />
  )
}