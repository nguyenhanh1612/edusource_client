// import WebViewer from "@pdftron/webviewer";
// import { useEffect, useRef } from "react";

// interface PdfViewerProps {
//   fileUrl: string | null;
//   isPurchased: boolean;
// }

// const PdfViewer: React.FC<PdfViewerProps> = ({ fileUrl, isPurchased }) => {
//   const viewerRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     if (viewerRef.current && fileUrl) {
//       WebViewer(
//         {
//           path: "/webviewer/lib",
//           initialDoc: fileUrl,
//         },
//         viewerRef.current
//       ).then((instance) => {
//         const { documentViewer, annotationManager, Tools } = instance.Core;

//         documentViewer.addEventListener("documentLoaded", () => {
//           if (!isPurchased) {
//             documentViewer.setPageVisibilityCallback((pageNumber: number) => pageNumber <= 3);
//           }

//           // Kích hoạt công cụ FreeTextCreateTool
//           const textTool = new Tools.FreeTextCreateTool(documentViewer);
//           documentViewer.setToolMode(textTool);

//           // Đặt focus vào công cụ
//           textTool.trigger("focus");

//           // Kích hoạt các tính năng cần thiết
//           instance.UI.enableFeatures([instance.UI.Feature.ContentEdit, instance.UI.Feature.Annotations]);
//         });
//       });

//     }
//   }, [fileUrl, isPurchased]);

//   return fileUrl ? <div ref={viewerRef} className="h-screen w-full" /> : null;
// };

// export default PdfViewer; 

import React, { useEffect, useRef } from "react";
import WebViewer, { Core } from "@pdftron/webviewer";

interface PdfViewerProps {
  fileUrl: string | null;
  isPurchased: boolean;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ fileUrl, isPurchased }) => {
  const viewerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log("🔹 PdfViewer mounted");
    console.log("🔹 File URL:", fileUrl);
    console.log("🔹 PDFTron License Key:", process.env.NEXT_PUBLIC_PDFTRON_LICENSE_KEY);

    if (viewerRef.current && fileUrl) {
      WebViewer(
        {
          path: "/webviewer/lib",
          initialDoc: fileUrl,
          licenseKey: process.env.NEXT_PUBLIC_PDFTRON_LICENSE_KEY,
        },
        viewerRef.current
      )
        .then((instance) => {
          console.log("✅ WebViewer initialized successfully");
          const { documentViewer, Tools, Annotations } = instance.Core;

          documentViewer.addEventListener("documentLoaded", () => {
            console.log("📄 Document loaded");

            // 🔥 Kiểm tra lỗi liên quan đến license
            if (!instance.UI.enableFeatures) {
              console.error("❌ License key có thể không hợp lệ hoặc bị giới hạn tính năng");
              return;
            }

            // 🔥 Đặt chế độ zoom
            instance.UI.setFitMode(instance.UI.FitMode.FitWidth);
            console.log("🔍 FitWidth mode applied");

            // 🔥 Kích hoạt ContentEdit & Annotation
            instance.UI.enableFeatures([instance.UI.Feature.ContentEdit, instance.UI.Feature.Annotations]);
            console.log("✏️ Annotation & ContentEdit enabled");

            // 🔥 Kích hoạt công cụ nhập text
            const textTool = new Tools.FreeTextCreateTool(documentViewer);
            documentViewer.setToolMode(textTool);
            console.log("📝 FreeTextCreateTool activated");

            // 🔥 Lắng nghe sự kiện thêm annotation
            documentViewer.addEventListener("annotationChanged", (annotations, action) => {
              console.log("🔄 Annotation changed:", annotations, "Action:", action);

              if (action === "add") {
                annotations.forEach((annot: any) => {
                  console.log("🆕 New annotation detected:", annot);

                  if (annot instanceof Annotations.FreeTextAnnotation) {
                    console.log("✅ FreeTextAnnotation created:", annot);

                    // 🔥 Chọn annotation
                    const annotationManager = documentViewer.getAnnotationManager();
                    annotationManager.selectAnnotation(annot);
                    console.log("🎯 Selected annotation:", annot);

                    setTimeout(() => {
                      // 🔥 Kích hoạt chế độ chỉnh sửa
                      annotationManager.trigger("annotationSelected", [annot]);
                      annotationManager.redrawAnnotation(annot);
                      console.log("✏️ Annotation editing activated");

                      // Cuộn đến annotation
                      const scrollView = documentViewer.getScrollViewElement();
                      const rect = annot.getRect();
                      scrollView.scrollTo({
                        top: rect.y1 - 100,
                        left: rect.x1,
                        behavior: "smooth",
                      });
                      console.log("📜 Scrolled to annotation position:", rect);
                    }, 100);
                  }
                });
              }
            });
          });
        })
        .catch((error) => {
          console.error("❌ Lỗi khởi tạo WebViewer:", error);
        });
    }
  }, [fileUrl]);

  return fileUrl ? <div ref={viewerRef} className="h-screen w-full" /> : null;
};

export default PdfViewer;

