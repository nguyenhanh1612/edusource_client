import WebViewer from "@pdftron/webviewer";
import { useEffect, useRef } from "react";

interface PdfViewerProps {
  fileUrl: string;
  isPurchased: boolean;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ fileUrl, isPurchased }) => {
  const viewerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (viewerRef.current) {
      WebViewer(
        {
          path: "/public/webviewer/lib",
          initialDoc: fileUrl,
        },
        viewerRef.current
      ).then((instance) => {
        const { documentViewer } = instance.Core;
        documentViewer.addEventListener("documentLoaded", () => {
          if (!isPurchased) {
            documentViewer.setPageVisibilityCallback((pageNumber: number) => pageNumber <= 3);
          }
        });
      });
    }
  }, [fileUrl, isPurchased]);

  return <div ref={viewerRef} className="h-screen w-full" />;
};

export default PdfViewer;
