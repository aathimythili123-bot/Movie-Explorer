import { useEffect, useState } from "react";

// Runs an async function whenever deps change. Returns { data, loading, error }.
// The `ignore` flag stops a slow, outdated response from overwriting newer state (a classic race bug).
export function useAsync(fn, deps) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  useEffect(() => {
    let ignore = false;
    setState((s) => ({ ...s, loading: true, error: null }));
    fn()
      .then((data) => !ignore && setState({ data, loading: false, error: null }))
      .catch((e) => !ignore && setState({ data: null, loading: false, error: e.message }));
    return () => { ignore = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return state;
}
