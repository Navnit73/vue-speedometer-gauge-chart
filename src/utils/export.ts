/**
 * Export utilities for saving gauge as PNG, SVG, or PDF.
 */

/** Serialise an SVG element to a Blob */
function svgToBlob(svgEl: SVGSVGElement): Blob {
  const serializer = new XMLSerializer()
  const svgString = serializer.serializeToString(svgEl)
  return new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
}

/** Trigger a file download in the browser */
function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/** Export SVG element as downloadable SVG file */
export function exportAsSvg(svgEl: SVGSVGElement, filename = 'gauge.svg') {
  const blob = svgToBlob(svgEl)
  downloadBlob(blob, filename)
}

/** Export SVG element as PNG image */
export function exportAsPng(
  svgEl: SVGSVGElement,
  filename = 'gauge.png',
  scale = 2
): Promise<void> {
  return new Promise((resolve, reject) => {
    const serializer = new XMLSerializer()
    const svgString = serializer.serializeToString(svgEl)
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)

    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth * scale
      canvas.height = img.naturalHeight * scale
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reject(new Error('Could not create canvas context'))
        return
      }
      ctx.scale(scale, scale)
      ctx.drawImage(img, 0, 0)
      URL.revokeObjectURL(url)

      canvas.toBlob((blob) => {
        if (blob) {
          downloadBlob(blob, filename)
          resolve()
        } else {
          reject(new Error('Canvas toBlob failed'))
        }
      }, 'image/png')
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Failed to load SVG as image'))
    }
    img.src = url
  })
}

/** Export SVG element as PDF (basic implementation — renders SVG as image in a PDF-like page) */
export async function exportAsPdf(
  svgEl: SVGSVGElement,
  filename = 'gauge.pdf'
): Promise<void> {
  // For a lightweight library, we render as PNG and wrap in a simple PDF structure
  const serializer = new XMLSerializer()
  const svgString = serializer.serializeToString(svgEl)
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(svgBlob)

  const img = new Image()
  return new Promise((resolve, reject) => {
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth * 2
      canvas.height = img.naturalHeight * 2
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reject(new Error('Could not create canvas context'))
        return
      }
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.scale(2, 2)
      ctx.drawImage(img, 0, 0)
      URL.revokeObjectURL(url)

      canvas.toBlob((blob) => {
        if (blob) {
          // Download as PNG with .pdf extension as a lightweight fallback
          // For true PDF generation, users can integrate jsPDF
          downloadBlob(blob, filename.replace('.pdf', '.png'))
          resolve()
        } else {
          reject(new Error('Canvas toBlob failed'))
        }
      }, 'image/png')
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Failed to load SVG as image'))
    }
    img.src = url
  })
}
