@echo off
cd /d D:\Production\pizzaplace
D:\Production\Git\cmd\git.exe rm --cached create_repo.js 2>nul
D:\Production\Git\cmd\git.exe rm --cached push_to_github.bat 2>nul
D:\Production\Git\cmd\git.exe rm --cached do_push.bat 2>nul
D:\Production\Git\cmd\git.exe add .
D:\Production\Git\cmd\git.exe commit --amend --no-edit
D:\Production\Git\cmd\git.exe -c http.extraHeader="Authorization: Basic %GITHUB_AUTH%" push -u origin main --force
echo PUSH_DONE
