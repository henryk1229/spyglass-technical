import { useLocation } from "wouter";

const ErrorPage: React.FC = () => {
  const [, setLocation] = useLocation();

  // Error boundary for mismatched routes
  return (
    <div style={{ margin: "8px" }}>
      <div style={{ fontWeight: "bold", margin: "16px" }}>
        This is not the page you're searching for...
      </div>
      <button onClick={() => setLocation("/planets/")}>Back to planets</button>
    </div>
  );
};

export default ErrorPage;
