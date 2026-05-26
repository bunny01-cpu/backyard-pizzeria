@echo off
cd /d D:\Production\pizzaplace
D:\Production\Git\cmd\git.exe add .
D:\Production\Git\cmd\git.exe commit -m "fix: add vercel.json for client deployment"
D:\Production\Git\cmd\git.exe -c http.extraHeader="Authorization: Basic %GITHUB_AUTH%" push
echo DONE
