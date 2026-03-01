$p = Get-Content 'c:\Users\2479385\Desktop\project\styles.css'
$out = $p -replace ';(?=\s*[^\n])',';`n'
$out | Set-Content 'c:\Users\2479385\Desktop\project\styles.css'
