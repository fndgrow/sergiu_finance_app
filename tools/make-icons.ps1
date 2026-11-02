# Generates the PWA icons (green rounded square with "EHL") using System.Drawing.
# Run from the project folder:  powershell -ExecutionPolicy Bypass -File tools\make-icons.ps1
Add-Type -AssemblyName System.Drawing
$root = Split-Path -Parent $PSScriptRoot
$out = Join-Path $root "icons"
New-Item -ItemType Directory -Force $out | Out-Null

function Make-Icon([int]$size, [string]$file, [double]$pad, [double]$radius) {
  $bmp = New-Object System.Drawing.Bitmap $size, $size
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  $g.Clear([System.Drawing.Color]::Transparent)
  $green = [System.Drawing.ColorTranslator]::FromHtml("#0E6A4E")
  $p = [int]($size * $pad)
  $r = [int]($size * $radius)
  $rect = New-Object System.Drawing.Rectangle $p, $p, ($size - 2*$p), ($size - 2*$p)
  $brush = New-Object System.Drawing.SolidBrush $green
  if ($r -gt 0) {
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $d = 2 * $r
    $path.AddArc($rect.X, $rect.Y, $d, $d, 180, 90)
    $path.AddArc($rect.Right - $d, $rect.Y, $d, $d, 270, 90)
    $path.AddArc($rect.Right - $d, $rect.Bottom - $d, $d, $d, 0, 90)
    $path.AddArc($rect.X, $rect.Bottom - $d, $d, $d, 90, 90)
    $path.CloseFigure()
    $g.FillPath($brush, $path)
  } else {
    $g.FillRectangle($brush, $rect)
  }
  $fontSize = [float]($rect.Width * 0.30)
  $font = New-Object System.Drawing.Font "Arial", $fontSize, ([System.Drawing.FontStyle]::Bold), ([System.Drawing.GraphicsUnit]::Pixel)
  $fmt = New-Object System.Drawing.StringFormat
  $fmt.Alignment = [System.Drawing.StringAlignment]::Center
  $fmt.LineAlignment = [System.Drawing.StringAlignment]::Center
  $white = [System.Drawing.Brushes]::White
  $textRect = New-Object System.Drawing.RectangleF $rect.X, ($rect.Y + $rect.Height * 0.02), $rect.Width, $rect.Height
  $g.DrawString("EHL", $font, $white, $textRect, $fmt)
  $g.Dispose()
  $bmp.Save((Join-Path $out $file), [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
}

Make-Icon 192 "icon-192.png" 0.0 0.22
Make-Icon 512 "icon-512.png" 0.0 0.22
Make-Icon 180 "apple-touch-icon.png" 0.0 0.0
Make-Icon 512 "icon-maskable-512.png" 0.0 0.0
Write-Output "icons written to $out"
