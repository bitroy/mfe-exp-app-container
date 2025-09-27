import React, { useEffect, useRef, useState } from "react";
import { loadRemote } from "@module-federation/enhanced/runtime";

export function useRemoteComponent(remoteName, moduleName) {
  const [Component, setComponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const getRemoteComponent = async () => {
      try {
        const Mod = await loadRemote(`${remoteName}/${moduleName}`);

        let Comp;
        if (Mod?.mount && typeof Mod.mount === "function") {

          Comp = function MountWrapper() {
            const containerRef = useRef(null);

            useEffect(() => {
              if (containerRef.current) {
                Mod.mount(containerRef.current);
              }
            }, []);

            return <div ref={containerRef} />;
          };
        } else {
          Comp = Mod?.default || Mod;
        }

        if (isMounted) {
          setComponent(() => Comp);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getRemoteComponent();

    return () => {
      isMounted = false;
    };
  }, [remoteName, moduleName]);

  return { Component, loading, error };
}
