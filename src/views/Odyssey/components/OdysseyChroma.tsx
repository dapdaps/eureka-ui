import { addPropertyControls, ControlType,RenderTarget } from 'framer';
import { useEffect, useRef } from 'react';


declare global {
  interface Window {
    UnicornStudio?: {
      destroy: () => void;
      init: () => void;
    };
  }
}

export default function UnicornStudioEmbed({ projectId = 'lHlDvoJDIXCxxXVqTNOC' }: { projectId?: string }) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isEditingOrPreviewing = ['CANVAS', 'PREVIEW'].includes(RenderTarget.current());

    const initializeScript = (callback: () => void) => {
      if (!document.querySelector('script[src^="https://cdn.unicorn.studio"]')) {
        const script = document.createElement('script');
        script.src = 'https://cdn.unicorn.studio/v1.2.3/unicornStudio.umd.js';
        script.onload = callback;
        document.head.appendChild(script);
      } else {
        callback();
      }
    };

    const initializeUnicornStudio = () => {
      const cacheBuster = isEditingOrPreviewing ? `?update=${Math.random()}` : '';
      elementRef.current?.setAttribute('data-us-project', projectId + cacheBuster);

      if (typeof window !== 'undefined' && window.UnicornStudio) {
        window.UnicornStudio.destroy();
        window.UnicornStudio.init();
      }
    };

    if (projectId) {
      if (typeof window !== 'undefined' && window.UnicornStudio) {
        initializeUnicornStudio();
      } else {
        initializeScript(initializeUnicornStudio);
      }
    }
  }, [projectId]);

  return (
    <div
      ref={elementRef}
      data-us-dpi="1"
      data-us-scale="1"
      data-us-fps="60"
      style={containerStyle}
    />
  );
}

const containerStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
};

UnicornStudioEmbed.displayName = 'Chroma Background';

addPropertyControls(UnicornStudioEmbed, {
  projectId: {
    type: ControlType.Enum,
    title: 'Style',
    options: [
      'lHlDvoJDIXCxxXVqTNOC',
      'YnADGzDD7LGB9cUocyyN',
      'ezEDNzFtrAgm8yCUWUeX',
      'wYI4YirTR5lrja86ArSY',
      'rJ39y9Nnyz3cJooDtmNM',
      'HJKVa10sftexJ7OgsOnU',
    ],
    optionTitles: ['Liquid', 'Folds', 'Smoke', 'Flow', 'Pixel', 'ASCII'],
  },
});

export const __FramerMetadata__ = {
  exports: {
    default: {
      type: 'reactComponent',
      name: 'UnicornStudioEmbed',
      slots: [],
      annotations: {
        framerSupportedLayoutWidth: 'fixed',
        framerIntrinsicWidth: '800',
        framerSupportedLayoutHeight: 'fixed',
        framerDisableUnlink: '*',
        framerContractVersion: '1',
        framerIntrinsicHeight: '400',
      },
    },
    __FramerMetadata__: { type: 'variable' },
  },
};
