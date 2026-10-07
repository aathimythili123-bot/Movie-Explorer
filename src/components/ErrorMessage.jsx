export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error" role="alert">
      <p>{message}</p>
      {onRetry && <button onClick={onRetry}>Try again</button>}
    </div>
  );
}
