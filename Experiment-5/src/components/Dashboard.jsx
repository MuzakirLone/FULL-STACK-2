import './Dashboard.css';

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1> React Lazy Loading Dashboard</h1>
        <p className="subtitle">Demonstrating Code-Splitting & Performance Optimization</p>
      </header>


      <footer className="dashboard-footer">
        <p>✅ Component successfully loaded using lazy loading technique</p>
      </footer>
    </div>
  );
}